import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: fixed;
  bottom: 90px; /* Ajuste para ficar acima do botão do WhatsApp */
  right: 20px;
  width: 300px;
  height: 200px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  overflow: hidden;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const VideoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  color: white;
  font-size: 0.9rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 10px;

  &:hover {
    color: #a100ff;
  }
`;

const VideoElement = styled.video`
  width: 100%;
  height: calc(120%); /* Ajusta para o espaço disponível */
`;

function FloatingVideo() {
  const [isMuted, setIsMuted] = useState(false); // Som ativado por padrão
  const [isVisible, setIsVisible] = useState(true);

  const toggleMute = () => setIsMuted((prev) => !prev);
  const closeVideo = () => setIsVisible(false);

  const handleVideoEnd = () => {
    setIsVisible(false); // Fecha o vídeo quando termina
  };

  useEffect(() => {
    const videoElement = document.querySelector('video');

    if (videoElement) {
      videoElement.muted = isMuted; // Define o mute com base no estado
      videoElement
        .play()
        .then(() => {
          if (!isMuted) {
            videoElement.muted = false; // Desativa o mute se permitido
          }
        })
        .catch((error) => {
          console.error('Autoplay bloqueado:', error);
          setIsMuted(true); // Ativa o mute se o navegador bloquear
        });
    }
  }, [isMuted]);

  return (
    <VideoContainer isVisible={isVisible}>
      <VideoHeader>
        <span>Racca Saúde</span>
        <div>
          <Button onClick={toggleMute}>
            {isMuted ? '🔇' : '🔊'}
          </Button>
          <Button onClick={closeVideo}>❌</Button>
        </div>
      </VideoHeader>
      <VideoElement
        src="/video.mp4" // Substitua pelo caminho correto do vídeo
        autoPlay
        loop={false} // Sem loop para não reiniciar
        muted={isMuted}
        onEnded={handleVideoEnd} // Fecha ao terminar
      />
    </VideoContainer>
  );
}

export default FloatingVideo;
