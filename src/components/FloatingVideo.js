// components/FloatingVideo.js
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';


// Estilização do container do vídeo flutuante
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

// Estilização do cabeçalho do vídeo
const VideoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  color: white;
  font-size: 0.9rem;
`;

// Estilização dos botões no cabeçalho
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

// Estilização do elemento de vídeo
const VideoElement = styled.video`
  width: 100%;
  height: calc(120%); /* Ajusta para o espaço disponível */
`;

function FloatingVideo() {
  const [isMuted, setIsMuted] = useState(false); // Som ativado por padrão
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true); // Vídeo está tocando por padrão
  const videoRef = useRef(null); // Referência ao elemento de vídeo

  // Função para alternar o mute
  const toggleMute = () => setIsMuted((prev) => !prev);

  // Função para alternar entre reproduzir e pausar
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Função para fechar o vídeo e parar o áudio
  const closeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Opcional: Reinicia o vídeo
    }
    setIsVisible(false);
  };

  // Função para fechar o vídeo quando ele termina
  const handleVideoEnd = () => {
    setIsVisible(false); // Fecha o vídeo quando termina
  };

  // Efeito para controlar o estado de reprodução e mute
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.muted = isMuted; // Define o mute com base no estado
      if (isPlaying) {
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
      } else {
        videoElement.pause();
      }
    }
  }, [isMuted, isPlaying]);

  return (
    <VideoContainer isVisible={isVisible}>
      <VideoHeader>
        <span>Racca Saúde</span>
        <div>
          <Button onClick={toggleMute} aria-label="Alternar Mute">
            {isMuted ? '🔇' : '🔊'}
          </Button>
          <Button onClick={togglePlayPause} aria-label="Alternar Play/Pause">
            {isPlaying ? '⏸️' : '▶️'}
          </Button>
          <Button onClick={closeVideo} aria-label="Fechar Vídeo">❌</Button>
        </div>
      </VideoHeader>
      <VideoElement
        ref={videoRef}
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
