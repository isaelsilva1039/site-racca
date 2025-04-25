import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TestimonialsContainer = styled.section`
  padding: 10px 0px;
  text-align: center;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  color: #333;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px 0px;
  }
`;

const Title = styled.h2`
  font-size: 3.7rem;
  margin-bottom: 30px;
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
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: auto; /* Altura dinâmica */
  padding-bottom: 40px; /* Espaço para os botões de navegação */

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const TestimonialCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(161, 0, 255, 0.1);
  transition: opacity 0.5s ease;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  display: ${({ isActive }) => (isActive ? 'block' : 'none')}; /* Mostra apenas o card ativo */
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  height: auto; /* Altura dinâmica */

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const QuoteIcon = styled(FaQuoteLeft)`
  font-size: 2rem;
  color: #a100ff;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.6rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 25px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 15px;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%; /* Centraliza verticalmente em relação ao card */
  transform: translateY(-50%); /* Ajusta para o centro exato */
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

  ${({ direction }) => (direction === 'left' ? 'left: 0px;' : 'right: 0px;')}

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
    }, 15000);
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