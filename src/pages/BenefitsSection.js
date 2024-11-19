import styled from 'styled-components';
import { FaLock, FaCreditCard, FaTimes } from 'react-icons/fa'; // Ícones para os cartões

const SectionContainer = styled.section`
  background-color: #a100ff; /* Fundo roxo */
  padding: 50px 20px;
  text-align: center;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 30px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
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
      <Title>Por que escolher a Racca Saúde?</Title>
      <CardGrid>
        {/* Cartão 1 */}
        <Card>
          <div className="badge">1</div>
          <FaLock className="icon" />
          <h3>Ambiente Seguro</h3>
          <p>Consultas Privadas</p>
        </Card>

        {/* Cartão 2 */}
        <Card bgColor="#f0e6ff">
          <div className="badge">2</div>
          <FaCreditCard className="icon" />
          <h3>Pagamento Facilitado</h3>
          <p>Cartão de crédito, Pix ou Boleto Bancário</p>
        </Card>

        {/* Cartão 3 */}
        <Card>
          <div className="badge">3</div>
          <FaTimes className="icon" />
          <h3>Sem Carência</h3>
          <p>Todos os planos sem carência.</p>
        </Card>
      </CardGrid>
    </SectionContainer>
  );
}

export default BenefitsSection;
