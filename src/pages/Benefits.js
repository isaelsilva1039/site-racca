import styled from 'styled-components';

const BenefitsContainer = styled.section`
  padding: 50px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const BenefitCard = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
`;

function Benefits() {
  return (
    <BenefitsContainer>
      <h2>Benefícios da Telemedicina</h2>
      <Grid>
        <BenefitCard>
          <h3>Atendimento Clínico</h3>
          <p>Consultas sempre que precisar.</p>
        </BenefitCard>
        <BenefitCard>
          <h3>Exames</h3>
          <p>Resultados rápidos e precisos.</p>
        </BenefitCard>
        <BenefitCard>
          <h3>Especialistas</h3>
          <p>Várias especialidades à disposição.</p>
        </BenefitCard>
      </Grid>
    </BenefitsContainer>
  );
}

export default Benefits;
