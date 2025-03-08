import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AboutContainer = styled.section`
  text-align: center;
  background: #ffffff; /* Alterado para branco puro */
  color: #333;
  position: relative;
  overflow: hidden;
  padding: 50px 0;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const Title = styled.h2`
  font-size: 5.5rem;
  margin-bottom: 40px;
  color: #a100ff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  animation: ${fadeInUp} 1s ease-out;

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

const Content = styled.div`
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
  line-height: 1.8;
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(161, 0, 255, 0.2);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const TextBlock = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 1s ease-out forwards;
  animation-delay: ${({ delay }) => delay || '0s'};
  text-align: center;

  h3 {
    font-size: 2.2rem;
    color: #a100ff;
    margin: 25px 0 15px;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media (max-width: 768px) {
      font-size: 1.6rem;
      margin: 20px 0 10px;
    }

    @media (max-width: 480px) {
      font-size: 1.4rem;
      margin: 15px 0 8px;
    }
  }

  p {
    font-size: 1.4rem;
    color: #555;
    margin-bottom: 25px;
    text-align: center;
    transition: color 0.3s ease;

    &:hover {
      color: #333;
    }

    @media (max-width: 768px) {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      margin-bottom: 15px;
    }
  }
`;

function AboutRacca() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AboutContainer>
      <Title>O Grupo RACCA</Title>
      <Content>
        <TextBlock delay="0.2s">
          <p>
            A RACCA Saúde foi fundada em 11 de maio de 2023 com o compromisso de transformar o acesso à saúde por meio de soluções inovadoras, como Terapia Online e Telemedicina. Desde então, a empresa se dedica a oferecer serviços de saúde digital de alta qualidade, priorizando o atendimento humanizado e o bem-estar dos pacientes, independentemente de sua localização.
          </p>
        </TextBlock>
        <TextBlock delay="0.4s">
          <p>
            Com a missão de proporcionar atendimentos inovadores e acessíveis, a RACCA Saúde tem se destacado no setor ao utilizar tecnologia de ponta para conectar pacientes a profissionais qualificados de forma prática, segura e eficiente. O atendimento humanizado, baseado na empatia e no acolhimento, é um dos principais pilares da empresa, garantindo que cada paciente receba um cuidado personalizado e adaptado às suas necessidades individuais.
          </p>
        </TextBlock>
        <TextBlock delay="0.6s">
          <p>
            Sempre em busca de oferecer mais conveniência e qualidade, a RACCA Saúde se prepara para inaugurar a primeira unidade da RACCAClinlab em Itaberaba-BA. Essa nova unidade tem como objetivo proporcionar um atendimento ágil, acessível e integrado, combinando a expertise da telemedicina com a confiabilidade dos serviços laboratoriais, tudo em um único local.
          </p>
        </TextBlock>
        <TextBlock delay="0.8s">
          <p>
            Com um olhar voltado para o futuro, a RACCA Saúde segue firme em sua missão de se tornar referência em soluções de saúde digital, oferecendo um serviço moderno, responsável e acessível a todos.
          </p>
        </TextBlock>
      </Content>
    </AboutContainer>
  );
}

export default AboutRacca;