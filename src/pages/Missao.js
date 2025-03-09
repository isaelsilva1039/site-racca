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
  50% { transform: translateY(-8px); } /* Reduzido de -10px */
  100% { transform: translateY(0); }
`;

// CONTAINERS
const MissionVisionContainer = styled.section`
  text-align: center;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  color: #333;
  position: relative;
  overflow: hidden;
  padding: 40px 0; /* Reduzido de 50px */

  @media (max-width: 768px) {
    padding: 25px 8px; /* Reduzido de 30px 10px */
  }
`;

const Title = styled.h2`
  font-size: 2.8rem; /* Reduzido de 3.5rem */
  margin-bottom: 40px; /* Reduzido de 50px */
  color: #a100ff;
  text-transform: uppercase;
  letter-spacing: 1.5px; /* Reduzido de 2px */
  font-weight: bold;
  animation: ${fadeInScale} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 1.8rem; /* Reduzido de 2.2rem */
    margin-bottom: 25px; /* Reduzido de 30px */
    letter-spacing: 0.8px; /* Reduzido de 1px */
  }

  @media (max-width: 480px) {
    font-size: 1.5rem; /* Reduzido de 1.8rem */
    margin-bottom: 20px; /* Reduzido de 25px */
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Padrão (mobile): 1 coluna */
  grid-auto-rows: auto;
  gap: 30px; /* Reduzido de 40px */
  max-width: 90%; /* Reduzido de 95% */
  margin: 0 auto;
  padding: 0 25px; /* Reduzido de 30px */
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: -80px; /* Reduzido de -100px */
    left: -80px; /* Reduzido de -100px */
    width: 240px; /* Reduzido de 300px */
    height: 240px; /* Reduzido de 300px */
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
    gap: 20px; /* Reduzido de 25px */
    padding: 0 12px; /* Reduzido de 15px */
  }

  @media (max-width: 480px) {
    gap: 15px; /* Reduzido de 20px */
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
  padding: 30px; /* Reduzido de 40px */
  border-radius: 12px; /* Reduzido de 15px */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); /* Reduzido de 8px 20px */
  border: 1px solid rgba(161, 0, 255, 0.2);
  position: relative;
  overflow: hidden;
  min-height: 240px; /* Reduzido de 300px */
  animation:
    ${fadeInScale} 1s ease-out ${({ delay }) => delay || '0s'} forwards,
    ${float} 4s infinite ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px) scale(1.015); /* Reduzido de -5px e 1.02 */
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15); /* Reduzido de 12px 30px */
  }

  &:before {
    content: '';
    position: absolute;
    top: -15%; /* Reduzido de -20% */
    left: -15%; /* Reduzido de -20% */
    width: 130%; /* Reduzido de 140% */
    height: 130%; /* Reduzido de 140% */
    background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 80%);
    z-index: 1;
  }

  h3 {
    font-size: 1.8rem; /* Reduzido de 2.2rem */
    color: #a100ff;
    margin-bottom: 20px; /* Reduzido de 25px */
    text-transform: uppercase;
    letter-spacing: 0.8px; /* Reduzido de 1px */
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      font-size: 1.3rem; /* Reduzido de 1.6rem */
      margin-bottom: 15px; /* Reduzido de 20px */
    }

    @media (max-width: 480px) {
      font-size: 1.1rem; /* Reduzido de 1.4rem */
    }
  }

  p,
  ul {
    font-size: 1.4rem; /* Reduzido de 1.8rem */
    color: #555;
    line-height: 1.6; /* Reduzido de 1.8 */
    text-align: center;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      font-size: 1rem; /* Reduzido de 1.2rem */
      line-height: 1.5; /* Reduzido de 1.6 */
    }

    @media (max-width: 480px) {
      font-size: 0.85rem; /* Reduzido de 1rem */
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 6px; /* Reduzido de 8px */
      display: flex;
      align-items: center;
      position: relative;

      @media (max-width: 768px) {
        margin-left: 0;
        margin-bottom: 12px; /* Reduzido de 15px */
      }

      @media (max-width: 480px) {
        margin-left: 0;
        margin-bottom: 10px; /* Reduzido de 12px */
      }
    }
  }

  ul li .first-word {
    font-size: 1.6rem; /* Reduzido de 2rem */
    color: #a100ff;
    font-weight: bold;
    margin-right: 10px; /* Reduzido de 12px */
    position: relative;
    display: inline-block;
  }

  ul li .first-word .first-letter {
    font-size: 3.2rem; /* Reduzido de 4rem */
    display: inline-block;
    line-height: 1;
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
              – Garantimos que cada pessoa seja tratada com respeito, ética e
              empatia, promovendo um atendimento humanizado e digno.
            </li>
            <li>
              <span className="first-word">
                <span className="first-letter">A</span>mor
              </span>
              – Trabalhamos com dedicação e compromisso, pois acreditamos que a
              saúde deve ser cuidada com amor e responsabilidade.
            </li>
            <li>
              <span className="first-word">
                <span className="first-letter">C</span>uidado
              </span>
              – Utilizamos inovação e tecnologia para oferecer um cuidado
              contínuo, acessível e eficiente a cada paciente.
            </li>
            <li>
              <span className="first-word">
                <span className="first-letter">C</span>arinho
              </span>
              – Acolhemos cada pessoa com carinho, proporcionando conforto,
              segurança e um atendimento humanizado.
            </li>
            <li>
              <span className="first-word">
                <span className="first-letter">A</span>tenção
              </span>
              – Ouvimos e acompanhamos cada paciente com atenção, priorizando um
              serviço próximo, empático e eficaz.
            </li>
          </ul>
        </Card>
      </ContentGrid>
    </MissionVisionContainer>
  );
}

export default MissionVisionValues;