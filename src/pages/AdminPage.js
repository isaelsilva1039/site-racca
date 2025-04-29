
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  FaSignOutAlt, 
  FaUserCircle, 
  FaStar, 
  FaCrown, 
  FaBolt, 
  FaGem, 
  FaHeart, 
  FaShieldAlt, 
  FaRocket, 
  FaMedal, 
  FaTrophy, 
  FaSun, 
  FaMoon, 
  FaFire, 
  FaFlag, 
  FaBell, 
  FaGlobe, 
  FaGift, 
  FaKey, 
  FaLock, 
  FaPuzzlePiece, 
  FaSnowflake, 
  FaUmbrella,
  FaChevronDown,
} from 'react-icons/fa';

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

const AdminContainer = styled.div`
  padding: 60px 15px;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  color: #333;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 50px 10px;
  }
  @media (max-width: 480px) {
    padding: 40px 5px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #a100ff;
  text-align: center;
  margin-bottom: 30px;
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
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

const FotoPreview = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

const FotoPlaceholder = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(145deg, #e6d6ff, #d6eaff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #a100ff;
  margin-top: 10px;

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 2rem;
  }
`;

const LogoutButton = styled.button`
  position: fixed;
  top: 80px;
  right: 15px;
  padding: 10px;
  background: #a100ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  min-height: 44px;

  &:hover {
    background: #8a00e6;
  }

  @media (max-width: 768px) {
    top: 70px;
    right: 10px;
    padding: 8px;
  }
  @media (max-width: 480px) {
    top: 60px;
    right: 5px;
    padding: 6px;
    font-size: 0.9rem;
  }
`;

const initialPsicologos = [
  {
    id: 1,
    nome: 'Fábio da Silva Ferreira',
    cpf: '123.456.789-00',
    crp: '04/70777',
    preco: 30,
    areas: ['adolescência', 'casais', 'depressão', 'ansiedade', 'identidade'],
    abordagem: 'Terapia Cognitivo Comportamental - TCC',
    publico: 'Adolescentes, Adultos, Casais, Idosos',
    sobreMim: 'Psicólogo clínico especialista em TCC...',
    classificacao: 'Prata',
    foto: null,
  },
  {
    id: 2,
    nome: 'Ana Clara Souza',
    cpf: '987.654.321-00',
    crp: '04/80888',
    preco: 50,
    areas: ['trauma', 'ansiedade', 'depressão', 'luto'],
    abordagem: 'Psicanálise',
    publico: 'Adultos, Idosos',
    sobreMim: 'Psicanalista com 10 anos de experiência...',
    classificacao: 'Ouro',
    foto: null,
  },
  {
    id: 3,
    nome: 'Lucas Mendes Oliveira',
    cpf: '456.789.123-00',
    crp: '04/90999',
    preco: 40,
    areas: ['carreira', 'estresse', 'relacionamentos'],
    abordagem: 'Terapia Sistêmica',
    publico: 'Jovens Adultos, Adultos',
    sobreMim: 'Especialista em coaching e terapia sistêmica...',
    classificacao: 'Prata',
    foto: null,
  },
];

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

const BASE_URL = 'https://racca.store';

