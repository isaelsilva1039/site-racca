import React, { useState, useEffect } from 'react';
import './Plans.css';
import { FaStar, FaGem, FaBolt, FaCrown, FaEnvelope, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import { createCustomer, createPayment, getOrCreateCustomer } from '../../services/server';

// Função utilitária para decodificar sequências de escape Unicode
const decodeUnicode = (str) => {
  if (!str) return '';
  return str.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
};

// Função para extrair o valor numérico do texto do preço
const getPriceValueFromString = (priceString) => {
  if (!priceString) return 0;
  // Procura por um padrão como "R$ 123,45" ou "R$ 1.234,56"
  const match = priceString.match(/R\$\s*([0-9.,]+)/);
  if (match && match[1]) {
    // Remove pontos de milhar e substitui a vírgula decimal por ponto
    return parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
  }
  return 0;
};

function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Estado para armazenar os preços e opções selecionadas para cada plano
  const [planSelections, setPlanSelections] = useState({});

  const [payerInfo, setPayerInfo] = useState({
    name: '', email: '', cpfCnpj: '', phone: '', birthdate: '',
    cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('https://racca.store/api/clientes/planos/all', {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
        } );
        if (!response.ok) {
          throw new Error('Erro ao buscar planos');
        }
        const data = await response.json();
        const mappedProducts = Array.isArray(data) ? data.map(plan => {
          const decodedTitle = decodeUnicode(plan.nome_plano);
          const decodedBenefits = Array.isArray(plan.beneficios) ? plan.beneficios.map(benefit =>
            decodeUnicode(benefit).split('\n').filter(line => line.trim() !== '').join(' ')
          ) : [];

          // Formata os preços corretamente
          const prices = {};
          if (plan.fidelidade === 0) {
            prices['Sem'] = `R$ ${parseFloat(plan.valor).toFixed(2).replace('.', ',')}/mês s/ fidelidade`;
          }
          if (Array.isArray(plan.fidelidades_extras)) {
            plan.fidelidades_extras.forEach(extra => {
              prices[extra.periodo] = `R$ ${parseFloat(extra.preco).toFixed(2).replace('.', ',')}/mês c/ fidelidade ${extra.periodo}`;
            });
          }

          return {
            id: plan.id,
            icon: plan.id % 2 === 0 ? <FaCrown /> : plan.id % 3 === 0 ? <FaBolt /> : plan.id % 5 === 0 ? <FaGem /> : <FaStar />,
            id_plano_sistema_racca: plan.id,
            title: decodedTitle,
            prices: prices,
            benefits: decodedBenefits.length > 0 ? decodedBenefits : ['Nenhum benefício disponível'],
          };
        }) : [];
        setProducts(mappedProducts);

        // Inicializa o estado de seleções com o primeiro preço de cada plano
        const initialSelections = {};
        mappedProducts.forEach(p => {
          const firstOptionKey = Object.keys(p.prices)[0];
          if (firstOptionKey) {
            initialSelections[p.id] = {
              option: firstOptionKey,
              price: getPriceValueFromString(p.prices[firstOptionKey]),
            };
          }
        });
        setPlanSelections(initialSelections);

        setError(null);
      } catch (error) {
        console.error('Erro ao carregar planos:', error);
        setError('Falha ao carregar os planos. Tente novamente mais tarde.');
        setProducts([]);
      }
    };
    fetchPlans();
  }, []);

  // Lida com a mudança de opção de preço
  const handlePriceOptionChange = (productId, optionKey, priceString) => {
    setPlanSelections(prev => ({
      ...prev,
      [productId]: {
        option: optionKey,
        price: getPriceValueFromString(priceString),
      },
    }));
  };

  const openModal = (product) => {
    setSelectedPlan(product);
    setIsModalOpen(true);
    setStep(1);
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setIsModalOpen(false);
    setPayerInfo({ name: '', email: '', cpfCnpj: '', phone: '', birthdate: '', cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' });
    setStep(1);
  };

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

  const formatAddress = () => {
    const { cep, rua, numero, complemento, bairro, cidade, estado } = payerInfo;
    if (!cep && !rua && !numero && !bairro && !cidade && !estado) return '';
    return `${rua}, ${numero}${complemento ? ' - ' + complemento : ''}, ${bairro}, ${cidade} - ${estado}, CEP: ${cep}`;
  };

  const fetchAddressFromCEP = async () => {
    const cep = payerInfo.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/` );
      const data = await response.json();
      if (!data.erro) {
        setPayerInfo((prev) => ({ ...prev, rua: data.logradouro || '', bairro: data.bairro || '', cidade: data.localidade || '', estado: data.uf || '' }));
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
          payment(data[0].id);
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
        if (data.id) {
          payment(data.id);
        }
      },
      onError: (message) => {
        console.error('onError chamado com:', message);
        setLoading(false);
      },
    });
  };

  const payment = (id_cliente_assas) => {
    const selection = planSelections[selectedPlan.id];
    createPayment({
      externalReference: selectedPlan.id_plano_sistema_racca,
      customer: id_cliente_assas,
      billingType: 'UNDEFINED',
      dueDate: new Date().toISOString().split('T')[0],
      value: selection.price,
      description: `Pagamento do produto ${selectedPlan.title} (${selection.option})`,
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

  const isStep1Valid = payerInfo.name && payerInfo.email && payerInfo.cpfCnpj && payerInfo.phone && payerInfo.birthdate;
  const isStep2Valid = payerInfo.cep && payerInfo.rua && payerInfo.numero && payerInfo.bairro && payerInfo.cidade && payerInfo.estado;

  return (
    <section className="plans-container">
      <h2 className="plans-title">Nossos Produtos</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="plans-grid">
        {products.map((product) => {
          const selection = planSelections[product.id] || { option: '', price: 0 };
          return (
            <div className="plan-card" key={product.id}>
              <div className="plan-details">
                <div className="plan-header">
                  <div className="plan-icon">{product.icon}</div>
                  <h3 className="plan-title">{product.title}</h3>
                </div>
                <ul className="plan-benefits">
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
                <div className="price-option-selector">
                  {Object.entries(product.prices).map(([optionKey, priceString]) => (
                    <label key={optionKey} className="price-option-label">
                      <input
                        type="radio"
                        name={`priceOption-${product.id}`}
                        value={optionKey}
                        checked={selection.option === optionKey}
                        onChange={() => handlePriceOptionChange(product.id, optionKey, priceString)}
                        className="price-radio"
                      />
                      <span className="price-text">{priceString}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="plan-pricing">
                <p className="plan-price">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selection.price)}
                  <span className="price-unit">/mês</span>
                </p>
                <button onClick={() => openModal(product)} className="plan-button">
                  Assine Agora
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && selectedPlan && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="modal-close">×</button>
            <h3>{`Pagamento para o produto ${selectedPlan.title}`}</h3>
            <p>Opção selecionada: {planSelections[selectedPlan.id]?.option}</p>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="step step-1">
                  <h4>Informações do Pagador</h4>
                  <div className="form-group"><label>Nome Completo <span className="required">*</span></label><input type="text" name="name" placeholder="Nome Completo" value={payerInfo.name} onChange={handleInputChange} required /></div>
                  <div className="form-group"><label>E-mail <span className="required">*</span></label><input type="email" name="email" placeholder="E-mail" value={payerInfo.email} onChange={handleInputChange} required /><FaEnvelope className="input-icon" /></div>
                  <div className="form-group"><label>CPF ou CNPJ <span className="required">*</span></label><InputMask mask={payerInfo.cpfCnpj.replace(/\D/g, '').length > 11 ? '99.999.999/9999-99' : '999.999.999-99'} maskChar="" type="text" name="cpfCnpj" placeholder="CPF ou CNPJ" value={payerInfo.cpfCnpj} onChange={handleInputChange} required /></div>
                  <div className="form-group"><label>WhatsApp <span className="required">*</span></label><InputMask mask="(99) 99999-9999" maskChar="" type="text" name="phone" placeholder="WhatsApp" value={payerInfo.phone} onChange={handleInputChange} required /><FaWhatsapp className="input-icon" /></div>
                  <div className="form-group"><label>Data de Nascimento <span className="required">*</span></label><input type="date" name="birthdate" value={payerInfo.birthdate} onChange={handleInputChange} required /></div>
                  <div className="form-group"><button type="button" onClick={handleAdvance} className="plan-button">Avançar</button></div>
                </div>
              )}
              {step === 2 && (
                <div className="step step-2">
                  <h4>Endereço</h4>
                  <div className="form-group"><label>CEP <span className="required">*</span></label><InputMask mask="99999-999" maskChar="" type="text" name="cep" placeholder="CEP" value={payerInfo.cep} onChange={handleInputChange} onBlur={fetchAddressFromCEP} required /></div>
                  <div className="form-group"><label>Rua <span className="required">*</span></label><input type="text" name="rua" placeholder="Rua" value={payerInfo.rua} onChange={handleInputChange} required /></div>
                  <div className="form-group"><label>Número da Casa <span className="required">*</span></label><input type="text" name="numero" placeholder="Número da Casa" value={payerInfo.numero} onChange={handleInputChange} required /></div>
                  <div className="form-group"><label>Complemento</label><input type="text" name="complemento" placeholder="Complemento (opcional)" value={payerInfo.complemento} onChange={handleInputChange} /></div>
                  <div className="form-group"><label>Bairro <span className="required">*</span></label><input type="text" name="bairro" placeholder="Bairro" value={payerInfo.bairro} onChange={handleInputChange} required /></div>
                  <div className="form-group"><label>Cidade <span className="required">*</span></label><input type="text" name="cidade" placeholder="Cidade" value={payerInfo.cidade} onChange={handleInputChange} required /></div>
                  <div className="form-group"><label>Estado <span className="required">*</span></label><input type="text" name="estado" placeholder="Estado" value={payerInfo.estado} onChange={handleInputChange} required /></div>
                  <div><button type="button" onClick={() => setStep(1)} className="back-button"><FaArrowLeft title="Voltar" />Voltar</button></div>
                  <div className="form-group buttons-group"><button type="submit" className="plan-button">{loading ? 'Processando...' : 'Processar Pagamento'}</button></div>
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
