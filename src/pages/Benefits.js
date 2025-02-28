import styled from 'styled-components';
import { FaVideo, FaStethoscope, FaLaptop, FaMoneyBillWave, FaLock, FaHeartbeat, FaCog, FaCalendar } from 'react-icons/fa'; // Replaced FaAccessibleIcon with FaLaptop

const BenefitsContainer = styled.section`
  padding: 50px;
  text-align: center;
  background-color: #eaf4ff;
  color: #333;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #a100ff;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  /* Desktop layout: 2 rows of 4 cards each */
  grid-template-columns: repeat(4, 1fr); /* 4 columns by default for desktop */
  grid-template-rows: repeat(2, auto); /* 2 rows */
  gap: 30px; /* Default gap for desktop/tablet */
  padding: 0 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 3 columns for tablets */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive grid for mobile */
    gap: 15px; /* Increased gap on mobile for better separation */
    padding: 0 10px; /* Reduced side padding on mobile */
  }
`;

const BenefitCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  box-sizing: border-box; /* Ensure padding doesn’t exceed card size */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    color: #a100ff;
    font-size: 1.5rem;
    margin: 15px 0 10px;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      margin: 10px 0 5px;
    }
  }

  p {
    font-size: 1rem;
    color: #666;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: #a100ff;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }
`;

function Benefits() {
  return (
    <BenefitsContainer>
      <Title>Benefícios da Telemedicina</Title>
      <Grid>
        <BenefitCard>
          <IconWrapper><FaVideo /></IconWrapper>
          <h3>Terapia Online</h3>
          <p>Sessões de terapia acessíveis de qualquer lugar.</p>
        </BenefitCard>

        <BenefitCard>
          <IconWrapper><FaStethoscope /></IconWrapper>
          <h3>Telemedicina</h3>
          <p>Consultas médicas remotas com qualidade.</p>
        </BenefitCard>

        <BenefitCard>
          <IconWrapper><FaLaptop /></IconWrapper>
          <h3>Acessibilidade e Conveniência</h3>
          <p>Fácil acesso e conforto para suas consultas.</p>
        </BenefitCard>

        <BenefitCard>
          <IconWrapper><FaMoneyBillWave /></IconWrapper>
          <h3>Custo-benefício</h3>
          <p>Economize tempo e recursos com atendimentos online.</p>
        </BenefitCard>

        <BenefitCard>
          <IconWrapper><FaLock /></IconWrapper>
          <h3>Privacidade e Conforto</h3>
          <p>Atendimentos seguros e no conforto de casa.</p>
        </BenefitCard>

        <BenefitCard>
          <IconWrapper><FaHeartbeat /></IconWrapper>
          <h3>Continuidade do Tratamento</h3>
          <p>Manutenção consistente do seu cuidado médico.</p>
        </BenefitCard>

        <BenefitCard>
          <IconWrapper><FaCog /></IconWrapper>
          <h3>Tecnologia e Personalização</h3>
          <p>Soluções tecnológicas sob medida para sua saúde.</p>
        </BenefitCard>

        <BenefitCard>
          <IconWrapper><FaCalendar /></IconWrapper>
          <h3>Flexibilidade de Horários</h3>
          <p>Marque consultas nos horários que melhor se adequam a você.</p>
        </BenefitCard>
      </Grid>
    </BenefitsContainer>
  );
}

export default Benefits;