import { useState, useEffect } from "react";
import styled from "styled-components";
import { Gift, Heart, Star, Crown, Smile, Coffee, Sparkles, Trash2 } from "lucide-react";

const WheelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1; /* Занимает все доступное пространство */
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(10)};
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
  flex-wrap: wrap;
`;

const WheelContainer = styled.div`
  position: relative;
  width: 260px;
  height: 260px;
`;

const Wheel = styled.div<{ rotation: number; spinning: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) =>
          `conic-gradient(
      #ff4d6d 0deg 90deg,
      #ff9a8b 90deg 180deg,
      #ffd6e0 180deg 270deg,
      #ffe5ef 270deg 360deg
    )`};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  transform: rotate(${({ rotation }) => rotation}deg);
  transition: ${({ spinning }) =>
          spinning ? "transform 4s cubic-bezier(0.33, 1, 0.68, 1)" : "none"};
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
  border-top: 20px solid ${({ theme }) => theme.colors.accent};
  z-index: 3;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(3)};
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  font-family: ${({ theme }) => theme.fonts.main};
  margin-top: ${({ theme }) => theme.spacing(2)};

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
  margin-top: ${({ theme }) => theme.spacing(1)};
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
`;

const PrizeList = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.headerBg};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 12px;
`;

const PrizeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PrizeForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export function LotteryWheel() {
  const icons = {
    Gift,
    Heart,
    Star,
    Crown,
    Smile,
    Coffee,
    Sparkles,
  };

  type Prize = {
    id: number;
    name: string;
    icon: keyof typeof icons;
  };

  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [totalRotation, setTotalRotation] = useState(0);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [newPrize, setNewPrize] = useState({ name: "", icon: "Gift" as keyof typeof icons });

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

  const addPrize = () => {
    if (!newPrize.name.trim()) return;
    setPrizes([...prizes, { id: Date.now(), ...newPrize }]);
    setNewPrize({ name: "", icon: "Gift" });
  };

  const removePrize = (id: number) => {
    setPrizes(prizes.filter((p) => p.id !== id));
  };

  const IconComponent = (name: keyof typeof icons) => {
    const Icon = icons[name];
    return <Icon size={20} color="#ff4d6d" />;
  };

  return (
    <WheelWrapper>
      {/* Колесо */}
      <div>
        <WheelContainer>
          <Pointer />
          <Wheel rotation={rotation} spinning={spinning} />
        </WheelContainer>
        <Button onClick={spin} disabled={spinning || prizes.length < 1}>
          {spinning ? "Крутится..." : "Крутить"}
        </Button>
        {result && <ResultText>🎁 Ваш приз: {result}</ResultText>}
      </div>

      {/* Управление призами */}
      <PrizeList>
        <h3>🎯 Призы</h3>

        <PrizeForm>
          <Input
            type="text"
            placeholder="Название приза"
            value={newPrize.name}
            onChange={(e) => setNewPrize({ ...newPrize, name: e.target.value })}
          />
          <Select
            value={newPrize.icon}
            onChange={(e) => setNewPrize({ ...newPrize, icon: e.target.value as keyof typeof icons })}
          >
            {Object.keys(icons).map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </Select>
          <Button onClick={addPrize}>Добавить приз</Button>
        </PrizeForm>

        {prizes.map((prize) => (
          <PrizeItem key={prize.id}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {IconComponent(prize.icon)}
              {prize.name}
            </div>
            <Trash2
              size={18}
              color="#ff4d6d"
              style={{ cursor: "pointer" }}
              onClick={() => removePrize(prize.id)}
            />
          </PrizeItem>
        ))}
      </PrizeList>
    </WheelWrapper>
  );
}
