import { useState } from "react";
import styled from "styled-components";

const WheelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
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
  background: conic-gradient(
    #ff4d6d 0deg 90deg,
    #ff9a8b 90deg 180deg,
    #ffd6e0 180deg 270deg,
    #ffe5ef 270deg 360deg
  );
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  transform: rotate(${({ rotation }) => rotation}deg);
  transition: ${({ spinning }) =>
  spinning ? "transform 4s cubic-bezier(0.33, 1, 0.68, 1)" : "none"};
`;

const Pointer = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 20px solid ${({ theme }) => theme.colors.accent};
`;

const SpinButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(3)};
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  font-family: ${({ theme }) => theme.fonts.main};

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

export function LotteryWheel() {
  const prizes = ["Поцелуй", "Сладости", "Шлепок по попе ", "Ничего"];
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [totalRotation, setTotalRotation] = useState(0); // 👈 фикс анимации

  const spin = () => {
    if (spinning) return;
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
      setResult(prizes[randomIndex]);
    }, 4000);
  };

  return (
    <WheelWrapper>
      <WheelContainer>
        <Pointer />
        <Wheel rotation={rotation} spinning={spinning} />
      </WheelContainer>
      <SpinButton onClick={spin} disabled={spinning}>
        {spinning ? "Крутится..." : "Крутить"}
      </SpinButton>
      {result && <ResultText>🎁 Ваш приз: {result}</ResultText>}
    </WheelWrapper>
  );
}
