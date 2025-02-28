import styled from 'styled-components';
import { FaStethoscope, FaComments, FaTooth, FaHeartbeat, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Para os links "Saiba Mais"

const ServicesContainer = styled.section`
  padding: 50px;
  text-align: center;
  background-color: #eaf4ff; /* Mesmo fundo claro do Benefits */
  color: #333;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #a100ff; /* Roxo característico */

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colunas no desktop */
  grid-template-rows: auto; /* Apenas 1 linha, já que temos 5 serviços */
  gap: 30px; /* Mesmo gap do Benefits */
  padding: 0 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 3 colunas em tablets */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsivo em mobile */
    gap: 15px; /* Mesmo gap reduzido do Benefits */
    padding: 0 10px; /* Mesmo padding reduzido em mobile */
  }
`;

const ServiceCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra igual ao Benefits */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Mesmo efeito hover */
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
    margin-bottom: 15px;

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

const ServiceLink = styled(Link)`
  background-color: #fff;
  color: #a100ff;
  border: 2px solid #a100ff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #a100ff;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

function ServicesSection() {
  return (
    <ServicesContainer>
      <Title>Nossos Serviços</Title>
      <Grid>
        {/* Telemedicina */}
        <ServiceCard>
          <IconWrapper><FaStethoscope /></IconWrapper>
          <h3>Telemedicina</h3>
          <p>Planos com consultas médicas online com profissionais qualificados.</p>
          <ServiceLink to="/telemedicina">Saiba Mais</ServiceLink>
        </ServiceCard>

        {/* Terapia Online */}
        <ServiceCard>
          <IconWrapper><FaComments /></IconWrapper>
          <h3>Terapia Online</h3>
          <p>Sessões de psicoterapia realizadas virtualmente.</p>
          <ServiceLink to="/terapia-online">Saiba Mais</ServiceLink>
        </ServiceCard>

        {/* Planos Odontológicos */}
        <ServiceCard>
          <IconWrapper><FaTooth /></IconWrapper>
          <h3>Planos Odontológicos</h3>
          <p>Cuidados completos para a saúde bucal.</p>
          <ServiceLink to="/planos-odontologicos">Saiba Mais</ServiceLink>
        </ServiceCard>

        {/* Programa Cuidar Conectado */}
        <ServiceCard>
          <IconWrapper><FaHeartbeat /></IconWrapper>
          <h3>Programa Cuidar Conectado</h3>
          <p>Acompanhamento preventivo personalizado.</p>
          <ServiceLink to="/cuidar-conectado">Saiba Mais</ServiceLink>
        </ServiceCard>

        {/* Seguros Pessoais */}
        <ServiceCard>
          <IconWrapper><FaShieldAlt /></IconWrapper>
          <h3>Seguros Pessoais</h3>
          <p>Diversos seguros disponíveis pra você.</p>
          <ServiceLink to="/seguros-pessoais">Saiba Mais</ServiceLink>
        </ServiceCard>
      </Grid>
    </ServicesContainer>
  );
}

export default ServicesSection;