const AdminPage = () => {
  const [psicologos, setPsicologos] = useState(initialPsicologos);
  const [plans, setPlans] = useState(initialPlans);
  const [professionalPlans, setProfessionalPlans] = useState([]);
  const [selectedPsicologo, setSelectedPsicologo] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedProfessionalPlan, setSelectedProfessionalPlan] = useState(null);
  const [isAddingPsicologo, setIsAddingPsicologo] = useState(false);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [isAddingProfessionalPlan, setIsAddingProfessionalPlan] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionalPlans = async () => {
      try {
        console.log('Fetching professional plans from:', `${BASE_URL}/api/profissionais/planos/all`);
        const response = await fetch(`${BASE_URL}/api/profissionais/planos/all`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar planos para profissionais: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Professional Plans Response:', data);
        setProfessionalPlans(data);
      } catch (err) {
        console.error('Error fetching professional plans:', err);
        setError(err.message);
      }
    };
    fetchProfessionalPlans();
  }, []);

  useEffect(() => {
    setFotoPreview(selectedPsicologo?.foto || null);
  }, [selectedPsicologo]);

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

  // Psicologos Handlers
  const handleAddPsicologo = () => {
    setSelectedPsicologo({
      id: 0,
      nome: '',
      cpf: '',
      crp: '',
      preco: 0,
      areas: [],
      abordagem: '',
      publico: '',
      sobreMim: '',
      classificacao: 'Prata',
      foto: null,
    });
    setIsAddingPsicologo(true);
  };

  const handleEditPsicologo = (psicologo) => {
    setSelectedPsicologo({ ...psicologo });
    setIsAddingPsicologo(false);
  };

  const handleDeletePsicologo = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este psicólogo?')) {
      setPsicologos(psicologos.filter(p => p.id !== id));
    }
  };

  const handlePsicologoFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const psicologoData = {
      id: selectedPsicologo?.id || 0,
      nome: formData.get('nome'),
      cpf: formData.get('cpf'),
      crp: formData.get('crp'),
      preco: parseFloat(formData.get('preco')) || 0,
      areas: formData.get('areas').split(',').map(a => a.trim()).filter(a => a),
      abordagem: formData.get('abordagem'),
      publico: formData.get('publico'),
      sobreMim: formData.get('sobreMim'),
      classificacao: formData.get('classificacao'),
      foto: fotoPreview,
    };

    if (isAddingPsicologo) {
      const newId = psicologos.length > 0 ? Math.max(...psicologos.map(p => p.id)) + 1 : 1;
      setPsicologos([...psicologos, { ...psicologoData, id: newId }]);
    } else {
      setPsicologos(psicologos.map(p => (p.id === selectedPsicologo.id ? { ...p, ...psicologoData } : p)));
    }
    setSelectedPsicologo(null);
    setIsAddingPsicologo(false);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Plans Handlers
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
    }
  };

  const handlePlanFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const planData = {
      id: parseInt(formData.get('id')) || (plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1),
      icon: formData.get('icon'),
      id_plano_sistema_racca: parseInt(formData.get('id_plano_sistema_racca')) || (plans.length > 0 ? Math.max(...plans.map(p => p.id_plano_sistema_racca)) + 1 : 1),
      title: formData.get('title'),
      amount: parseFloat(formData.get('amount')) || 0,
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
  };

  const handleIconSelect = (iconName) => {
    setSelectedPlan({ ...selectedPlan, icon: iconName });
    setIsDropdownOpen(false);
  };

  // Professional Plans Handlers with API
  const handleAddProfessionalPlan = () => {
    setSelectedProfessionalPlan({
      id: 0,
      title: '',
      price: '',
      benefits: [],
      classificacao: 'Prata',
    });
    setIsAddingProfessionalPlan(true);
  };

  const handleEditProfessionalPlan = async (plan) => {
    try {
      console.log('Fetching plan details from:', `${BASE_URL}/api/profissionais/planos/${plan.id}`);
      const response = await fetch(`${BASE_URL}/api/profissionais/planos/${plan.id}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar plano para profissional: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Plan Details Response:', data);
      setSelectedProfessionalPlan(data);
      setIsAddingProfessionalPlan(false);
    } catch (err) {
      console.error('Error fetching plan details:', err);
      setError(err.message);
    }
  };

  const handleDeleteProfessionalPlan = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este plano para profissionais?')) {
      try {
        console.log('Deleting plan at:', `${BASE_URL}/api/profissionais/planos/delete/${id}`);
        const response = await fetch(`${BASE_URL}/api/profissionais/planos/delete/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Erro ao excluir plano para profissional: ${response.status} ${response.statusText}`);
        }
        console.log('Plan deleted successfully, ID:', id);
        setProfessionalPlans(professionalPlans.filter(p => p.id !== id));
      } catch (err) {
        console.error('Error deleting plan:', err);
        setError(err.message);
      }
    }
  };

  const handleProfessionalPlanFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const planData = {
      title: formData.get('title'),
      price: formData.get('price'),
      benefits: formData.get('benefits').split('\n').map(b => b.trim()).filter(b => b),
      classificacao: formData.get('classificacao'),
    };
    console.log('Submitting Professional Plan Data:', planData);

    try {
      if (isAddingProfessionalPlan) {
        console.log('Creating new plan at:', `${BASE_URL}/api/profissionais/planos/create`);
        const response = await fetch(`${BASE_URL}/api/profissionais/planos/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(planData),
        });
        if (!response.ok) {
          throw new Error(`Erro ao criar plano para profissional: ${response.status} ${response.statusText}`);
        }
        const newPlan = await response.json();
        console.log('New Plan Created:', newPlan);
        setProfessionalPlans([...professionalPlans, newPlan]);
      } else {
        console.log('Updating plan at:', `${BASE_URL}/api/profissionais/planos/update/${selectedProfessionalPlan.id}`);
        const response = await fetch(`${BASE_URL}/api/profissionais/planos/update/${selectedProfessionalPlan.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(planData),
        });
        if (!response.ok) {
          throw new Error(`Erro ao atualizar plano para profissional: ${response.status} ${response.statusText}`);
        }
        const updatedPlan = await response.json();
        console.log('Plan Updated:', updatedPlan);
        setProfessionalPlans(professionalPlans.map(p => (p.id === selectedProfessionalPlan.id ? updatedPlan : p)));
      }
      setSelectedProfessionalPlan(null);
      setIsAddingProfessionalPlan(false);
    } catch (err) {
      console.error('Error submitting professional plan:', err);
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setSelectedPsicologo(null);
    setSelectedPlan(null);
    setSelectedProfessionalPlan(null);
    setIsAddingPsicologo(false);
    setIsAddingPlan(false);
    setIsAddingProfessionalPlan(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const selectedIcon = iconOptions.find(opt => opt.name === selectedPlan?.icon)?.component || <FaStar />;

  return (
    <AdminContainer>
      <Title>Painel de Administração</Title>
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt /> Sair
      </LogoutButton>

      {/* Seção de Configuração de Profissionais */}
      <Section>
        <h2>Configuração de Profissionais</h2>
        {isAddingPsicologo || selectedPsicologo ? (
          <div>
            <h3>{isAddingPsicologo ? 'Adicionar Psicólogo' : 'Editar Psicólogo'}</h3>
            <Form onSubmit={handlePsicologoFormSubmit}>
              <FormGroup>
                <label>Nome</label>
                <Input type="text" name="nome" defaultValue={selectedPsicologo?.nome || ''} required />
              </FormGroup>
              <FormGroup>
                <label>CPF</label>
                <Input type="text" name="cpf" defaultValue={selectedPsicologo?.cpf || ''} required />
              </FormGroup>
              <FormGroup>
                <label>CRP</label>
                <Input type="text" name="crp" defaultValue={selectedPsicologo?.crp || ''} required />
              </FormGroup>
              <FormGroup>
                <label>Preço (R$)</label>
                <Input
                  type="number"
                  name="preco"
                  defaultValue={selectedPsicologo?.preco || 0}
                  min="0"
                  step="0.01"
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Classificação</label>
                <select name="classificacao" defaultValue={selectedPsicologo?.classificacao || 'Prata'} required>
                  <option value="Ouro">Ouro</option>
                  <option value="Prata">Prata</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Áreas de Atendimento (separadas por vírgula)</label>
                <Input
                  type="text"
                  name="areas"
                  defaultValue={selectedPsicologo?.areas?.join(', ') || ''}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Abordagem</label>
                <Input type="text" name="abordagem" defaultValue={selectedPsicologo?.abordagem || ''} required />
              </FormGroup>
              <FormGroup>
                <label>Público</label>
                <Input type="text" name="publico" defaultValue={selectedPsicologo?.publico || ''} required />
              </FormGroup>
              <FormGroup>
                <label>Sobre Mim</label>
                <Textarea name="sobreMim" defaultValue={selectedPsicologo?.sobreMim || ''} required />
              </FormGroup>
              <FormGroup>
                <label>Foto do Perfil</label>
                <Input type="file" accept="image/*" onChange={handleFotoChange} />
                {fotoPreview ? (
                  <FotoPreview src={fotoPreview} alt="Foto do perfil" />
                ) : (
                  <FotoPlaceholder>
                    <FaUserCircle />
                  </FotoPlaceholder>
                )}
              </FormGroup>
              <Button type="submit">Salvar</Button>
              <Button type="button" onClick={handleCancel}>Cancelar</Button>
            </Form>
          </div>
        ) : (
          <div>
            <Button onClick={handleAddPsicologo}>Adicionar Psicólogo</Button>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>CRP</th>
                    <th>Preço (R$)</th>
                    <th>Classificação</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {psicologos.map(p => (
                    <tr key={p.id}>
                      <td>{p.nome}</td>
                      <td>{p.cpf}</td>
                      <td>{p.crp}</td>
                      <td>{p.preco.toFixed(2)}</td>
                      <td>{p.classificacao}</td>
                      <td>
                        <Button onClick={() => handleEditPsicologo(p)}>Editar</Button>
                        <Button onClick={() => handleDeletePsicologo(p.id)}>Excluir</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Section>

      {/* Seção de Configuração de Planos */}
      <Section>
        <h2>Configuração de Planos</h2>
        {isAddingPlan || selectedPlan ? (
          <div>
            <h3>{isAddingPlan ? 'Adicionar Plano' : 'Editar Plano'}</h3>
            <Form onSubmit={handlePlanFormSubmit}>
              <FormGroup>
                <label>ID</label>
                <Input
                  type="number"
                  name="id"
                  defaultValue={selectedPlan?.id || ''}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>ID Plano Sistema RACCA</label>
                <Input
                  type="number"
                  name="id_plano_sistema_racca"
                  defaultValue={selectedPlan?.id_plano_sistema_racca || ''}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Título</label>
                <Input
                  type="text"
                  name="title"
                  defaultValue={selectedPlan?.title || ''}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Valor (R$)</label>
                <Input
                  type="number"
                  name="amount"
                  defaultValue={selectedPlan?.amount || 0}
                  min="0"
                  step="0.01"
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Preço Mensal (ex: R$ 39,90/mês s/ fidelidade)</label>
                <Input
                  type="text"
                  name="pricesMensal"
                  defaultValue={selectedPlan?.prices?.mensal || ''}
                />
              </FormGroup>
              <FormGroup>
                <label>Preço com Fidelidade (ex: R$ 109,90/mês c/ fidelidade 12 meses)</label>
                <Input
                  type="text"
                  name="pricesFidelidade"
                  defaultValue={selectedPlan?.prices?.fidelidade || ''}
                />
              </FormGroup>
              <FormGroup>
                <label>Ícone</label>
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
                <label>Benefícios (um por linha)</label>
                <Textarea
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

      {/* Seção de Configuração de Planos para Profissionais */}
      <Section>
        <h2>Configuração de Planos para Profissionais</h2>
        {isAddingProfessionalPlan || selectedProfessionalPlan ? (
          <div>
            <h3>{isAddingProfessionalPlan ? 'Adicionar Plano para Profissionais' : 'Editar Plano para Profissionais'}</h3>
            <Form onSubmit={handleProfessionalPlanFormSubmit}>
              <FormGroup>
                <label>Título</label>
                <Input
                  type="text"
                  name="title"
                  defaultValue={selectedProfessionalPlan?.title || ''}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Preço (ex: R$ 30,00/mês)</label>
                <Input
                  type="text"
                  name="price"
                  defaultValue={selectedProfessionalPlan?.price || ''}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Classificação</label>
                <select name="classificacao" defaultValue={selectedProfessionalPlan?.classificacao || 'Prata'} required>
                  <option value="Ouro">Ouro</option>
                  <option value="Prata">Prata</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Benefícios (um por linha)</label>
                <Textarea
                  name="benefits"
                  defaultValue={selectedProfessionalPlan?.benefits?.join('\n') || ''}
                  required
                />
              </FormGroup>
              <Button type="submit">Salvar</Button>
              <Button type="button" onClick={handleCancel}>Cancelar</Button>
            </Form>
          </div>
        ) : (
          <div>
            <Button onClick={handleAddProfessionalPlan}>Adicionar Plano para Profissionais</Button>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Preço</th>
                    <th>Classificação</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {professionalPlans.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.price}</td>
                      <td>{p.classificacao}</td>
                      <td>
                        <Button onClick={() => handleEditProfessionalPlan(p)}>Editar</Button>
                        <Button onClick={() => handleDeleteProfessionalPlan(p.id)}>Excluir</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Section>
    </AdminContainer>
  );
};

export default AdminPage;
