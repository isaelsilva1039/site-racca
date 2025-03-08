import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { FaLock, FaCreditCard, FaTimes, FaCheck, FaUserMd, FaUniversalAccess } from 'react-icons/fa';

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

const SectionContainer = styled.section`
  text-align: center;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%); /* Gradiente consistente */
  color: #333;
  position: relative;
  overflow: hidden;
  padding: 50px 20px; /* Mais espaço vertical e lateral */

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const Title = styled.h2`
  font-size: 5.5rem; /* Aumentado para consistência com TestimonialsSection */
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

const IntroText = styled.p`
  color: #333;
  font-size: 1.4rem; /* Aumentado para legibilidade */
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px; /* Aumentado para mais espaço */
  max-width: 1200px; /* Limitado para melhor controle */
  margin: 0 auto;
  padding: 0 10px;

  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const Card = styled.div`
  background: #ffffff; /* Fundo branco consistente */
  border-radius: 15px; /* Bordas mais arredondadas */
  padding: 25px; /* Aumentado para mais espaço interno */
  color: #333;
  position: relative;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Sombra mais suave */
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeInUp} 1s ease-out ${({ delay }) => delay || '0s'} forwards;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.5rem; /* Aumentado para consistência */
    margin: 15px 0;
    color: #a100ff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    font-size: 1.1rem; /* Aumentado para legibilidade */
    color: #555;
    line-height: 1.5;
  }

  .icon {
    font-size: 2.5rem; /* Ícones maiores */
    color: #a100ff;
    margin-bottom: 15px;
  }

  .badge {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #d6df20; /* Amarelo mantido */
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 5px 10px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    z-index: 1;
  }
`;

function BenefitsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger animation when component mounts
  }, []);

  return (
    <SectionContainer>
      <Title>Por que escolher a RACCA Saúde?</Title>
      <IntroText>
        Na RACCA Saúde, oferecemos um atendimento humanizado, acessível e seguro, conectando você a profissionais qualificados para Terapia Online e Telemedicina. Sua saúde em boas mãos, sem sair de casa! Agende agora!
      </IntroText>
      <CardGrid>
        {/* Cartão 1 */}
        <Card delay="0.2s">
          <div className="badge">1</div>
          <FaCheck className="icon" />
          <h3>Praticidade</h3>
          <p>Atendimento onde e quando precisar.</p>
        </Card>

        {/* Cartão 2 */}
        <Card delay="0.4s" bgColor="#f0e6ff">
          <div className="badge">2</div>
          <FaLock className="icon" />
          <h3>Segurança e Sigilo</h3>
          <p>Plataforma confiável e segura para seu bem-estar.</p>
        </Card>

        {/* Cartão 3 */}
        <Card delay="0.6s">
          <div className="badge">3</div>
          <FaUserMd className="icon" />
          <h3>Profissionais Qualificados</h3>
          <p>Cuidado especializado para cada necessidade.</p>
        </Card>

        {/* Cartão 4 */}
        <Card delay="0.8s" bgColor="#f0e6ff">
          <div className="badge">4</div>
          <FaTimes className="icon" />
          <h3>Sem Carência</h3>
          <p>Todos os planos sem carência.</p>
        </Card>

        {/* Cartão 5 */}
        <Card delay="1.0s">
          <div className="badge">5</div>
          <FaCreditCard className="icon" />
          <h3>Pagamento Facilitado</h3>
          <p>Boleto Bancário, Cartão de Crédito e PIX.</p>
        </Card>

        {/* Cartão 6 */}
        <Card delay="1.2s" bgColor="#f0e6ff">
          <div className="badge">6</div>
          <FaUniversalAccess className="icon" />
          <h3>Acessibilidade</h3>
          <p>Planos acessíveis para todos.</p>
        </Card>
      </CardGrid>
    </SectionContainer>
  );
}

export default BenefitsSection;