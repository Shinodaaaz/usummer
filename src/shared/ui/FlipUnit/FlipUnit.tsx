import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const flipDown = keyframes`
  0% { transform: rotateX(0deg); }
  100% { transform: rotateX(-180deg); }
`;

const flipUp = keyframes`
  0% { transform: rotateX(180deg); }
  100% { transform: rotateX(0deg); }
`;

const UnitWrapper = styled.div`
  perspective: 1000px;
  display: inline-block;
`;

const Digit = styled.div<{ animate?: string; direction?: "up" | "down" }>`
  background: ${({ theme }) => theme.colors.headerBg};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 3rem;
  font-weight: bold;
  width: 60px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-radius: 6px;
  margin: 0 4px;
  transform-origin: top;
  backface-visibility: hidden;
  animation: ${({ animate, direction }) =>
          animate
                  ? direction === "up"
                          ? flipUp
                          : flipDown
                  : "none"}
  0.4s ease forwards;
`;

interface FlipUnitProps {
  value: number;
  prevValue: number;
}

export function FlipUnit({ value, prevValue }: FlipUnitProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (prevValue !== value) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [value, prevValue]);

  return (
    <UnitWrapper>
      <Digit
        animate={animate ? "true" : undefined}
        direction={prevValue > value ? "up" : "down"}
      >
        {value.toString().padStart(2, "0")}
      </Digit>
    </UnitWrapper>
  );
}
