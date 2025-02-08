import React, { useState } from 'react';
import './Plans.css';
import { FaStar, FaGem, FaBolt, FaCrown, FaEnvelope, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import QRCode from 'react-qr-code';
import { createCustomer, createPayment, getOrCreateCustomer } from '../../services/server';
import { ASAAS_ACCESS_TOKEN_DEV, URL_SANBOX_ASSAS } from '../../services/urls';

function Plans() {
  // Estados gerais
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [step, setStep] = useState(1); // Controle das etapas do checkout

  // Estado dos dados do pagador (etapas 1 e 2)
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

  const BACKEND_URL = 'https://www.asaas.com/api/v3';

  // Array de planos (exemplo)
  const plans = [
    {
      id: 471,
      icon: <FaStar />,
      id_plano_sistema_racca: 471,
      title: 'Plano Confort',
      amount: 89.9,
      amountSemFidelidade: 119.9,
      prices: {
        fidelidade: 'R$ 89,90/mês c/ fidelidade 12 meses',
        semFidelidade: 'R$ 119,90/mês s/ fidelidade',
      },
      benefits: [
        'Desconto em farmácias parceiras',
        'Acompanhamento clínico (Grupo CUIDAR CONECTADO)',
        '5% de desconto p/ pagamento antecipado',
        '2 terapias mensais de 45 minutos cada',
      ],
    },
    {
      id: 3907,
      icon: <FaGem />,
      id_plano_sistema_racca: 3907,
      title: 'Plano RACCA Proteção Plus',
      amount: 15.0,
      prices: {
        fidelidade: 'R$ 15,00/mês c/ fidelidade 12 meses',
      },
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
      id_plano_sistema_racca: 9999,
      title: 'Plano Familiar',
      amount: 19.9,
      prices: {
        mensal: 'R$ 19,90/mês s/ fidelidade',
      },
      benefits: [
        'Clínico Geral',
        'Desconto em farmácias parceiras',
        'Acompanhamento clínico (Grupo CUIDAR CONECTADO)',
        'R$ 9,90 por vida adicionada',
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
      id_plano_sistema_racca: 1084,
      title: 'Plano Confort Extra',
      amount: 159.9,
      amountSemFidelidade: 189.9,
      prices: {
        fidelidade: 'R$ 159,90/mês c/ fidelidade 12 meses',
        semFidelidade: 'R$ 189,90/mês s/ fidelidade',
      },
      benefits: [
        'Desconto em farmácias parceiras',
        'Acompanhamento clínico (Grupo CUIDAR CONECTADO)',
        '5% de desconto p/ pagamento antecipado',
        '4 terapias mensais de 45 minutos cada',
      ],
    },
    {
      id: 500,
      icon: <FaBolt />,
      id_plano_sistema_racca: 500,
      title: 'Plano Premium',
      amount: 109.9,
      amountSemFidelidade: 139.9,
      prices: {
        fidelidade: 'R$ 109,90/mês c/ fidelidade 12 meses',
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
      id_plano_sistema_racca: 706,
      title: 'Plano Premium Extra Plus',
      amount: 189.9,
      prices: {
        fidelidade: 'R$ 189,90/mês c/ fidelidade 12 meses',
      },
      benefits: [
        'Desconto em farmácias parceiras',
        '5% de desconto p/ pagamento antecipado',
        '4 terapias mensais de 45 minutos cada',
        '1 sessão com especialista ao mês',
        'Assistência Funeral Familiar de R$ 7.000,00',
        'MA - Morte Acidental - Capital Segurado R$ 20.000,00',
        'IPA - Invalidez por Acidente - Capital Segurado R$ 20.000,00',
        'Reembolso de Medicamentos Genéricos Gratuitos até R$ 150,00',
        'Especialistas Disponíveis: Cardiologista, Dermatologista, Endocrinologista, Geriatria, Ginecologista, Neurologista, Nutricionista, Ortopedista, Otorrinolaringologista, Pediatria, Traumatologia, Urologista.',
      ],
    },
  ];

  // Função para abrir o modal (definida antes do retorno)
  const openModal = (plan) => {
    setSelectedPlan(plan);
    if (plan.prices.fidelidade && plan.prices.semFidelidade) {
      setSelectedPriceOption('fidelidade');
    } else if (plan.prices.fidelidade) {
      setSelectedPriceOption('fidelidade');
    } else if (plan.prices.semFidelidade) {
      setSelectedPriceOption('semFidelidade');
    } else if (plan.prices.mensal) {
      setSelectedPriceOption('mensal');
    }
    setIsModalOpen(true);
    setStep(1); // Inicia na etapa 1 do checkout
  };

  // Função para fechar o modal e reiniciar os estados
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
    setPaymentMethod('creditCard');
    setQrCodeData(null);
    setStep(1);
  };

  // Manipulação dos inputs
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'payer') {
      setPayerInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Avançar para a etapa 2 com validação dos campos obrigatórios da etapa 1
  const handleAdvance = () => {
    if (!isStep1Valid) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    setStep(2);
  };

  // Tratamento do submit (processar pagamento) com validação dos campos obrigatórios da etapa 2
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStep2Valid) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    setLoading(true);
    setQrCodeData(null);
    getOrCreateCustomerPla();
  };

  // Função para formatar os campos de endereço em uma única string
  const formatAddress = () => {
    const { cep, rua, numero, complemento, bairro, cidade, estado } = payerInfo;
    if (!cep && !rua && !numero && !bairro && !cidade && !estado) return "";
    return `${rua}, ${numero}${complemento ? ' - ' + complemento : ''}, ${bairro}, ${cidade} - ${estado}, CEP: ${cep}`;
  };

  // Consulta o CEP via API ViaCEP e atualiza os campos de endereço
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

  // Funções para criar ou obter cliente e processar o pagamento
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
    if (selectedPriceOption === 'fidelidade') {
      priceValue = selectedPlan.amount;
    } else if (selectedPriceOption === 'semFidelidade') {
      priceValue = selectedPlan.amountSemFidelidade;
    }
    createPayment({
      externalReference: selectedPlan.id_plano_sistema_racca,
      customer: id_cliente_assas,
      billingType: 'UNDEFINED',
      dueDate: new Date().toISOString().split("T")[0],
      value: priceValue,
      description: `Pagamento do plano ${selectedPlan.title} (${selectedPriceOption})`,
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

  // Validações para habilitar os botões
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

  return (
    <section className="plans-container">
      <h2 className="plans-title">Nossos Planos</h2>
      <div className="plans-grid">
        {plans.map((plan) => (
          <div className="plan-card" key={plan.id}>
            <div className="plan-icon">{plan.icon}</div>
            <h3 className="plan-title">{plan.title}</h3>
            <div className="plan-price-container">
              <span className="original-price">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plan.originalAmount || (plan.amount * 1.5))}
              </span>
              <span className="discount-badge">ECONOMIZE 50%</span>
            </div>
            <p className="plan-price">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plan.amount)}
              <span className="price-unit">/mês</span>
            </p>
            <ul className="plan-benefits">
              {plan.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <div className="plan-price-details">
              {plan.prices.fidelidade && (
                <span className="price-detail">{plan.prices.fidelidade}</span>
              )}
              {plan.prices.semFidelidade && (
                <span className="price-detail">{plan.prices.semFidelidade}</span>
              )}
            </div>
            <button onClick={() => openModal(plan)} className="plan-button">
              Assine Agora
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && selectedPlan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="modal-close">
              &times;
            </button>
            <h3>{`Pagamento para o plano ${selectedPlan.title}`}</h3>
            {selectedPlan.prices.fidelidade && selectedPlan.prices.semFidelidade && (
              <div className="price-option-selector">
                <label>
                  <input
                    type="radio"
                    name="priceOption"
                    value="fidelidade"
                    checked={selectedPriceOption === 'fidelidade'}
                    onChange={() => setSelectedPriceOption('fidelidade')}
                  />
                  {selectedPlan.prices.fidelidade}
                </label>
                <label>
                  <input
                    type="radio"
                    name="priceOption"
                    value="semFidelidade"
                    checked={selectedPriceOption === 'semFidelidade'}
                    onChange={() => setSelectedPriceOption('semFidelidade')}
                  />
                  {selectedPlan.prices.semFidelidade}
                </label>
              </div>
            )}
            {selectedPlan.prices.mensal && (
              <div className="price-option-selector">
                <p>{selectedPlan.prices.mensal}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="step step-1">
                  <h4>Informações do Pagador</h4>
                  <div className="form-group">
                    <label>
                      Nome Completo <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nome Completo"
                      value={payerInfo.name}
                      onChange={(e) => handleInputChange(e, 'payer')}
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
                      onChange={(e) => handleInputChange(e, 'payer')}
                      required
                    />
                    <FaEnvelope className="input-icon" />
                  </div>
                  <div className="form-group">
                    <label>
                      CPF ou CNPJ <span className="required">*</span>
                    </label>
                    <InputMask
                      mask={payerInfo.cpfCnpj.replace(/\D/g, '').length > 11 ? '99.999.999/9999-99' : '999.999.999-99'}
                      maskChar=""
                      type="text"
                      name="cpfCnpj"
                      placeholder="CPF ou CNPJ"
                      value={payerInfo.cpfCnpj}
                      onChange={(e) => handleInputChange(e, 'payer')}
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
                      onChange={(e) => handleInputChange(e, 'payer')}
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
                      onChange={(e) => handleInputChange(e, 'payer')}
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
                      onChange={(e) => handleInputChange(e, 'payer')}
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
                      onChange={(e) => handleInputChange(e, 'payer')}
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
                      onChange={(e) => handleInputChange(e, 'payer')}
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
                      onChange={(e) => handleInputChange(e, 'payer')}
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
                      onChange={(e) => handleInputChange(e, 'payer')}
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
                      onChange={(e) => handleInputChange(e, 'payer')}
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
                      onChange={(e) => handleInputChange(e, 'payer')}
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
    </section>
  );
}

export default Plans;
