import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {FlipUnit} from "../../../shared/ui/FlipUnit/FlipUnit.tsx";
import {Gallery} from "../../../shared/ui/Gallery/Gallery.tsx";

const RELATIONSHIP_START = new Date("2025-09-30T00:00:00");

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;
const TimerBlockWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const heartbeat = keyframes`
   0%, 100% { transform: scale(1); }
   25% { transform: scale(1.2); }
   50% { transform: scale(1); }
   75% { transform: scale(1.2); }
`;

const Heart = styled.div`
  font-size: 2rem;
  width: max-content;
  color: ${({theme}) => theme.colors.accent};
  animation: ${heartbeat} 2.6s infinite;
`;

const TimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.span`
  margin-top: 4px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export function HomePage() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [prevTime, setPrevTime] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - RELATIONSHIP_START.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime(prev => {
        setPrevTime(prev); // <--- вот ключ
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimerWrapper>
      <Heart>❤️</Heart>
      <TimerBlockWrapper>
        <TimeBlock>
          <FlipUnit value={time.days} prevValue={prevTime.days} />
          <Label>дней</Label>
        </TimeBlock>
        <TimeBlock>
          <FlipUnit value={time.hours} prevValue={prevTime.hours} />
          <Label>часов</Label>
        </TimeBlock>
        <TimeBlock>
          <FlipUnit value={time.minutes} prevValue={prevTime.minutes} />
          <Label>минут</Label>
        </TimeBlock>
        <TimeBlock>
          <FlipUnit value={time.seconds} prevValue={prevTime.seconds} />
          <Label>секунд</Label>
        </TimeBlock>
      </TimerBlockWrapper>
      <Gallery/>
    </TimerWrapper>
  );
}
