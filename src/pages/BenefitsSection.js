import styled from 'styled-components';
import { FaLock, FaCreditCard, FaTimes, FaCheck, FaUserMd, FaUniversalAccess } from 'react-icons/fa';

const SectionContainer = styled.section`
  background-color: #a100ff; /* Fundo roxo */
  text-align: center;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const IntroText = styled.p`
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.5;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;

  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr); /* 3 cards per row on desktop/tablet */
  }
`;

const Card = styled.div`
  background-color: ${({ bgColor }) => bgColor || '#fff'};
  border-radius: 10px;
  padding: 20px;
  color: #333;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.2rem;
    margin: 10px 0;
    color: #333;
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }

  .icon {
    font-size: 2rem;
    color: #a100ff;
    margin-bottom: 10px;
  }

  .badge {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #d6df20; /* Amarelo */
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 5px 10px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

function BenefitsSection() {
  return (
    <SectionContainer>
      <Title>Por que escolher a RACCA Saúde?</Title>
      <IntroText>
        Na RACCA Saúde, oferecemos um atendimento humanizado, acessível e seguro, conectando você a profissionais qualificados para Terapia Online e Telemedicina. Sua saúde em boas mãos, sem sair de casa! Agende agora! 
      </IntroText>
      <CardGrid>
        {/* Cartão 1 */}
        <Card>
          <div className="badge">1</div>
          <FaCheck className="icon" /> {/* Icon for Praticidade */}
          <h3>Praticidade</h3>
          <p>Atendimento onde e quando precisar.</p>
        </Card>

        {/* Cartão 2 */}
        <Card bgColor="#f0e6ff">
          <div className="badge">2</div>
          <FaLock className="icon" /> {/* Icon for Segurança e Sigilo */}
          <h3>Segurança e Sigilo</h3>
          <p>Plataforma confiável e segura para seu bem-estar.</p>
        </Card>

        {/* Cartão 3 */}
        <Card>
          <div className="badge">3</div>
          <FaUserMd className="icon" /> {/* Icon for Profissionais Qualificados */}
          <h3>Profissionais Qualificados</h3>
          <p>Cuidado especializado para cada necessidade.</p>
        </Card>

        {/* Cartão 4 */}
        <Card bgColor="#f0e6ff">
          <div className="badge">4</div>
          <FaTimes className="icon" /> {/* Icon for Sem Carência */}
          <h3>Sem Carência</h3>
          <p>Todos os planos sem carência.</p>
        </Card>

        {/* Cartão 5 */}
        <Card>
          <div className="badge">5</div>
          <FaCreditCard className="icon" /> {/* Icon for Pagamento Facilitado */}
          <h3>Pagamento Facilitado</h3>
          <p>Boleto Bancário, Cartão de Crédito e PIX.</p>
        </Card>

        {/* Cartão 6 */}
        <Card bgColor="#f0e6ff">
          <div className="badge">6</div>
          <FaUniversalAccess className="icon" /> {/* Icon for Acessibilidade */}
          <h3>Acessibilidade</h3>
          <p>Planos acessíveis para todos.</p>
        </Card>
      </CardGrid>
    </SectionContainer>
  );
}

export default BenefitsSection;