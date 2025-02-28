import styled, { keyframes, css } from 'styled-components';
import { useState, useEffect } from 'react';
import { FaHandsHelping, FaHeart, FaShieldAlt, FaSmile, FaEye } from 'react-icons/fa'; // Ícones representativos

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

const MissionVisionContainer = styled.section`
  padding: 50px 20px;
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
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
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    gap: 20px;
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const Card = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 255, 0.9) 100%);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(161, 0, 255, 0.2);
  position: relative;
  overflow: hidden;
  animation: ${fadeInScale} 1s ease-out ${({ delay }) => delay || '0s'} forwards,
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

  p, ul {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.8;
    text-align: left;
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
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 30px; /* Aumentei o gap para acomodar ícones maiores */
      position: relative;

      .value-icon {
        font-size: 4.8rem; /* Aumentado para ícones maiores */
        color: ${({ color }) => color || '#a100ff'};
        animation: pulse 2s infinite ease-in-out;
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      @media (max-width: 768px) {
        margin-bottom: 12px;
        gap: 12px;

        .value-icon {
          font-size: 1.5rem; /* Reduzido em tablets */
        }
      }

      @media (max-width: 480px) {
        margin-bottom: 10px;
        gap: 10px;

        .value-icon {
          font-size: 1.3rem; /* Reduzido em mobile */
        }
      }
    }
  }
`;

function MissionVisionValues() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger animation when component mounts
  }, []);

  return (
    <MissionVisionContainer>
      <Title>Missão, Visão e Valores</Title>
      <ContentGrid>
        <Card delay="0.2s">
          <h3>Visão</h3>
          <p>Ser referência em saúde digital, oferecendo acesso seguro e eficiente a terapias online e telemedicina, promovendo o bem-estar de todos.</p>
        </Card>
        <Card delay="0.4s">
          <h3>Missão</h3>
          <p>Proporcionar atendimentos de saúde inovadores e humanizados, por meio de terapia online e telemedicina, com tecnologia de ponta e foco na qualidade.</p>
        </Card>
        <Card delay="0.6s">
          <h3>Valores</h3>
          <ul>
            <li>
              <FaHandsHelping className="value-icon" color="#00ff00" />
              Respeito – Garantimos que cada pessoa seja tratada com respeito, ética e empatia, promovendo um atendimento humanizado e digno.
            </li>
            <li>
              <FaHeart className="value-icon" color="#ff8000" />
              Amor – Trabalhamos com dedicação e compromisso, pois acreditamos que a saúde deve ser cuidada com amor e responsabilidade.
            </li>
            <li>
              <FaShieldAlt className="value-icon" color="#0000ff" />
              Cuidado – Utilizamos inovação e tecnologia para oferecer um cuidado contínuo, acessível e eficiente a cada paciente.
            </li>
            <li>
              <FaSmile className="value-icon" color="#a100ff" />
              Carinho – Acolhemos cada pessoa com carinho, proporcionando conforto, segurança e um atendimento humanizado.
            </li>
            <li>
              <FaEye className="value-icon" color="#ffd700" />
              Atenção – Ouvimos e acompanhamos cada paciente com atenção, priorizando um serviço próximo, empático e eficaz.
            </li>
          </ul>
        </Card>
      </ContentGrid>
    </MissionVisionContainer>
  );
}

export default MissionVisionValues;