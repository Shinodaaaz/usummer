import styled from "styled-components";
import {useEffect, useRef} from "react";

const PlayerWrapper = styled.div`
  opacity: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.headerBg};
  display: flex;
  align-items: center;
  padding: 8px 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const Audio = styled.audio`
  width: 100%;
`;

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = () => {
      audioRef.current?.play().catch(() => {
        console.log("Автозапуск заблокирован браузером");
      });
      document.removeEventListener("click", playAudio);
    };
    document.addEventListener("click", playAudio);
  }, []);

  return (
    <PlayerWrapper>
      <Audio ref={audioRef} loop>
        <source src="/music/M83Wait.mp3" type="audio/mpeg" />
        Ваш браузер не поддерживает аудио.
      </Audio>
    </PlayerWrapper>
  );
}
