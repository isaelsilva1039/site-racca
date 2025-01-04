import React, { useEffect, useState } from 'react';
import './Plans.css';
import { FaHeart, FaStar, FaGem, FaBolt, FaCrown } from 'react-icons/fa';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

// Inicializa o Mercado Pago com a chave pública
initMercadoPago('APP_USR-1bbe4abf-703f-4e4a-a36e-844a0e570a0c');

function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plans = [
    {
      id: 1,
      icon: <FaHeart />,
      title: 'Plano Básico',
      preferenceId: 'PREFERENCE_ID_BASIC',
      amount: 79.9, // Valor em reais
      prices: { mensal: 'R$ 79,90/mês' },
      benefits: [
        'Consultas online ilimitadas',
        'Descontos em farmácias',
        'Acesso ao histórico médico',
      ],
    },
    {
      id: 471,
      icon: <FaStar />,
      title: 'Plano Confort',
      preferenceId: 'PREFERENCE_ID_CONFORT',
      amount: 89.9, // Valor em reais
      prices: {
        fidelidade: 'R$ 89,90/mês c/ fidelidade 12 meses',
        semFidelidade: 'R$ 129,90/mês s/ fidelidade',
      },
      benefits: [
        'Desconto em farmácias parceiras',
        '5% de desconto p/ pagamento antecipado',
        '2 terapias mensais de 45 minutos cada',
      ],
    },
    {
      id: 3907,
      icon: <FaGem />,
      title: 'Plano RACCA Proteção Plus',
      preferenceId: 'PREFERENCE_ID_PROTECAO_PLUS',
      amount: 15.0, // Valor em reais
      prices: { fidelidade: 'R$ 15,00/mês c/ fidelidade 12 meses' },
      benefits: [
        'Assistência Funeral Familiar de R$ 7.000,00',
        'MA - Morte Acidental - Capital Segurado R$ 20.000,00',
        'IPA - Invalidez por Acidente - Capital Segurado R$ 20.000,00',
        'Reembolso de Medicamentos Genéricos Gratuitos até R$ 150,00',
      ],
    },
    {
      id: 'ID_DINAMICO',
      icon: <FaCrown />,
      title: 'Plano Personalize',
      preferenceId: 'PREFERENCE_ID_PERSONALIZE',
      amount: 39.9, // Valor em reais
      prices: { mensal: 'R$ 39,90/mês s/ fidelidade' },
      benefits: [
        'Desconto em farmácias parceiras',
        '5% de desconto p/ pagamento antecipado',
        'Valor da consulta por especialidade:',
        'Psicólogo e Nutricionista: R$ 50,00',
        'Psiquiatra: R$ 100,00',
        'Médicos Especialistas: R$ 60,00',
      ],
    },
    {
      id: 1084,
      icon: <FaGem />,
      title: 'Plano Confort Extra',
      preferenceId: 'PREFERENCE_ID_CONFORT_EXTRA',
      amount: 109.9, // Valor em reais
      prices: {
        fidelidade: 'R$ 109,90/mês c/ fidelidade 12 meses',
        semFidelidade: 'R$ 149,90/mês s/ fidelidade',
      },
      benefits: [
        'Desconto em farmácias parceiras',
        '5% de desconto p/ pagamento antecipado',
        '4 terapias mensais de 45 minutos cada',
      ],
    },
    {
      id: 500,
      icon: <FaBolt />,
      title: 'Plano Premium',
      preferenceId: 'PREFERENCE_ID_PREMIUM',
      amount: 99.9, // Valor em reais
      prices: {
        fidelidade: 'R$ 99,90/mês c/ fidelidade 12 meses',
        semFidelidade: 'R$ 139,90/mês s/ fidelidade',
      },
      benefits: [
        'Desconto em farmácias parceiras',
        '5% de desconto p/ pagamento antecipado',
        '2 terapias mensais de 45 minutos cada',
        '1 sessão com especialista ao mês',
        'Especialistas Disponíveis: Cardiologista, Dermatologista, Endocrinologista, Geriatria, Ginecologista, Neurologista, Nutricionista, Ortopedista, Otorrinolaringologista, Pediatria, Traumatologia, Urologista.',
      ],
    },
    {
      id: 706,
      icon: <FaCrown />,
      title: 'Plano Premium Extra',
      preferenceId: 'PREFERENCE_ID_PREMIUM_EXTRA',
      amount: 119.9, // Valor em reais
      prices: {
        fidelidade: 'R$ 119,90/mês c/ fidelidade 12 meses',
        semFidelidade: 'R$ 159,90/mês s/ fidelidade',
      },
      benefits: [
        'Desconto em farmácias parceiras',
        '5% de desconto p/ pagamento antecipado',
        '4 terapias mensais de 45 minutos cada',
        '1 sessão com especialista ao mês',
        'Especialistas Disponíveis: Cardiologista, Dermatologista, Endocrinologista, Geriatria, Ginecologista, Neurologista, Nutricionista, Ortopedista, Otorrinolaringologista, Pediatria, Traumatologia, Urologista.',
      ],
    },
  ];

  const initialization = (preferenceId, amount) => ({
    preferenceId,
    amount,
  });

  const customization = {
    paymentMethods: {
      ticket: 'all',
      bankTransfer: 'all',
      creditCard: 'all',
      debitCard: 'all',
      mercadoPago: 'all',
    },
  };

  const onSubmit = async ({ formData }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/process_payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar pagamento');
      }

      const paymentResult = await response.json();
      console.log('Pagamento realizado com sucesso:', paymentResult);
      alert('Pagamento realizado com sucesso!');
      closeModal();
    } catch (error) {
      console.error('Erro no pagamento:', error);
      alert(`Erro no pagamento: ${error.message}`);
    }
  };

  const onError = (error) => {
    console.error('Erro no pagamento:', error);
    alert('Ocorreu um erro no pagamento. Por favor, tente novamente.');
  };

  const openModal = (plan) => {
    if (!plan.preferenceId) {
      alert('Erro: Plano não possui um preferenceId válido.');
      return;
    }
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };
  }, []);

  return (
    <section className="plans-container">
      <h2 className="plans-title">Nossos Planos</h2>
      <div className="plans-grid">
        {plans.map((plan) => (
          <div className="plan-card" key={plan.id}>
            <div className="plan-icon">{plan.icon}</div>
            <h3 className="plan-title">{plan.title}</h3>
            <ul className="plan-benefits">
              {plan.benefits.map((benefit, index) => (
                <li className="plan-benefit" key={index}>{benefit}</li>
              ))}
            </ul>
            <div className="plan-prices">
              {plan.prices.fidelidade && (
                <div className="plan-price-group">
                  <span className="price-label">Com Fidelidade:</span>
                  <span className="price-value">{plan.prices.fidelidade}</span>
                </div>
              )}
              {plan.prices.semFidelidade && (
                <div className="plan-price-group">
                  <span className="price-label">Sem Fidelidade:</span>
                  <span className="price-value">{plan.prices.semFidelidade}</span>
                </div>
              )}
              {plan.prices.mensal && (
                <div className="plan-price-group">
                  <span className="price-label">Mensal:</span>
                  <span className="price-value">{plan.prices.mensal}</span>
                </div>
              )}
            </div>
            <button className="plan-button" onClick={() => openModal(plan)}>
              Assine Agora
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedPlan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeModal}>
              X
            </button>
            <h3>{`Pagamento para o ${selectedPlan.title}`}</h3>
            <Payment
              initialization={initialization(selectedPlan.preferenceId, selectedPlan.amount)}
              customization={customization}
              onSubmit={onSubmit}
              onError={onError}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Plans;
