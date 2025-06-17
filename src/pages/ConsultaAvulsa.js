import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaChevronLeft, FaChevronRight, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import { createCustomer, createPayment, getOrCreateCustomer } from '../services/server';
import './Plans/Plans.css';

const ConsultaContainer = styled.section`
  text-align: center;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  color: #333;
  padding: 50px 20px;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }

  @media (max-width: 480px) {
    padding: 20px 8px;
  }
`;

const Title = styled.h2`
  font-size: 5.5rem;
  margin-bottom: 40px;
  color: #a100ff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const FiltroContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  gap: 10px;

  label {
    font-size: 1.2rem;
    color: #333;
  }

  select {
    padding: 10px;
    font-size: 1.2rem;
    border-radius: 10px;
    border: 1px solid #a100ff;
    color: #333;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;

    label {
      font-size: 1rem;
    }

    select {
      font-size: 1rem;
      padding: 8px;
      max-width: 200px;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;

    label {
      font-size: 0.9rem;
    }

    select {
      font-size: 0.9rem;
      padding: 6px;
    }
  }
`;

const GridContainer = styled.div`
  position: relative;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const PsicologoGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding: 0 10px;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #a100ff #e6d6ff;

  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #e6d6ff;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #a100ff;
    border-radius: 6px;
    border: 2px solid #e6d6ff;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #8a00e6;
  }

  @media (max-width: 768px) {
    gap: 20px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  @media (max-width: 480px) {
    gap: 15px;
    padding: 0 5px;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(161, 0, 255, 0.8);
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background 0.3s ease;
  z-index: 10;

  &:hover {
    background: #8a00e6;
  }

  &:first-child {
    left: 0;
  }

  &:last-child {
    right: 0;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;

    &:first-child {
      left: 5px;
    }

    &:last-child {
      right: 5px;
    }
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 1rem;

    &:first-child {
      left: 5px;
    }

    &:last-child {
      right: 5px;
    }
  }
`;

const PsicologoCard = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  color: #333;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
  min-width: 400px;
  max-width: 400px;
  min-height: 600px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(145deg, #ffffff, #f0f0f5);
  border: 2px solid ${({ classificacao }) => (classificacao === 'Ouro' ? '#FFD700' : '#C0C0C0')};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: 300px;
    max-width: 320px;
    min-height: 550px;
    padding: 15px;
    scroll-snap-align: start;
  }

  @media (max-width: 480px) {
    min-width: 260px;
    min-height: 500px;
  }
`;

const PsicologoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 10px;
  }
`;

const PsicologoFoto = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(145deg, #e6d6ff, #d6eaff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #a100ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 2rem;
  }
`;

const PsicologoInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 1.3rem;
    margin: 0;
    color: #333;
    font-weight: bold;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin: 2px 0;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 0.75rem;
    }
  }
`;

const PriceHighlight = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #a100ff;
  background: #e6d6ff;
  padding: 5px 10px;
  border-radius: 8px;
  margin: 5px 0;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;

  @media (max-width: 480px) {
    gap: 6px;
    margin: 8px 0;
  }
`;

const Tag = styled.span`
  background: #e6d6ff;
  color: #a100ff;
  padding: 0px 2px;
  border-radius: 15px;
  font-size: 0.7rem;
  text-transform: capitalize;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
`;

const Abordagem = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin: 10px 0;
  font-weight: bold;

  span {
    font-weight: normal;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: 8px 0;
  }
`;

const Publico = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 10px 0;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: 8px 0;
  }
`;

const SobreMim = styled.div`
  margin: 10px 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  position: relative;

  strong {
    color: #333;
    display: block;
    margin-bottom: 5px;
  }

  .texto {
    display: ${({ expandido }) => (expandido ? 'block' : '-webkit-box')};
    -webkit-line-clamp: ${({ expandido }) => (expandido ? 'unset' : 5)};
    -webkit-box-orient: vertical;
    overflow: ${({ expandido }) => (expandido ? 'visible' : 'hidden')};
    text-overflow: ${({ expandido }) => (expandido ? 'clip' : 'ellipsis')};
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.4;

    .texto {
      -webkit-line-clamp: ${({ expandido }) => (expandido ? 'unset' : 5)};
    }
  }
