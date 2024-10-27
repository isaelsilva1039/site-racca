import styled from 'styled-components';

const PlansContainer = styled.section`
  min-height: 100vh;
  padding: 50px;
  background-color: #a100ff;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.div`
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  background-color: #9f00ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #7d00cc;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

function Plans() {
  const plans = [
    {
      title: 'Plano Básico',
      price: 'R$ 79,90/mês',
      benefits: ['Consultas online ilimitadas', 'Descontos em farmácias', 'Acesso ao histórico médico'],
    },
    {
      title: 'Plano Confort',
      price: 'R$ 99,90/mês',
      benefits: ['2 sessões de terapia por mês', 'Consultas com especialistas', 'Suporte 24/7 via WhatsApp'],
    },
    {
      title: 'Plano Premium',
      price: 'R$ 129,90/mês',
      benefits: ['Consultas presenciais', 'Descontos exclusivos', 'Agendamento prioritário'],
    },
  ];

  return (
    <PlansContainer>
      <h2>Nossos Planos</h2>
      <PlansGrid>
        {plans.map((plan, index) => (
          <PlanCard key={index}>
            <h3>{plan.title}</h3>
            <p>{plan.price}</p>
            <ul>
              {plan.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
            <Button>Assine Agora</Button>
          </PlanCard>
        ))}
      </PlansGrid>
    </PlansContainer>
  );
}

export default Plans;
