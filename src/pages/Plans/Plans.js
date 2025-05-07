import React, { useState } from 'react';
  import './Plans.css';
  import { FaStar, FaGem, FaBolt, FaCrown, FaEnvelope, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
  import InputMask from 'react-input-mask';
  import QRCode from 'react-qr-code';
  import { createCustomer, createPayment, getOrCreateCustomer } from '../../services/server';
  import { ASAAS_ACCESS_TOKEN_DEV, URL_SANBOX_ASSAS } from '../../services/urls';

  function Plans() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPriceOption, setSelectedPriceOption] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [loading, setLoading] = useState(false);
    const [qrCodeData, setQrCodeData] = useState(null);
    const [step, setStep] = useState(1);

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

    const products = [
      {
        id: 471,
        icon: <FaStar />,
        id_plano_sistema_racca: 471,
        title: 'RACCA Essencial',
        amount: 39.9,
        prices: {
          '12 meses': 'R$ 35,90/mês c/ fidelidade 12 meses',
          '9 meses': 'R$ 36,90/mês c/ fidelidade 9 meses',
          '6 meses': 'R$ 37,90/mês c/ fidelidade 6 meses',
          '3 meses': 'R$ 38,90/mês c/ fidelidade 3 meses',
          'Sem': 'R$ 39,90/mês s/ fidelidade',
        },
        benefits: [
          'Consultas ilimitadas com Clínico Geral',
          '1 consulta mensal com especialista (Cardiologista, Dermatologista, etc.)',
          'Descontos em farmácias parceiras',
          'Prescrição de receitas, exames e atestados médicos',
          'Aplicativo RACCA SAÚDE',
          'Ativação em até 48 horas',
          'Agendamento online',
          'Suporte via WhatsApp',
        ],
      },
      {
        id: 472,
        icon: <FaCrown />,
        id_plano_sistema_racca: 472,
        title: 'RACCA Familiar',
        amount: 19.9,
        prices: {
          '12 meses': 'R$ 17,90/mês c/ fidelidade 12 meses',
          '9 meses': 'R$ 18,90/mês c/ fidelidade 9 meses',
          '6 meses': 'R$ 19,40/mês c/ fidelidade 6 meses',
          '3 meses': 'R$ 19,70/mês c/ fidelidade 3 meses',
          'Sem': 'R$ 19,90/mês s/ fidelidade',
        },
        benefits: [
          'Consultas ilimitadas com Clínico Geral',
          'Descontos em farmácias parceiras',
          'Prescrição de receitas, exames e atestados médicos',
          'Aplicativo RACCA SAÚDE',
          'Ativação em até 48 horas',
          'Suporte via WhatsApp',
          'Adicione mais uma pessoa por R$ 9,90',
        ],
      },
      {
        id: 500,
        icon: <FaBolt />,
        id_plano_sistema_racca: 500,
        title: 'RACCA Premium',
        amount: 109.9,
        prices: {
          '12 meses': 'R$ 109,90/mês c/ fidelidade 12 meses',
        },
        benefits: [
          'Consultas ilimitadas com Clínico Geral',
          '1 consulta mensal com especialista (Cardiologista, Dermatologista, etc.)',
          'Descontos em farmácias parceiras',
          'Prescrição de receitas, exames e atestados médicos',
          '5% de desconto para pagamento antecipado',
          'Aplicativo RACCA SAÚDE',
          'Ativação em até 48 horas',
          'Agendamento online',
          'Suporte via WhatsApp',
          'Acesso ao grupo CUIDAR CONECTADO',
        ],
      },
      {
        id: 706,
        icon: <FaGem />,
        id_plano_sistema_racca: 706,
        title: 'RACCA Premium Extra Plus',
        amount: 189.9,
        prices: {
          '12 meses': 'R$ 189,90/mês c/ fidelidade 12 meses',
        },
        benefits: [
          'Consultas ilimitadas com Clínico Geral',
          '1 consulta mensal com especialista (Cardiologista, Dermatologista, etc.)',
          '1 consulta com Psiquiatra (20 minutos)',
          'Descontos em farmácias parceiras',
          'Prescrição de receitas, exames e atestados médicos',
          '5% de desconto para pagamento antecipado',
          'Aplicativo RACCA SAÚDE',
          'Ativação em até 48 horas',
          'Agendamento online',
          'Suporte via WhatsApp',
          'Acesso ao grupo CUIDAR CONECTADO',
          'Seguro: Morte Acidental (R$ 20.000,00)',
          'Invalidez Permanente por Acidente (R$ 20.000,00)',
          'Assistência Funeral Familiar',
          'Auxílio Medicamentos Genéricos (até R$ 100,00/mês)',
          'Clube de Vantagens',
        ],
      },
      {
        id: 707,
        icon: <FaStar />,
        id_plano_sistema_racca: 707,
        title: 'Consulta com Psiquiatra',
        amount: 100.0,
        prices: {
          'Sem': 'R$ 100,00 (avulso) s/ fidelidade',
        },
        benefits: [
          'Consulta avulsa com Psiquiatra (20 minutos)',
          'Prescrição de receitas, exames e atestados médicos',
          'Agendamento online',
          'Suporte via WhatsApp',
        ],
      },
    ];

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
      if (selectedPriceOption === '12 meses') {
        priceValue = selectedPlan.amount * 0.9;
      } else if (selectedPriceOption === '9 meses') {
        priceValue = selectedPlan.amount * 0.925;
      } else if (selectedPriceOption === '6 meses') {
        priceValue = selectedPlan.amount * 0.95;
      } else if (selectedPriceOption === '3 meses') {
        priceValue = selectedPlan.amount * 0.975;
      }
      createPayment({
        externalReference: selectedPlan.id_plano_sistema_racca,
        customer: id_cliente_assas,
        billingType: 'UNDEFINED',
        dueDate: new Date().toISOString().split("T")[0],
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
          console.error("onError chamado com:", message);
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
                {['12 meses', '9 meses', '6 meses', '3 meses', 'Sem'].map((option) =>
                  product.prices[option] && (
                    <label key={option} className="price-option-label">
                      <input
                        type="radio"
                        name={`priceOption-${product.id}`}
                        value={option}
                        checked={selectedPriceOption === option}
                        onChange={() => setSelectedPriceOption(option)}
                        className="price-radio"
                      />
                      <span className="price-text">{product.prices[option]}</span>
                    </label>
                  )
                )}
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