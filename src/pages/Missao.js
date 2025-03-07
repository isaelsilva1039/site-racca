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
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

// CONTAINERS
const MissionVisionContainer = styled.section`
  text-align: center;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  color: #333;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #a100ff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  animation: ${fadeInScale} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 25px;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

/**
 * GRID:
 *  - No mobile, 1 coluna (cards empilhados).
 *  - A partir de 769px, duas colunas na primeira linha (Visão e Missão)
 *    e o terceiro card (Valores) ocupa a linha de baixo, 2 colunas.
 */
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Padrão (mobile): 1 coluna */
  grid-auto-rows: auto;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
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
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }

  /* O 3º card (Valores) ocupa as 2 colunas no desktop */
  & > div:nth-of-type(3) {
    @media (min-width: 769px) {
      grid-column: 1 / 3; /* Span nas 2 colunas */
    }
  }
`;

const Card = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(245, 245, 255, 0.9) 100%
  );
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(161, 0, 255, 0.2);
  position: relative;
  overflow: hidden;
  animation:
    ${fadeInScale} 1s ease-out ${({ delay }) => delay || '0s'} forwards,
    ${float} 4s infinite ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  &:before {
    content: '';
    position: absolute;
    top: -20%;
    left: -20%;
    width: 140%;
    height: 140%;
    background: radial-gradient(circle, rgba(161, 0, 255, 0.05) 0%, transparent 80%);
    z-index: 1;
  }

  h3 {
    font-size: 1.8rem;
    color: #a100ff;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      font-size: 1.4rem;
      margin-bottom: 15px;
    }

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }

  p,
  ul {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.8;
    text-align: center;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 5px;
      display: flex; 
      align-items: center; 
      position: relative;

      @media (max-width: 768px) {
        margin-left: 0;   /* Zera no mobile/tablet */
        margin-bottom: 12px;
      }

      @media (max-width: 480px) {
        margin-left: 0;   /* Zera no mobile menor */
        margin-bottom: 10px;
      }
    }
  }

  /* A primeira palavra (ex: Respeito) ainda maior */
  ul li .first-word {
    font-size: 1.6rem;  /* Aumente conforme desejar */
    color: #a100ff;
    font-weight: bold;
    margin-right: 10px; 
    position: relative;
    display: inline-block; 
  }

  /* A primeira letra (ex: R de Respeito) ainda mais destacada */
  ul li .first-word .first-letter {
    font-size: 3.2rem;  /* Aumente conforme desejar */
    display: inline-block;
    line-height: 1; /* Para evitar quebra */
  }
`;

function MissionVisionValues() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ativa animação quando o componente é montado
    setIsVisible(true);
  }, []);

  return (
    <MissionVisionContainer>
      <Title>Missão, Visão e Valores</Title>
      <ContentGrid>
        {/* 1º Card (Visão) */}
        <Card delay="0.2s">
          <h3>Visão</h3>
          <p>
            Ser referência em saúde digital, oferecendo acesso seguro e eficiente
            a terapias online e telemedicina, promovendo o bem-estar de todos.
          </p>
        </Card>

        {/* 2º Card (Missão) */}
        <Card delay="0.4s">
          <h3>Missão</h3>
          <p>
            Proporcionar atendimentos de saúde inovadores e humanizados, por meio
            de terapia online e telemedicina, com tecnologia de ponta e foco na
            qualidade.
          </p>
        </Card>

        {/* 3º Card (Valores) - abaixo, ocupando toda a largura no desktop */}
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
