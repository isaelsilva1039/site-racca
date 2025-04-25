import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';

// ANIMAÇÕES
const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
`;

// CONTAINERS
const MissionVisionContainer = styled.section`
  text-align: center;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  color: #333;
  position: relative;
  overflow: hidden;
  padding: 40px 0;

  @media (max-width: 768px) {
    padding: 25px 8px;
  }
`;

const Title = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 40px;
  color: #a100ff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: bold;
  animation: ${fadeInScale} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 25px;
    letter-spacing: 0.8px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  gap: 30px;
  max-width: 90%;
  margin: 0 auto;
  padding: 0 25px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: -80px;
    left: -80px;
    width: 240px;
    height: 240px;
    background: radial-gradient(circle, rgba(161, 0, 255, 0.1) 0%, transparent 70%);
    animation: rotateGradient 15s infinite linear;
  }

  @keyframes rotateGradient {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (min-width: 769px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }

  @media (max-width: 768px) {
    gap: 20px;
    padding: 0 12px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }

  & > div:nth-of-type(3) {
    @media (min-width: 769px) {
      grid-column: 1 / 3;
    }
  }
`;

const Card = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(245, 245, 255, 0.9) 100%
  );
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(161, 0, 255, 0.2);
  position: relative;
  overflow: hidden;
  min-height: 240px;
  animation:
    ${fadeInScale} 1s ease-out ${({ delay }) => delay || '0s'} forwards,
    ${float} 4s infinite ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px) scale(1.015);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  }

  &:before {
    content: '';
    position: absolute;
    top: -15%;
    left: -15%;
    width: 130%;
    height: 130%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 80%);
    z-index: 1;
  }

  h3 {
    font-size: 1.8rem;
    color: #a100ff;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      font-size: 1.3rem;
      margin-bottom: 15px;
    }

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }

  p,
  ul {
    font-size: 1.4rem;
    color: #555;
    line-height: 1.6;
    text-align: center;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.5;
    }

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    text-align: left; /* Alinha o texto à esquerda para melhor consistência */

    li {
      margin-bottom: 12px;
      display: flex;
      align-items: flex-start; /* Alinha o conteúdo no topo */
      position: relative;

      @media (max-width: 768px) {
        margin-bottom: 10px;
      }

      @media (max-width: 480px) {
        margin-bottom: 8px;
      }
    }
  }

  ul li .first-word {
    font-size: 1.6rem;
    color: #a100ff;
    font-weight: bold;
    margin-right: 10px;
    display: inline-block;
    width: 150px; /* Define uma largura fixa para alinhar uniformemente */
    text-align: left; /* Alinha à direita para consistência */

    @media (max-width: 768px) {
      font-size: 1.2rem;
      width: 90px;
      margin-right: 8px;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      width: 80px;
      margin-right: 6px;
    }
  }

  ul li .first-word .first-letter {
    font-size: 2.4rem; /* Reduzido para melhor proporção */
    display: inline-block;
    line-height: 1;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }

  ul li .description {
    flex: 1; /* O texto de descrição ocupa o espaço restante */
    font-size: 1.4rem;
    color: #555;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.5;
    }

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }

  /* Ajuste de altura dinâmica para Visão e Missão no mobile */
  &:nth-of-type(1),
  &:nth-of-type(2) {
    @media (max-width: 768px) {
      min-height: auto;
      padding: 20px;
    }

    @media (max-width: 480px) {
      padding: 15px;
    }
  }

  /* Mantém um min-height para Valores, que tem mais conteúdo */
  &:nth-of-type(3) {
    @media (max-width: 768px) {
      min-height: 300px;
      padding: 20px;
    }

    @media (max-width: 480px) {
      min-height: 250px;
      padding: 15px;
    }
  }
`;

function MissionVisionValues() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <MissionVisionContainer>
      <Title>Missão, Visão e Valores</Title>
      <ContentGrid>
        <Card delay="0.2s">
          <h3>Visão</h3>
          <p>
            Ser referência em saúde digital, oferecendo acesso seguro e eficiente
            a terapias online e telemedicina, promovendo o bem-estar de todos.
          </p>
        </Card>

        <Card delay="0.4s">
          <h3>Missão</h3>
          <p>
            Proporcionar atendimentos de saúde inovadores e humanizados, por meio
            de terapia online e telemedicina, com tecnologia de ponta e foco na
            qualidade.
          </p>
        </Card>

        <Card delay="0.6s">
          <h3>Valores</h3>
          <ul>
            <li>
              <span className="first-word">
                <span className="first-letter">R</span>espeito
              </span>
              <span className="description">
                – Garantimos que cada pessoa seja tratada com respeito, ética e empatia, promovendo um atendimento humanizado e digno.
              </span>
            </li>
            <li>
              <span className="first-word">
                <span className="first-letter">A</span>mor
              </span>
              <span className="description">
                – Trabalhamos com dedicação e compromisso, pois acreditamos que a saúde deve ser cuidada com amor e responsabilidade.
              </span>
            </li>
            <li>
              <span className="first-word">
                <span className="first-letter">C</span>uidado
              </span>
              <span className="description">
                – Utilizamos inovação e tecnologia para oferecer um cuidado contínuo, acessível e eficiente a cada paciente.
              </span>
            </li>
            <li>
              <span className="first-word">
                <span className="first-letter">C</span>arinho
              </span>
              <span className="description">
                – Acolhemos cada pessoa com carinho, proporcionando conforto, segurança e um atendimento humanizado.
              </span>
            </li>
            <li>
              <span className="first-word">
                <span className="first-letter">A</span>tenção
              </span>
              <span className="description">
                – Ouvimos e acompanhamos cada paciente com atenção, priorizando um serviço próximo, empático e eficaz.
              </span>
            </li>
          </ul>
        </Card>
      </ContentGrid>
    </MissionVisionContainer>
  );
}

export default MissionVisionValues;