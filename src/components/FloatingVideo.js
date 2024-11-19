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
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
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
  height: calc(100% - 40px); /* Ajusta para o espaço disponível abaixo do cabeçalho */
  background: black;
`;

// Componente Principal
function FloatingVideo() {
  // Estados para controle de mudo, visibilidade e reprodução
  const [isMuted, setIsMuted] = useState(false); // Som ativado por padrão
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true); // Vídeo está tocando por padrão

  // Referência ao elemento de vídeo
  const videoRef = useRef(null);

  // Função para alternar o mudo
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    console.log(`Mudo ${!isMuted ? 'ativado' : 'desativado'}.`);
  };

  // Função para alternar entre reproduzir e pausar
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      console.log('Vídeo pausado.');
    } else {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log('Vídeo reproduzindo.');
        })
        .catch((error) => {
          console.error('Erro ao tentar reproduzir o vídeo:', error);
        });
    }
  };

  // Função para fechar o vídeo e parar a reprodução
  const closeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Opcional: Reinicia o vídeo
      console.log('Vídeo fechado manualmente.');
    }
    setIsVisible(false);
  };

  // Função para fechar o vídeo quando ele termina
  const handleVideoEnd = () => {
    console.log('Vídeo terminou de reproduzir.');
    setIsVisible(false); // Fecha o vídeo quando termina
  };

  // Efeito para controlar o estado de reprodução e mudo
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.muted = isMuted; // Define o mudo com base no estado
      if (isPlaying) {
        videoElement
          .play()
          .then(() => {
            if (!isMuted) {
              videoElement.muted = false; // Desativa o mudo se permitido
            }
            console.log('Vídeo reproduzido com sucesso.');
          })
          .catch((error) => {
            console.error('Autoplay bloqueado ou erro na reprodução:', error);
            setIsMuted(true); // Ativa o mudo se o navegador bloquear
            setIsPlaying(false); // Atualiza o estado de reprodução
            setIsVisible(false); // Fecha o vídeo em caso de erro
          });
      } else {
        videoElement.pause();
      }
    }
  }, [isMuted, isPlaying]);

  // Efeito para adicionar o listener do evento 'ended' apenas uma vez
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, []);

  return (
    <VideoContainer isVisible={isVisible}>
      <VideoHeader>
        <span>Racca Saúde</span>
        <div>
          <Button onClick={toggleMute} aria-label="Alternar Mudo">
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
        onError={(e) => console.error('Erro no elemento de vídeo:', e)}
      />
    </VideoContainer>
  );
}

export default FloatingVideo;