`;

const VerMaisButton = styled.button`
  background: none;
  border: none;
  color: #a100ff;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 5px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.3s ease;

  &:hover {
    color: #8a00e6;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ConsultarButton = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 10px;
  background: #a100ff;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    background: #8a00e6;
    transform: translateX(-50%) scale(1.05);
  }

  @media (max-width: 768px) {
    max-width: 180px;
    font-size: 1rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    max-width: 160px;
    font-size: 0.9rem;
    padding: 7px;
  }
`;

const ConsultaAvulsa = () => {
  const [filtroArea, setFiltroArea] = useState('todos');
  const [psicologos, setPsicologos] = useState([]);
  const [selectedPsicologo, setSelectedPsicologo] = useState(null);
  const [expandedSobreMim, setExpandedSobreMim] = useState({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gridRef = useRef(null);

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

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || isPaused) return;

    const isMobile = window.innerWidth <= 768;
    const scrollSpeed = isMobile ? 0.3 : 6; // 0.3 pixels no mobile, 2 pixels no desktop
    const scrollIntervalTime = isMobile ? 1000 : 1; // 60ms no mobile, 30ms no desktop

    const scrollInterval = setInterval(() => {
      if (grid) {
        const maxScrollLeft = grid.scrollWidth - grid.clientWidth;
        const currentScrollLeft = grid.scrollLeft;

        if (currentScrollLeft >= maxScrollLeft - 1) {
          grid.scrollTo({ left: 0, behavior: 'auto' });
        } else {
          grid.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
        }
      }
    }, scrollIntervalTime);

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  useEffect(() => {
    const fetchPsicologos = async () => {
      try {
        const response = await fetch('https://racca.store/api/profissionais/all');
        const data = await response.json();
        const validPsicologos = data.filter(
          (psicologo) =>
            psicologo.nome &&
            psicologo.crp &&
            psicologo.preco &&
            psicologo.classificacao &&
            psicologo.areasAtendimento &&
            psicologo.abordagem &&
            psicologo.publico &&
            psicologo.sobreMim
        );
        setPsicologos(validPsicologos);
      } catch (error) {
        console.error('Erro ao buscar psicólogos:', error);
      }
    };
    fetchPsicologos();
  }, []);

  const todasAreas = [
    'todos',
    ...new Set(
      psicologos.flatMap((psicologo) => psicologo.areasAtendimento || [])
    ),
  ];

  const psicologosFiltrados = filtroArea === 'todos'
    ? psicologos
    : psicologos.filter((psicologo) =>
        psicologo.areasAtendimento.includes(filtroArea)
      );

  const handleConsultarClick = (psicologo) => {
    setSelectedPsicologo(psicologo);
    setIsPaymentModalOpen(true);
    setStep(1);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
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
    setSelectedPsicologo(null);
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
    createPayment({
      externalReference: selectedPsicologo.id,
      customer: id_cliente_assas,
      billingType: 'UNDEFINED',
      dueDate: new Date().toISOString().split('T')[0],
      value: selectedPsicologo.preco,
      description: `Consulta avulsa com o psicólogo ${selectedPsicologo.nome}`,
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
        const mensagem = `Olá, gostaria de agendar uma consulta com o psicólogo ${selectedPsicologo.nome} (CRP: ${selectedPsicologo.crp}).`;
        const url = `https://wa.me/5537999137500?text=${encodeURIComponent(mensagem)}`;
        setTimeout(() => {
          window.open(url, '_blank');
          closePaymentModal();
        }, 1000);
      },
      onError: (message) => {
        setLoading(false);
        console.error('onError chamado com:', message);
      },
    });
  };

  const toggleExpandSobreMim = (id) => {
    setExpandedSobreMim((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollLeft = () => {
    if (gridRef.current) {
      const scrollAmount = window.innerWidth <= 480 ? -280 : window.innerWidth <= 768 ? -320 : -400;
      gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      const scrollAmount = window.innerWidth <= 480 ? 280 : window.innerWidth <= 768 ? 320 : 400;
      gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  return (
    <ConsultaContainer>
      <Title>Consulta Avulsa</Title>
      <FiltroContainer>
        <label>Filtrar por área:</label>
        <select
          value={filtroArea}
          onChange={(e) => setFiltroArea(e.target.value)}
        >
          {todasAreas.map((area) => (
            <option key={area} value={area}>
              {area.charAt(0).toUpperCase() + area.slice(1)}
            </option>
          ))}
        </select>
      </FiltroContainer>
      <GridContainer>
        <NavButton onClick={scrollLeft}>
          <FaChevronLeft />
        </NavButton>
        <PsicologoGrid
          ref={gridRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {psicologosFiltrados.map((psicologo, index) => {
            const text = psicologo.sobreMim.trim();
            const words = text.split(/\s+/).length;
            const estimatedLines = Math.ceil(words / 10);

            return (
              <PsicologoCard
                key={psicologo.id}
                classificacao={psicologo.classificacao}
              >
                <PsicologoHeader>
                  <PsicologoFoto>
                    {psicologo.fotoUrl ? (
                      <img
                        src={psicologo.fotoUrl}
                        alt={psicologo.nome}
                        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                        onError={(e) => (e.target.outerHTML = '<FaUserCircle />')}
                      />
                    ) : (
                      <FaUserCircle />
                    )}
                  </PsicologoFoto>
                  <PsicologoInfo>
                    <h3>{psicologo.nome}</h3>
                    <p>Psicólogo</p>
                    <p>CRP: {psicologo.crp}</p>
                    <PriceHighlight>Valor da consulta: R${psicologo.preco}</PriceHighlight>
                  </PsicologoInfo>
                </PsicologoHeader>
                <TagsContainer>
                  {psicologo.areasAtendimento.map((area) => (
                    <Tag key={area}>{area}</Tag>
                  ))}
                </TagsContainer>
                <Abordagem>
                  Abordagem: <span>{psicologo.abordagem}</span>
                </Abordagem>
                <Publico>👥 {psicologo.publico.join(', ')}</Publico>
                <SobreMim expandido={expandedSobreMim[psicologo.id] || false}>
                  <strong>Sobre mim:</strong>
                  <div className="texto">{psicologo.sobreMim}</div>
                  {estimatedLines > 5 && (
                    <VerMaisButton onClick={() => toggleExpandSobreMim(psicologo.id)}>
                      {expandedSobreMim[psicologo.id] ? 'Ver menos' : 'Ver mais'}
                    </VerMaisButton>
                  )}
                </SobreMim>
                <ConsultarButton onClick={() => handleConsultarClick(psicologo)}>
                  Quero me consultar
                </ConsultarButton>
              </PsicologoCard>
            );
          })}
        </PsicologoGrid>
        <NavButton onClick={scrollRight}>
          <FaChevronRight />
        </NavButton>
      </GridContainer>

      {isPaymentModalOpen && selectedPsicologo && (
        <div className="modal-overlay" onClick={closePaymentModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closePaymentModal} className="modal-close">
              ×
            </button>
            <h3>{`Pagamento para consulta com ${selectedPsicologo.nome}`}</h3>
            <div className="price-option-selector">
              <p>{`R$ ${selectedPsicologo.preco},00 (avulso)`}</p>
            </div>
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
                  <div className="form-group button-container">
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
                      <FaChevronLeft title="Voltar" />
                      Voltar
                    </button>
                  </div>
                  <div className="form-group button-container">
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
    </ConsultaContainer>
  );
};

export default ConsultaAvulsa;