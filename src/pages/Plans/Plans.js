import React, { useEffect, useState } from 'react';
import './Plans.css';
import { FaHeart, FaStar, FaGem, FaBolt, FaCrown } from 'react-icons/fa';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

// Inicializa o Mercado Pago com a chave pública
initMercadoPago('APP_USR-849ed4e7-e2a8-48d5-a831-b2f7c8639ed8');

function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payerInfo, setPayerInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    identification_type: '',
    identification_number: '',
    street_name: '',
    street_number: '',
    zip_code: '',
    area_code: '',
    phone_number: '',
  });

  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePayerInfo = () => {
    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'identification_type',
      'identification_number',
      'street_name',
      'street_number',
      'zip_code',
      'area_code',
      'phone_number',
    ];

    for (let field of requiredFields) {
      if (!payerInfo[field]) {
        alert(`Por favor, preencha o campo ${field.replace('_', ' ')}`);
        return false;
      }
    }

    return true;
  };

  const onSubmit = async ({ formData }) => {
    if (!validatePayerInfo()) {
      return;
    }

    const paymentData = {
      transaction_amount: selectedPlan.amount,
      token: formData.token,
      description: `Assinatura do ${selectedPlan.title}`,
      installments: formData.installments,
      payment_method_id: formData.payment_method_id,
      issuer_id: formData.issuer_id,
      payer: {
        email: payerInfo.email,
        first_name: payerInfo.first_name,
        last_name: payerInfo.last_name,
        identification: {
          type: payerInfo.identification_type,
          number: payerInfo.identification_number,
        },
        address: {
          street_name: payerInfo.street_name,
          street_number: payerInfo.street_number,
          zip_code: payerInfo.zip_code,
        },
        phone: {
          area_code: payerInfo.area_code,
          number: payerInfo.phone_number,
        },
      },
      external_reference: `ORDER_${Date.now()}`,
      items: [
        {
          id: selectedPlan.id,
          title: selectedPlan.title,
          description: selectedPlan.benefits.join(', '),
          quantity: 1,
          unit_price: selectedPlan.amount,
          category_id: 'services', // Ajuste conforme a categoria apropriada
        },
      ],
    };

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/process_payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar pagamento');
      }

      const paymentResult = await response.json();
      if (paymentResult.merchant_order && paymentResult.merchant_order.status === 'closed') {
        console.log('Pagamento realizado com sucesso:', paymentResult);
        alert('Pagamento realizado com sucesso!');
      } else {
        throw new Error('Status do merchant_order não está fechado.');
      }

      closeModal();
    } catch (error) {
      console.error('Erro no pagamento:', error);
      alert(`Erro no pagamento: ${error.message}`);
    } finally {
      setLoading(false);
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
    setPayerInfo({
      first_name: '',
      last_name: '',
      email: '',
      identification_type: '',
      identification_number: '',
      street_name: '',
      street_number: '',
      zip_code: '',
      area_code: '',
      phone_number: '',
    });
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
            
            {/* Formulário para coletar informações do pagador */}
            <form className="payer-form">
              <h4>Informações do Pagador</h4>
              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="first_name"
                  value={payerInfo.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Sobrenome:</label>
                <input
                  type="text"
                  name="last_name"
                  value={payerInfo.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>E-mail:</label>
                <input
                  type="email"
                  name="email"
                  value={payerInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tipo de Identificação:</label>
                <select
                  name="identification_type"
                  value={payerInfo.identification_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="CPF">CPF</option>
                  <option value="CNPJ">CNPJ</option>
                  {/* Adicione outros tipos conforme necessário */}
                </select>
              </div>
              <div className="form-group">
                <label>Número da Identificação:</label>
                <input
                  type="text"
                  name="identification_number"
                  value={payerInfo.identification_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Endereço:</label>
                <input
                  type="text"
                  name="street_name"
                  placeholder="Rua, Avenida, etc."
                  value={payerInfo.street_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Número:</label>
                <input
                  type="text"
                  name="street_number"
                  value={payerInfo.street_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cep:</label>
                <input
                  type="text"
                  name="zip_code"
                  value={payerInfo.zip_code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Código de Área:</label>
                <input
                  type="text"
                  name="area_code"
                  value={payerInfo.area_code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Telefone:</label>
                <input
                  type="text"
                  name="phone_number"
                  value={payerInfo.phone_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>

            {/* Componente de Pagamento do Mercado Pago */}
            <Payment
              initialization={initialization(selectedPlan.preferenceId, selectedPlan.amount)}
              customization={customization}
              onSubmit={onSubmit}
              onError={onError}
              styles={{
                input: {
                  fontSize: '16px',
                  color: '#333',
                },
                invalid: {
                  color: '#e1e1e1',
                },
              }}
            />

            {loading && <p>Processando pagamento...</p>}
          </div>
        </div>
      )}
    </section>
  );
}

export default Plans;
