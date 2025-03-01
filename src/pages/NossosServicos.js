import styled from 'styled-components';
import { FaStethoscope, FaComments, FaTooth, FaHeartbeat, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ServicesContainer = styled.section`
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
  display: flex; /* Single row on desktop */
  justify-content: space-between; /* Distribute items evenly */
  gap: 30px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack vertically on mobile */
    gap: 15px; /* Reduced gap for mobile */
    padding: 0 10px;
  }
`;

const ServiceCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1; /* Equal width for all cards on desktop */
  min-width: 0; /* Prevent overflow */
  box-sizing: border-box;

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
  const services = [
    {
      icon: <FaStethoscope />,
      title: "Telemedicina",
      description: "Planos com consultas médicas online com profissionais qualificados.",
      link: "/telemedicina",
    },
    {
      icon: <FaComments />,
      title: "Terapia Online",
      description: "Sessões de psicoterapia realizadas virtualmente.",
      link: "/terapia-online",
    },
    {
      icon: <FaTooth />,
      title: "Planos Odontológicos",
      description: "Cuidados completos para a saúde bucal.",
      link: "/planos-odontologicos",
    },
    {
      icon: <FaHeartbeat />,
      title: "Programa Cuidar Conectado",
      description: "Acompanhamento preventivo personalizado.",
      link: "/cuidar-conectado",
    },
    {
      icon: <FaShieldAlt />,
      title: "Seguros Pessoais",
      description: "Diversos seguros disponíveis pra você.",
      link: "/seguros-pessoais",
    },
  ];

  return (
    <ServicesContainer>
      <Title>Nossos Serviços</Title>
      <Grid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <IconWrapper>{service.icon}</IconWrapper>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ServiceLink to={service.link}>Saiba Mais</ServiceLink>
          </ServiceCard>
        ))}
      </Grid>
    </ServicesContainer>
  );
}

export default ServicesSection;