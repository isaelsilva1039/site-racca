import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar, FaCrown, FaEnvelope, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import { createCustomer, createPayment, getOrCreateCustomer } from '../services/server';
import './Plans/Plans.css'; // Import the same CSS used by Plans for consistency

const TrabalheConoscoContainer = styled.div`
  padding: 80px 15px;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  color: #333;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://www.transparenttextures.com/patterns/white-wave.png');
    opacity: 0.1;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 60px 10px;
  }
  @media (max-width: 480px) {
    padding: 50px 5px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #a007f2;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px auto;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const PlansSection = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    max-width: 1200px;
  }
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const PlanCard = styled.div`
  background: ${props => (props.plan === 'Ouro' ? 'linear-gradient(135deg, #fff5e6, #ffe4b5)' : '#fff')};
  border: 2px solid ${props => (props.plan === 'Ouro' ? '#ffd700' : '#ddd')};
  border-radius: 15px;
  padding: 25px;
  width: 100%;
  max-width: 350px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    max-width: 300px;
    padding: 20px;
  }
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 15px;
  }
`;

const PlanIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => (props.plan === 'Ouro' ? '#ffd700' : '#a007f2')};
  margin-bottom: 15px;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const PlanTitle = styled.h3`
  font-size: 1.8rem;
  color: ${props => (props.plan === 'Ouro' ? '#d4af37' : '#a007f2')};
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const PlanPrice = styled.p`
  font-size: 1.3rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const PlanBenefits = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 25px;
  text-align: left;
`;

const PlanBenefit = styled.li`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
  position: relative;
  padding-left: 25px;

  &:before {
    content: '✔';
    position: absolute;
    left: 0;
    color: ${props => (props.plan === 'Ouro' ? '#d4af37' : '#a007f2')};
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding-left: 20px;
  }
`;

const ChooseButton = styled.button`
  padding: 12px 25px;
  background: #a007f2;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  min-height: 44px;

  &:hover {
    background: #8e24aa;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
`;

const plans = [
  {
    name: 'Prata',
    id_plano_sistema_racca: 1001, // Unique ID for Prata plan
    price: 'R$ 30/mês',
    amount: 30.0,
    icon: <FaStar />,
    prices: {
      mensal: 'R$ 30,00/mês s/ fidelidade',
    },
    benefits: [
      'Acesso básico à plataforma',
      'Até 10 consultas por mês',
      'Suporte padrão via e-mail',
    ],
  },
  {
    name: 'Ouro',
    id_plano_sistema_racca: 1002, // Unique ID for Ouro plan
    price: 'R$ 50/mês',
    amount: 50.0,
    icon: <FaCrown />,
    prices: {
      mensal: 'R$ 50,00/mês s/ fidelidade',
    },
    benefits: [
      'Consultas ilimitadas',
      'Suporte prioritário (e-mail e WhatsApp)',
      'Perfil destacado na plataforma',
      'Acesso a recursos premium',
    ],
  },
];

