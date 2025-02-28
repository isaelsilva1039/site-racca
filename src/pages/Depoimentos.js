import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TestimonialsContainer = styled.section`
  padding: 10px 0px; /* Reduzido padding lateral para telas menores */
  text-align: center;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  color: #333;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px 0px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #a100ff;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const CarouselWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: auto; /* Altura dinâmica para se adaptar ao conteúdo */
  min-height: 500px; /* Altura mínima para consistência */
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    min-height: 300px;
  }
`;

const TestimonialCard = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(161, 0, 255, 0.1);
  transition: all 0.5s ease;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transform: ${({ isActive }) => (isActive ? 'translateX(0)' : 'translateX(100%)')};
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const QuoteIcon = styled(FaQuoteLeft)`
  font-size: 2rem;
  color: #a100ff;
  margin-bottom: 20px; /* Mais espaço abaixo do ícone */

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8; /* Aumentado para mais espaço entre linhas */
  margin-bottom: 25px; /* Mais espaço abaixo do texto */
  max-width: 90%; /* Limita largura para melhor legibilidade */
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #a100ff;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(161, 0, 255, 0.8);
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.3s ease;
  z-index: 10;

  &:hover {
    background: #a100ff;
  }

  ${({ direction }) => (direction === 'left' ? 'left: 10px;' : 'right: 10px;')}

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.9rem;
  }
`;

function TestimonialsSection() {
  const testimonials = [
    {
      text: "Minha experiência com a RACCA Saúde foi muito boa, a começar pelo conforto em receber atendimento do sofá de casa. Recebi atendimento com um profissional super atencioso, perguntando, tirando dúvidas, e com a facilidade de receber a receita no celular. Na correria do dia a dia, a RACCA proporcionou agilidade, conforto e facilidade.",
      avatar: "https://via.placeholder.com/50?text=User"
    },
    {
      text: "Fiquei impressionado com a rapidez e a praticidade da telemedicina da RACCA Saúde. Agendei minha consulta de forma simples e fui atendido por um médico muito atencioso, que esclareceu todas as minhas dúvidas. Em poucos minutos, já tinha minha receita digital no celular e pude resolver tudo sem sair de casa. Excelente experiência!",
      avatar: "https://via.placeholder.com/50?text=User"
    },
    {
      text: "Moro em uma cidade pequena e sempre tive dificuldade para conseguir atendimento médico rápido. Com a RACCA Saúde, consegui falar com um especialista sem precisar viajar, economizando tempo e dinheiro. O atendimento foi super humanizado e a praticidade de receber a receita digital e o pedido de exames foi um diferencial. Recomendo muito!",
      avatar: "https://via.placeholder.com/50?text=User"
    },
    {
      text: "Eu estava apreensiva em fazer uma consulta online, mas a RACCA Saúde me surpreendeu. O profissional foi extremamente cuidadoso, ouviu minhas queixas com atenção e explicou tudo de maneira clara. Me senti segura e acolhida, como se estivesse em um consultório presencial. Com certeza, usarei novamente quando precisar!",
      avatar: "https://via.placeholder.com/50?text=User"
    },
    {
      text: "A RACCA Saúde foi uma grande ajuda para mim e minha família. Meu filho precisou de atendimento e conseguimos uma consulta rápida, sem enfrentar filas ou esperar dias por um horário disponível. O médico foi muito atencioso e enviou a receita diretamente para o meu celular. Recomendo para qualquer pessoa que busca praticidade sem abrir mão da qualidade!",
      avatar: "https://via.placeholder.com/50?text=User"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 15000); // Mantido em 15 segundos como no seu código
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <TestimonialsContainer>
      <Title>Depoimentos</Title>
      <CarouselWrapper>
        <NavButton direction="left" onClick={handlePrev}>
          <FaChevronLeft />
        </NavButton>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} isActive={index === activeIndex}>
            <QuoteIcon />
            <TestimonialText>"{testimonial.text}"</TestimonialText>

          </TestimonialCard>
        ))}
        <NavButton direction="right" onClick={handleNext}>
          <FaChevronRight />
        </NavButton>
      </CarouselWrapper>
    </TestimonialsContainer>
  );
}

export default TestimonialsSection;