import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaStar, FaCrown, FaBolt, FaGem, FaHeart, FaShieldAlt, FaRocket, FaMedal, FaTrophy, FaSun, FaMoon, FaFire, FaFlag, FaBell, FaGlobe, FaGift, FaKey, FaLock, FaPuzzlePiece, FaSnowflake, FaUmbrella, FaChevronDown } from 'react-icons/fa';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 20px auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 1s ease-out;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 1200px;
    padding: 20px;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 0.9rem;
  }

  th {
    background: #a100ff;
    color: #ffffff;
    font-weight: 600;
  }

  td {
    background: #f9f9f9;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    th, td {
      padding: 8px;
    }
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
    th, td {
      padding: 6px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 12px;
  }
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 1rem;
    color: #333;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    label {
      font-size: 0.95rem;
    }
  }
  @media (max-width: 480px) {
    label {
      font-size: 0.9rem;
    }
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #a100ff;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #8a00e6;
    outline: none;
    box-shadow: 0 0 5px rgba(138, 0, 230, 0.3);
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 7px;
    font-size: 0.9rem;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectedOption = styled.div`
  padding: 10px;
  border: 1px solid #a100ff;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #8a00e6;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 7px;
    font-size: 0.9rem;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #a100ff;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Option = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #f0eaff;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 7px;
    font-size: 0.9rem;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #a100ff;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #8a00e6;
    outline: none;
    box-shadow: 0 0 5px rgba(138, 0, 230, 0.3);
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.95rem;
    min-height: 80px;
  }
  @media (max-width: 480px) {
    padding: 7px;
    font-size: 0.9rem;
    min-height: 70px;
  }
`;

const Button = styled.button`
  padding: 12px;
  background: #a100ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  min-height: 44px;

  &:hover {
    background: #8a00e6;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 15px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #a100ff;
  margin-bottom: 15px;
`;

const initialPlans = [
  {
    id: 471,
    icon: 'FaStar',
    id_plano_sistema_racca: 471,
    title: 'RACCA Essencial',
    amount: 39.9,
    prices: {
      mensal: 'R$ 39,90/mês s/ fidelidade',
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
    icon: 'FaCrown',
    id_plano_sistema_racca: 472,
    title: 'RACCA Familiar',
    amount: 19.9,
    prices: {
      mensal: 'R$ 19,90/mês s/ fidelidade',
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
    icon: 'FaBolt',
    id_plano_sistema_racca: 500,
    title: 'RACCA Premium',
    amount: 109.9,
    prices: {
      fidelidade: 'R$ 109,90/mês c/ fidelidade 12 meses',
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
    icon: 'FaGem',
    id_plano_sistema_racca: 706,
    title: 'RACCA Premium Extra Plus',
    amount: 189.9,
    prices: {
      fidelidade: 'R$ 189,90/mês c/ fidelidade 12 meses',
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
    icon: 'FaStar',
    id_plano_sistema_racca: 707,
    title: 'Consulta com Psiquiatra',
    amount: 100.0,
    prices: {
      mensal: 'R$ 100,00 (avulso) s/ fidelidade',
    },
    benefits: [
      'Consulta avulsa com Psiquiatra (20 minutos)',
      'Prescrição de receitas, exames e atestados médicos',
      'Agendamento online',
      'Suporte via WhatsApp',
    ],
  },
];

const iconOptions = [
  { name: 'FaStar', component: <FaStar /> },
  { name: 'FaCrown', component: <FaCrown /> },
  { name: 'FaBolt', component: <FaBolt /> },
  { name: 'FaGem', component: <FaGem /> },
  { name: 'FaHeart', component: <FaHeart /> },
  { name: 'FaShieldAlt', component: <FaShieldAlt /> },
  { name: 'FaRocket', component: <FaRocket /> },
  { name: 'FaMedal', component: <FaMedal /> },
  { name: 'FaTrophy', component: <FaTrophy /> },
  { name: 'FaSun', component: <FaSun /> },
  { name: 'FaMoon', component: <FaMoon /> },
  { name: 'FaFire', component: <FaFire /> },
  { name: 'FaFlag', component: <FaFlag /> },
  { name: 'FaBell', component: <FaBell /> },
  { name: 'FaGlobe', component: <FaGlobe /> },
  { name: 'FaGift', component: <FaGift /> },
  { name: 'FaKey', component: <FaKey /> },
  { name: 'FaLock', component: <FaLock /> },
  { name: 'FaPuzzlePiece', component: <FaPuzzlePiece /> },
  { name: 'FaSnowflake', component: <FaSnowflake /> },
  { name: 'FaUmbrella', component: <FaUmbrella /> },
];

const PlanosConfig = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  const handleAddPlan = () => {
    setSelectedPlan({
      id: 0,
      icon: 'FaStar',
      id_plano_sistema_racca: 0,
      title: '',
      amount: 0,
      prices: {
        mensal: '',
        fidelidade: '',
      },
      benefits: [],
    });
    setIsAddingPlan(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan({ ...plan });
    setIsAddingPlan(false);
  };

  const handleDeletePlan = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      setPlans(plans.filter(p => p.id !== id));
      setError(null);
    }
  };

  const handlePlanFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = parseInt(formData.get('id'));
    const id_plano_sistema_racca = parseInt(formData.get('id_plano_sistema_racca'));
    const amount = parseFloat(formData.get('amount'));

    if (isNaN(id) || id <= 0) {
      setError('ID deve ser um número maior que 0');
      return;
    }
    if (isNaN(id_plano_sistema_racca) || id_plano_sistema_racca <= 0) {
      setError('ID do plano RACCA deve ser um número maior que 0');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setError('Valor deve ser um número maior que 0');
      return;
    }

    const planData = {
      id,
      icon: formData.get('icon'),
      id_plano_sistema_racca,
      title: formData.get('title'),
      amount,
      prices: {
        mensal: formData.get('pricesMensal') || '',
        fidelidade: formData.get('pricesFidelidade') || '',
      },
      benefits: formData.get('benefits').split('\n').map(b => b.trim()).filter(b => b),
    };

    if (isAddingPlan) {
      setPlans([...plans, planData]);
    } else {
      setPlans(plans.map(p => (p.id === selectedPlan.id ? planData : p)));
    }
    setSelectedPlan(null);
    setIsAddingPlan(false);
    setError(null);
  };

  const handleIconSelect = (iconName) => {
    setSelectedPlan({ ...selectedPlan, icon: iconName });
    setIsDropdownOpen(false);
  };

  const handleCancel = () => {
    setSelectedPlan(null);
    setIsAddingPlan(false);
    setError(null);
  };

  const selectedIcon = iconOptions.find(opt => opt.name === selectedPlan?.icon)?.component || <FaStar />;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Section>
      <h2>Configuração de Planos</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isAddingPlan || selectedPlan ? (
        <div>
          <h3>{isAddingPlan ? 'Adicionar Plano' : 'Editar Plano'}</h3>
          <Form onSubmit={handlePlanFormSubmit}>
            <FormGroup>
              <label htmlFor="id">ID</label>
              <Input
                type="number"
                id="id"
                name="id"
                defaultValue={selectedPlan?.id || ''}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="id_plano_sistema_racca">ID Plano Sistema RACCA</label>
              <Input
                type="number"
                id="id_plano_sistema_racca"
                name="id_plano_sistema_racca"
                defaultValue={selectedPlan?.id_plano_sistema_racca || ''}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="title">Título</label>
              <Input
                type="text"
                id="title"
                name="title"
                defaultValue={selectedPlan?.title || ''}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="amount">Valor (R$)</label>
              <Input
                type="number"
                id="amount"
                name="amount"
                defaultValue={selectedPlan?.amount || 0}
                min="0"
                step="0.01"
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="pricesMensal">Preço Mensal (ex: R$ 39,90/mês s/ fidelidade)</label>
              <Input
                type="text"
                id="pricesMensal"
                name="pricesMensal"
                defaultValue={selectedPlan?.prices?.mensal || ''}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="pricesFidelidade">Preço com Fidelidade (ex: R$ 109,90/mês c/ fidelidade 12 meses)</label>
              <Input
                type="text"
                id="pricesFidelidade"
                name="pricesFidelidade"
                defaultValue={selectedPlan?.prices?.fidelidade || ''}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="icon">Ícone</label>
              <SelectContainer ref={dropdownRef}>
                <SelectedOption onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {selectedIcon} {selectedPlan?.icon || 'Selecione um ícone'}
                  </span>
                  <FaChevronDown />
                </SelectedOption>
                {isDropdownOpen && (
                  <Dropdown>
                    {iconOptions.map((option) => (
                      <Option
                        key={option.name}
                        onClick={() => handleIconSelect(option.name)}
                      >
                        {option.component} {option.name}
                      </Option>
                    ))}
                  </Dropdown>
                )}
              </SelectContainer>
              <input type="hidden" name="icon" value={selectedPlan?.icon || 'FaStar'} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="benefits">Benefícios (um por linha)</label>
              <Textarea
                id="benefits"
                name="benefits"
                defaultValue={selectedPlan?.benefits?.join('\n') || ''}
                required
              />
            </FormGroup>
            <Button type="submit">Salvar</Button>
            <Button type="button" onClick={handleCancel}>Cancelar</Button>
          </Form>
        </div>
      ) : (
        <div>
          <Button onClick={handleAddPlan}>Adicionar Plano</Button>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Valor (R$)</th>
                  <th>Preço Mensal</th>
                  <th>Preço Fidelidade</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {plans.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.amount.toFixed(2)}</td>
                    <td>{p.prices.mensal || '-'}</td>
                    <td>{p.prices.fidelidade || '-'}</td>
                    <td>
                      <Button onClick={() => handleEditPlan(p)}>Editar</Button>
                      <Button onClick={() => handleDeletePlan(p.id)}>Excluir</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Section>
  );
};

export default PlanosConfig;