const TrabalheConosco = () => {
  // States for modal and form
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState('mensal');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Payer information state
  const [payerInfo, setPayerInfo] = useState({
    name: '',
    email: '',
    cpfCnpj: '',
    phone: '',
    birthdate: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  // Modal handlers
  const openModal = (plan) => {
    setSelectedPlan(plan);
    setSelectedPriceOption('mensal'); // Default to mensal as plans only have this option
    setIsModalOpen(true);
    setStep(1);
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setIsModalOpen(false);
    setPayerInfo({
      name: '',
      email: '',
      cpfCnpj: '',
      phone: '',
      birthdate: '',
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
    setStep(1);
    setLoading(false);
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdvance = () => {
    if (!isStep1Valid) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStep2Valid) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    setLoading(true);
    getOrCreateCustomerPla();
  };

  // Validation
  const isStep1Valid =
    payerInfo.name &&
    payerInfo.email &&
    payerInfo.cpfCnpj &&
    payerInfo.phone &&
    payerInfo.birthdate;

  const isStep2Valid =
    payerInfo.cep &&
    payerInfo.rua &&
    payerInfo.numero &&
    payerInfo.bairro &&
    payerInfo.cidade &&
    payerInfo.estado;

  // Address formatting and CEP lookup
  const formatAddress = () => {
    const { cep, rua, numero, complemento, bairro, cidade, estado } = payerInfo;
    if (!cep && !rua && !numero && !bairro && !cidade && !estado) return "";
    return `${rua}, ${numero}${complemento ? ' - ' + complemento : ''}, ${bairro}, ${cidade} - ${estado}, CEP: ${cep}`;
  };

  const fetchAddressFromCEP = async () => {
    const cep = payerInfo.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setPayerInfo((prev) => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }));
      }
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
    }
  };

  // Payment processing
  const getOrCreateCustomerPla = async () => {
    setLoading(true);
    getOrCreateCustomer({
      cpfCnpj: payerInfo?.cpfCnpj,
      onSuccess: (data) => {
        if (data.length > 0) {
          const id = data[0].id;
          payment(id);
        } else {
          create();
        }
      },
      onError: (message) => {
        console.error("onError chamado com:", message);
        setLoading(false);
      },
    });
  };

  const create = () => {
    createCustomer({
      name: payerInfo?.name,
      cpfCnpj: payerInfo?.cpfCnpj,
      email: payerInfo?.email,
      phone: payerInfo?.phone,
      address: formatAddress(),
      birthdate: payerInfo?.birthdate,
      postalCode: payerInfo?.cep,
      addressNumber: payerInfo?.numero,
      complement: payerInfo?.complemento,
      province: payerInfo?.bairro,
      onSuccess: (data) => {
        if (data.length > 0) {
          const id = data[0].id;
          payment(id);
        }
      },
      onError: (message) => {
        console.error("onError chamado com:", message);
        setLoading(false);
      },
    });
  };

  const payment = (id_cliente_assas) => {
    let priceValue = selectedPlan.amount;
    createPayment({
      externalReference: selectedPlan.id_plano_sistema_racca,
      customer: id_cliente_assas,
      billingType: 'UNDEFINED',
      dueDate: new Date().toISOString().split("T")[0],
      value: priceValue,
      description: `Pagamento do plano ${selectedPlan.name} (${selectedPriceOption})`,
      cpfCnpj: payerInfo?.cpfCnpj,
      name: payerInfo?.name,
      email: payerInfo?.email,
      phone: payerInfo?.phone,
      address: formatAddress(),
      onSuccess: (data) => {
        const invoiceUrl = data?.original?.invoiceUrl;
        if (invoiceUrl) {
          window.location.href = invoiceUrl;
        }
      },
      onError: (message) => {
        setLoading(false);
        console.error("onError chamado com:", message);
      },
    });
  };

  return (
    <TrabalheConoscoContainer>
      <ContentWrapper>
        <Title>Junte-se à Racca Saúde como Psicólogo!</Title>
        <Subtitle>
          Faça parte da nossa plataforma e ofereça seus serviços de psicologia online. Escolha o produto ideal para você e comece a atender pacientes de forma prática e segura.
        </Subtitle>

        <PlansSection>
          <PlansContainer>
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan.name}>
                <PlanIcon plan={plan.name}>{plan.icon}</PlanIcon>
                <PlanTitle plan={plan.name}>{plan.name}</PlanTitle>
                <PlanPrice>{plan.price}</PlanPrice>
                <PlanBenefits>
                  {plan.benefits.map((benefit, index) => (
                    <PlanBenefit key={index} plan={plan.name}>{benefit}</PlanBenefit>
                  ))}
                </PlanBenefits>
                <ChooseButton onClick={() => openModal(plan)}>
                  Escolher Plano
                </ChooseButton>
              </PlanCard>
            ))}
          </PlansContainer>
        </PlansSection>

        {isModalOpen && selectedPlan && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeModal} className="modal-close">
                ×
              </button>
              <h3>{`Pagamento do plano ${selectedPlan.name}`}</h3>
              <div className="price-option-selector">
                <p>{selectedPlan.prices.mensal}</p>
              </div>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="step step-1">
                    <h4>Informações do Psicólogo</h4>
                    <div className="form-group">
                      <label>
                        Nome Completo <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Nome Completo"
                        value={payerInfo.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        E-mail <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={payerInfo.email}
                        onChange={handleInputChange}
                        required
                      />
                      <FaEnvelope className="input-icon" />
                    </div>
                    <div className="form-group">
                      <label>
                        CPF <span className="required">*</span>
                      </label>
                      <InputMask
                        mask="999.999.999-99"
                        maskChar=""
                        type="text"
                        name="cpfCnpj"
                        placeholder="CPF"
                        value={payerInfo.cpfCnpj}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        WhatsApp <span className="required">*</span>
                      </label>
                      <InputMask
                        mask="(99) 99999-9999"
                        maskChar=""
                        type="text"
                        name="phone"
                        placeholder="WhatsApp"
                        value={payerInfo.phone}
                        onChange={handleInputChange}
                        required
                      />
                      <FaWhatsapp className="input-icon" />
                    </div>
                    <div className="form-group">
                      <label>
                        Data de Nascimento <span className="required">*</span>
                      </label>
                      <input
                        type="date"
                        name="birthdate"
                        value={payerInfo.birthdate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="button"
                        onClick={handleAdvance}
                        className="plan-button"
                      >
                        Avançar
                      </button>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="step step-2">
                    <h4>Endereço</h4>
                    <div className="form-group">
                      <label>
                        CEP <span className="required">*</span>
                      </label>
                      <InputMask
                        mask="99999-999"
                        maskChar=""
                        type="text"
                        name="cep"
                        placeholder="CEP"
                        value={payerInfo.cep}
                        onChange={handleInputChange}
                        onBlur={fetchAddressFromCEP}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Rua <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="rua"
                        placeholder="Rua"
                        value={payerInfo.rua}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Número da Casa <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="numero"
                        placeholder="Número da Casa"
                        value={payerInfo.numero}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Complemento</label>
                      <input
                        type="text"
                        name="complemento"
                        placeholder="Complemento (opcional)"
                        value={payerInfo.complemento}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Bairro <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="bairro"
                        placeholder="Bairro"
                        value={payerInfo.bairro}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Cidade <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="cidade"
                        placeholder="Cidade"
                        value={payerInfo.cidade}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Estado <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="estado"
                        placeholder="Estado"
                        value={payerInfo.estado}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <button type="button" onClick={() => setStep(1)} className="back-button">
                        <FaArrowLeft title="Voltar" />
                        Voltar
                      </button>
                    </div>
                    <div className="form-group buttons-group">
                      <button type="submit" className="plan-button">
                        {loading ? 'Processando...' : 'Processar Pagamento'}
                      </button>
                    </div>
                  </div>
                )}
                {loading && <p className="loading-message">Por favor, aguarde...</p>}
              </form>
            </div>
          </div>
        )}
      </ContentWrapper>
    </TrabalheConoscoContainer>
  );
};

export default TrabalheConosco;