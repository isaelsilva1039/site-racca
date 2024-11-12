import styled from 'styled-components';
import { FaStethoscope,  FaUserMd, FaMoneyBillWave, FaHeartbeat, FaShieldAlt } from 'react-icons/fa';

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
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px; /* Adicionando mais espaço entre os cards */
  padding: 0 20px; /* Espaço extra nas laterais */
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

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    color: #a100ff;
    font-size: 1.5rem;
    margin: 15px 0 10px;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: #a100ff;
  margin-bottom: 10px;
`;

function Benefits() {
  return (
    <BenefitsContainer>
      <Title>Benefícios da Telemedicina</Title>
      <Grid>
        <BenefitCard>
          <IconWrapper><FaStethoscope /></IconWrapper>
          <h3>Atendimento Clínico</h3>
          <p>Consultas sempre que precisar, onde estiver.</p>
        </BenefitCard>

        <BenefitCard>
          <IconWrapper><FaUserMd /></IconWrapper>
          <h3>Acesso a Especialistas</h3>
          <p>Profissionais de várias áreas ao alcance.</p>
        </BenefitCard>
        <BenefitCard>
          <IconWrapper><FaMoneyBillWave /></IconWrapper>
          <h3>Redução de Custos</h3>
          <p>Economia de tempo e recursos com consultas online.</p>
        </BenefitCard>
        <BenefitCard>
          <IconWrapper><FaHeartbeat /></IconWrapper>
          <h3>Monitoramento Contínuo</h3>
          <p>Acompanhamento constante de sua saúde.</p>
        </BenefitCard>
        <BenefitCard>
          <IconWrapper><FaShieldAlt /></IconWrapper>
          <h3>Segurança e Conforto</h3>
          <p>Redução do contato físico em tempos de pandemia.</p>
        </BenefitCard>
      </Grid>
    </BenefitsContainer>
  );
}

export default Benefits;
