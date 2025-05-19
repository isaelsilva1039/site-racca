import React, { useState, useEffect } from 'react';
import './Plans.css';
import { FaStar, FaGem, FaBolt, FaCrown, FaEnvelope, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import QRCode from 'react-qr-code';
import { createCustomer, createPayment, getOrCreateCustomer } from '../../services/server';
import { ASAAS_ACCESS_TOKEN_DEV, URL_SANBOX_ASSAS } from '../../services/urls';

// Utility function to decode Unicode escape sequences
const decodeUnicode = (str) => {
  if (!str) return '';
  return str.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
};

function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('https://racca.store/api/clientes/planos/all', {
          headers: {
            'Accept': '*/*',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000',
            'Referer': 'http://localhost:3000/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16_6 Mobile/15E148 Safari/604.1',
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar planos');
        }
        const data = await response.json();
        const mappedProducts = Array.isArray(data) ? data.map(plan => {
          const decodedTitle = decodeUnicode(plan.nome_plano);
          const decodedBenefits = Array.isArray(plan.beneficios) ? plan.beneficios.map(benefit => 
            decodeUnicode(benefit).split('\n').filter(line => line.trim() !== '').join(' ')
          ) : [];
          const valorAsFloat = parseFloat(plan.valor) || 0;

          return {
            id: plan.id,
            icon: plan.id % 2 === 0 ? <FaCrown /> : plan.id % 3 === 0 ? <FaBolt /> : plan.id % 5 === 0 ? <FaGem /> : <FaStar />,
            id_plano_sistema_racca: plan.id,
            title: decodedTitle,
            amount: valorAsFloat,
            prices: plan.fidelidade === 0
              ? {
                  Sem: `R$ ${parseFloat(plan.valor).toFixed(2)}/mês s/ fidelidade`,
                  ...Array.isArray(plan.fidelidades_extras) && plan.fidelidades_extras.length > 0
                    ? plan.fidelidades_extras.reduce((acc, extra) => ({
                        ...acc,
                        [extra.periodo]: `R$ ${parseFloat(extra.preco).toFixed(2)}/mês c/ fidelidade ${extra.periodo}`,
                      }), {})
                    : {}
                }
              : Array.isArray(plan.fidelidades_extras) && plan.fidelidades_extras.length > 0
                ? plan.fidelidades_extras.reduce((acc, extra) => ({
                    ...acc,
                    [extra.periodo]: `R$ ${parseFloat(extra.preco).toFixed(2)}/mês c/ fidelidade ${extra.periodo}`,
                  }), {})
                : {},
            benefits: decodedBenefits.length > 0 ? decodedBenefits : ['Nenhum benefício disponível'],
          };
        }) : [];
        setProducts(mappedProducts);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar planos:', error);
        setError('Falha ao carregar os planos. Tente novamente mais tarde.');
        setProducts([]);
      }
    };
    fetchPlans();
  }, []);

  const openModal = (product) => {
    setSelectedPlan(product);
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
    setPaymentMethod('creditCard');
    setQrCodeData(null);
    setStep(1);
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'payer') {
      setPayerInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
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
    setQrCodeData(null);
    getOrCreateCustomerPla();
  };

  const formatAddress = () => {
    const { cep, rua, numero, complemento, bairro, cidade, estado } = payerInfo;
    if (!cep && !rua && !numero && !bairro && !cidade && !estado) return '';
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
      console.error('Erro ao buscar CEP:', err);
    }
  };

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
        console.error('onError chamado com:', message);
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
        console.error('onError chamado com:', message);
        setLoading(false);
      },
    });
  };

  const payment = (id_cliente_assas) => {
    let priceValue = selectedPlan.amount;
    if (selectedPriceOption === '12 meses') {
      priceValue = selectedPlan.amount * 0.9;
    } else if (selectedPriceOption === '9 meses') {
      priceValue = selectedPlan.amount * 0.925;
    } else if (selectedPriceOption === '6 meses') {
      priceValue = selectedPlan.amount * 0.95;
    } else if (selectedPriceOption === '5 meses') {
      priceValue = selectedPlan.amount * 0.96; // Example discount for 5 months
    } else if (selectedPriceOption === '3 meses') {
      priceValue = selectedPlan.amount * 0.975;
    }
    createPayment({
      externalReference: selectedPlan.id_plano_sistema_racca,
      customer: id_cliente_assas,
      billingType: 'UNDEFINED',
      dueDate: new Date().toISOString().split('T')[0],
      value: priceValue,
      description: `Pagamento do produto ${selectedPlan.title} (${selectedPriceOption})`,
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
        console.error('onError chamado com:', message);
      },
    });
  };

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
      <h2 className="plans-title">Nossos Produtos</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="plans-grid">
        {products.map((product) => (
          <div className="plan-card" key={product.id}>
            <div className="plan-icon">{product.icon}</div>
            <h3 className="plan-title">{product.title}</h3>
            <div className="plan-price-container">
              <span className="original-price">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.amount * 1.5)}
              </span>
            </div>
            <p className="plan-price">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.amount)}
              <span className="price-unit">/mês</span>
            </p>
            <ul className="plan-benefits">
              {product.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <div className="price-option-selector">
              {Object.entries(product.prices).map(([option, price]) => (
                <label key={option} className="price-option-label">
                  <input
                    type="radio"
                    name={`priceOption-${product.id}`}
                    value={option}
                    checked={selectedPriceOption === option}
                    onChange={() => setSelectedPriceOption(option)}
                    className="price-radio"
                  />
                  <span className="price-text">{price}</span>
                </label>
              ))}
            </div>
            <button onClick={() => openModal(product)} className="plan-button">
              Assine Agora
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && selectedPlan && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="modal-close">
              ×
            </button>
            <h3>{`Pagamento para o produto ${selectedPlan.title}`}</h3>
            <p>Opção selecionada: {selectedPriceOption ? selectedPlan.prices[selectedPriceOption] : 'Nenhuma'}</p>
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