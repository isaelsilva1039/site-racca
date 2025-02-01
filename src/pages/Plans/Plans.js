import React, { useState } from 'react';
import './Plans.css';
import { FaHeart, FaStar, FaGem, FaBolt, FaCrown, FaEnvelope, FaPhone } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import QRCode from 'react-qr-code'; // Biblioteca para gerar QR Codes
import { createCustomer, createPayment, getOrCreateCustomer } from '../../services/server';
import { ASAAS_ACCESS_TOKEN_DEV, URL_SANBOX_ASSAS } from '../../services/urls';

function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customer, setCustomer] = useState([]);

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
  const [qrCodeData, setQrCodeData] = useState(null); // Estado para armazenar a linha digitável

  const BACKEND_URL = 'https://www.asaas.com/api/v3';
  const plans = [
   
    {
      id: 471,
      icon: <FaStar />,
      id_plano_sistema_racca: 471,
      title: 'Plano Confort',
      amount: 89.9,
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
      id_plano_sistema_racca: 9999,
      title: 'Plano Familiar',
      amount: 19.9,
      prices: { mensal: 'R$ 19,90/mês s/ fidelidade' },
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

  // const plans = [
  //   {
  //     id: 1,
  //     icon: <FaHeart />,
  //     title: 'Plano Básico',
  //     amount: 79.9,
  //     id_plano_sistema_racca: 100,
  //     prices: { mensal: 'R$ 79,90/mês' },
  //     benefits: [
  //       'Consultas online ilimitadas',
  //       'Descontos em farmácias',
  //       'Acesso ao histórico médico',
  //     ],
  //   },
  //   {
  //     id: 471,
  //     icon: <FaStar />,
  //     id_plano_sistema_racca: 101,
  //     title: 'Plano Confort',
  //     amount: 89.9,
  //     prices: {
  //       fidelidade: 'R$ 89,90/mês c/ fidelidade 12 meses',
  //       semFidelidade: 'R$ 129,90/mês s/ fidelidade',
  //     },
  //     benefits: [
  //       'Desconto em farmácias parceiras',
  //       '5% de desconto p/ pagamento antecipado',
  //       '2 terapias mensais de 45 minutos cada',
  //     ],
  //   },
  //   {
  //     id: 3907,
  //     icon: <FaGem />,
  //     id_plano_sistema_racca: 102,
  //     title: 'Plano RACCA Proteção Plus',
  //     amount: 15.0,
  //     prices: { fidelidade: 'R$ 15,00/mês c/ fidelidade 12 meses' },
  //     benefits: [
  //       'Assistência Funeral Familiar de R$ 7.000,00',
  //       'MA - Morte Acidental - Capital Segurado R$ 20.000,00',
  //       'IPA - Invalidez por Acidente - Capital Segurado R$ 20.000,00',
  //       'Reembolso de Medicamentos Genéricos Gratuitos até R$ 150,00',
  //     ],
  //   },
  //   {
  //     id: 'ID_DINAMICO',
  //     icon: <FaCrown />,
  //     id_plano_sistema_racca: 102,
  //     title: 'Plano Personalize',
  //     amount: 39.9,
  //     prices: { mensal: 'R$ 39,90/mês s/ fidelidade' },
  //     benefits: [
  //       'Desconto em farmácias parceiras',
  //       '5% de desconto p/ pagamento antecipado',
  //       'Valor da consulta por especialidade:',
  //       'Psicólogo e Nutricionista: R$ 50,00',
  //       'Psiquiatra: R$ 100,00',
  //       'Médicos Especialistas: R$ 60,00',
  //     ],
  //   },
  //   {
  //     id: 1084,
  //     icon: <FaGem />,
  //     id_plano_sistema_racca: 104,
  //     title: 'Plano Confort Extra',
  //     amount: 109.9,
  //     prices: {
  //       fidelidade: 'R$ 109,90/mês c/ fidelidade 12 meses',
  //       semFidelidade: 'R$ 149,90/mês s/ fidelidade',
  //     },
  //     benefits: [
  //       'Desconto em farmácias parceiras',
  //       '5% de desconto p/ pagamento antecipado',
  //       '4 terapias mensais de 45 minutos cada',
  //     ],
  //   },
  //   {
  //     id: 500,
  //     icon: <FaBolt />,
  //     id_plano_sistema_racca: 105,
  //     title: 'Plano Premium',
  //     amount: 99.9,
  //     prices: {
  //       fidelidade: 'R$ 99,90/mês c/ fidelidade 12 meses',
  //       semFidelidade: 'R$ 139,90/mês s/ fidelidade',
  //     },
  //     benefits: [
  //       'Desconto em farmácias parceiras',
  //       '5% de desconto p/ pagamento antecipado',
  //       '2 terapias mensais de 45 minutos cada',
  //       '1 sessão com especialista ao mês',
  //       'Especialistas Disponíveis: Cardiologista, Dermatologista, Endocrinologista, Geriatria, Ginecologista, Neurologista, Nutricionista, Ortopedista, Otorrinolaringologista, Pediatria, Traumatologia, Urologista.',
  //     ],
  //   },
  //   {
  //     id: 706,
  //     icon: <FaCrown />,
  //     id_plano_sistema_racca: 106,
  //     title: 'Plano Premium Extra',
  //     amount: 119.9,
  //     prices: {
  //       fidelidade: 'R$ 119,90/mês c/ fidelidade 12 meses',
  //       semFidelidade: 'R$ 159,90/mês s/ fidelidade',
  //     },
  //     benefits: [
  //       'Desconto em farmácias parceiras',
  //       '5% de desconto p/ pagamento antecipado',
  //       '4 terapias mensais de 45 minutos cada',
  //       '1 sessão com especialista ao mês',
  //       'Especialistas Disponíveis: Cardiologista, Dermatologista, Endocrinologista, Geriatria, Ginecologista, Neurologista, Nutricionista, Ortopedista, Otorrinolaringologista, Pediatria, Traumatologia, Urologista.',
  //     ],
  //   },
  // ];

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





  const getOrCreateCustomerPla = async () => {

    setLoading(true)
  
      getOrCreateCustomer({
        cpfCnpj: payerInfo?.cpfCnpj,
        onSuccess: (data) => {

          if(data.length > 0){
            const id = data[0].id
            payment(id)
          }else{
            create()
          }



        },
        onError: (message) => {
          console.error("onError chamado com:", message);
          setLoading(false)
        },
      });
    
  };


  const create = () => {

    createCustomer({
        name: payerInfo?.name,
        cpfCnpj: payerInfo?.cpfCnpj,
        email: payerInfo?.email,
        phone: payerInfo?.phone,
        address: payerInfo?.address,
        address: payerInfo?.address,

        onSuccess: (data) => {

          if(data.length > 0){
            const id = data[0].id

            payment(id)
  

          }

        },
        onError: (message) => {
          console.error("onError chamado com:", message);
          setLoading(false)
        },
      });
  }
  


  const payment = (id_cliente_assas) => {
    

    createPayment({
      externalReference: selectedPlan.id_plano_sistema_racca,
      customer: id_cliente_assas,
      billingType: 'UNDEFINED',
      dueDate:new Date().toISOString().split("T")[0],
      value: selectedPlan.amount,
      description: `Pagamento do plano ${selectedPlan.title}`,
      cpfCnpj: payerInfo?.cpfCnpj,

      name: payerInfo?.name,
      email: payerInfo?.email,
      phone: payerInfo?.phone,
      address: payerInfo?.address,

      onSuccess: (data) => {

        const invoiceUrl = data?.original?.invoiceUrl;
      
        if (invoiceUrl) {
      
          window.location.href = invoiceUrl;
        }

      },
      onError: (message) => {
        setLoading(false)
        console.error("onError chamado com:", message);
        
      },
    });
  }


  // Função para recuperar a linha digitável do boleto
  const getIdentificationField = async (paymentId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/payments/${paymentId}/identificationField`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data.identificationField;
      } else {
        throw new Error(data.message || 'Erro ao recuperar a linha digitável');
      }
    } catch (error) {
      console.error('Erro ao recuperar a linha digitável:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setQrCodeData(null);
    getOrCreateCustomerPla();
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
    setQrCodeData(null);
  };

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
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plan.originalAmount || (plan.amount * 1.5))} {/* Exemplo de cálculo do preço original */}
        </span>
        <span className="discount-badge">ECONOMIZE 50%</span>
      </div>
      <p className="plan-price">
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plan.amount)} <span className="price-unit">/mês</span>
      </p>

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


      {isModalOpen && selectedPlan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="modal-close">
              &times;
            </button>
            <h3>{`Pagamento para o plano ${selectedPlan.title}`}</h3>
            <form onSubmit={handleSubmit}>
              <h4>Informações do Pagador</h4>
              <div className="form-group">
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
                <InputMask
                  mask={
                    payerInfo.cpfCnpj.replace(/\D/g, '').length > 11
                      ? '99.999.999/9999-99'
                      : '999.999.999-99'
                  }
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
                <InputMask
                  mask="(99) 99999-9999"
                  maskChar=""
                  type="text"
                  name="phone"
                  placeholder="Telefone"
                  value={payerInfo.phone}
                  onChange={(e) => handleInputChange(e, 'payer')}
                  required
                />
                <FaPhone className="input-icon" />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Endereço"
                  value={payerInfo.address}
                  onChange={(e) => handleInputChange(e, 'payer')}
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="submit-button">
                {loading ? 'Processando...' : 'Processar Pagamento'}
              </button>
              {loading && <p className="loading-message">Por favor, aguarde...</p>}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Plans;
