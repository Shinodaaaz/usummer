import {useState, useEffect} from "react";
import styled from "styled-components";
import {Gift, Heart, Star, Crown, Smile, Coffee, Sparkles} from "lucide-react";
import {AddPrizeForm} from "../../../features/prize/addPrize/ui/AddPrizeForm.tsx";

const WheelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${({theme}) => theme.spacing(10)};
  font-family: ${({theme}) => theme.fonts.main};
  color: ${({theme}) => theme.colors.text};
  flex-wrap: wrap;
`;

const WheelContainer = styled.div`
  position: relative;
  width: 260px;
  height: 260px;
`;

const WheelWrapperContainerAndButton = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

// Измените тип, убрав spinning из пропсов
const Wheel = styled.div<{ rotation: number }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid ${({theme}) => theme.colors.accent};
  background: ${() =>
          `conic-gradient(
      #ff4d6d 0deg 90deg,
      #ff9a8b 90deg 180deg,
      #ffd6e0 180deg 270deg,
      #ffe5ef 270deg 360deg
    )`};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  transform: rotate(${({rotation}) => rotation}deg);

  /* Используйте класс для управления анимацией */
  &.spinning {
    transition: transform 4s cubic-bezier(0.33, 1, 0.68, 1);
  }
`;

const Pointer = styled.div`
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 20px solid ${({theme}) => theme.colors.accent};
  z-index: 3;
`;

const Button = styled.button`
  background: ${({theme}) => theme.colors.accent};
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: ${({theme}) => theme.spacing(1)} ${({theme}) => theme.spacing(3)};
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  font-family: ${({theme}) => theme.fonts.main};
  margin-top: ${({theme}) => theme.spacing(2)};

  &:hover:not(:disabled) {
    opacity: 0.85;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultText = styled.p`
  margin-top: ${({theme}) => theme.spacing(1)};
  font-size: 18px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.accent};
`;

export const icons = {
  Gift,
  Heart,
  Star,
  Crown,
  Smile,
  Coffee,
  Sparkles,
};

export type Prize = {
  id: number;
  name: string;
  icon: keyof typeof icons;
};

export function LotteryWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [totalRotation, setTotalRotation] = useState(0);
  const [prizes, setPrizes] = useState<Prize[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("lotteryPrizes");
    if (saved) setPrizes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("lotteryPrizes", JSON.stringify(prizes));
  }, [prizes]);

  const spin = () => {
    if (spinning || prizes.length === 0) return;
    setSpinning(true);
    setResult(null);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const degreesPerSlice = 360 / prizes.length;
    const stopAt = 360 * 5 + (360 - randomIndex * degreesPerSlice - degreesPerSlice / 2);

    const newRotation = totalRotation + stopAt;
    setRotation(newRotation);
    setTotalRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[randomIndex].name);
    }, 4000);
  };

  return (
    <WheelWrapper>
      {/* Колесо */}
      <WheelWrapperContainerAndButton>
        <WheelContainer>
          <Pointer/>
          {/* Добавляем класс вместо пропса */}
          <Wheel
            rotation={rotation}
            className={spinning ? "spinning" : ""}
          />
        </WheelContainer>
        <Button onClick={spin} disabled={spinning || prizes.length < 1}>
          {spinning ? "Крутится..." : "Крутить"}
        </Button>
        {result && <ResultText>🎁 Ваш приз: {result}</ResultText>}
      </WheelWrapperContainerAndButton>

      {/* Управление призами */}
      <AddPrizeForm prizes={prizes} setPrizes={setPrizes}/>
    </WheelWrapper>
  );
}
