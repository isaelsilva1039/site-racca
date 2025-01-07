import React, { useState } from 'react';
import './Plans.css';
import { FaHeart, FaStar, FaGem, FaBolt, FaCrown } from 'react-icons/fa';

function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // creditCard, pix, boleto
  const [payerInfo, setPayerInfo] = useState({
    name: '',
    email: '',
    cpfCnpj: '',
    phone: '',
    address: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    ccv: '',
  });
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 1,
      icon: <FaHeart />,
      title: 'Plano Básico',
      amount: 79.9,
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
      amount: 89.9,
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
      amount: 15.0,
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
      amount: 39.9,
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
      amount: 109.9,
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
      amount: 99.9,
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
      amount: 119.9,
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

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'payer') {
      setPayerInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      setPaymentInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sanitizedPlan = {
        id: selectedPlan.id,
        title: selectedPlan.title,
        amount: selectedPlan.amount,
      };

      const requestBody = {
        payer: { ...payerInfo },
        paymentMethod,
        plan: sanitizedPlan,
      };

      if (paymentMethod === 'creditCard') {
        requestBody.paymentInfo = { ...paymentInfo };
      }

      console.log('Dados enviados:', requestBody); // Log para debug

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/process_payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Pagamento realizado com sucesso!');
        closeModal();
      } else {
        throw new Error(result.message || 'Erro ao processar pagamento');
      }
    } catch (error) {
      alert(`Erro no pagamento: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setIsModalOpen(false);
    setPayerInfo({ name: '', email: '', cpfCnpj: '', phone: '', address: '' });
    setPaymentInfo({ cardNumber: '', expiryMonth: '', expiryYear: '', ccv: '' });
    setPaymentMethod('creditCard');
  };

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
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <button onClick={() => openModal(plan)} className="plan-button">
              Assine Agora
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="modal-close">
              Fechar
            </button>
            <h3>{`Pagamento para o plano ${selectedPlan.title}`}</h3>
            <form onSubmit={handleSubmit}>
              <h4>Informações do Pagador</h4>
              <input
                type="text"
                name="name"
                placeholder="Nome Completo"
                value={payerInfo.name}
                onChange={(e) => handleInputChange(e, 'payer')}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={payerInfo.email}
                onChange={(e) => handleInputChange(e, 'payer')}
                required
              />
              <input
                type="text"
                name="cpfCnpj"
                placeholder="CPF ou CNPJ"
                value={payerInfo.cpfCnpj}
                onChange={(e) => handleInputChange(e, 'payer')}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Telefone"
                value={payerInfo.phone}
                onChange={(e) => handleInputChange(e, 'payer')}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Endereço"
                value={payerInfo.address}
                onChange={(e) => handleInputChange(e, 'payer')}
                required
              />

              <h4>Forma de Pagamento</h4>
              <div className="form-group payment-methods">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === 'creditCard'}
                    onChange={() => handlePaymentMethodChange('creditCard')}
                  />
                  Cartão de Crédito
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pix"
                    checked={paymentMethod === 'pix'}
                    onChange={() => handlePaymentMethodChange('pix')}
                  />
                  Pix
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="boleto"
                    checked={paymentMethod === 'boleto'}
                    onChange={() => handlePaymentMethodChange('boleto')}
                  />
                  Boleto Bancário
                </label>
              </div>

              {paymentMethod === 'creditCard' && (
                <>
                  <h4>Informações do Cartão</h4>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Número do Cartão"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handleInputChange(e, 'payment')}
                    required
                  />
                  <input
                    type="text"
                    name="expiryMonth"
                    placeholder="Mês de Validade (MM)"
                    value={paymentInfo.expiryMonth}
                    onChange={(e) => handleInputChange(e, 'payment')}
                    required
                  />
                  <input
                    type="text"
                    name="expiryYear"
                    placeholder="Ano de Validade (AAAA)"
                    value={paymentInfo.expiryYear}
                    onChange={(e) => handleInputChange(e, 'payment')}
                    required
                  />
                  <input
                    type="text"
                    name="ccv"
                    placeholder="CCV"
                    value={paymentInfo.ccv}
                    onChange={(e) => handleInputChange(e, 'payment')}
                    required
                  />
                </>
              )}

              <button type="submit" disabled={loading}>
                {loading ? 'Processando...' : 'Finalizar Pagamento'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Plans;
