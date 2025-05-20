import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';

// Estilos (mantidos os mesmos do código original)
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

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(161, 0, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(161, 0, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(161, 0, 255, 0);
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
    max-width: 1600px;
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

  tr {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  tr:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(161, 0, 255, 0.2);
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

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const ImagePlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(145deg, #e6d6ff, #d6eaff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #a100ff;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  background: #a100ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    background: #8a00e6;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    animation: none;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.9rem;
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
  background: ${({ selected }) => (selected ? '#f0eaff' : '#fff')};

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

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #a100ff;

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
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
  animation: ${pulse} 2s infinite;

  &:hover {
    background: #8a00e6;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    animation: none;
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

const BASE_URL = 'https://racca.store';

// Helper function to safely parse JSON strings
const safeParseJSON = (jsonString) => {
  if (!jsonString || typeof jsonString !== 'string') return [];
  try {
    const cleanedString = jsonString
      .replace(/^"|"$/g, '')
      .replace(/\\"/g, '"');
    return JSON.parse(cleanedString);
  } catch (err) {
    console.error('Failed to parse JSON:', jsonString, err);
    return [];
  }
};

const ProfissionaisConfig = () => {
  const [profissionais, setProfissionais] = useState([]);
  const [selectedProfissional, setSelectedProfissional] = useState(null);
  const [isAddingProfissional, setIsAddingProfissional] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAreasDropdownOpen, setIsAreasDropdownOpen] = useState(false);
  const [isAbordagemDropdownOpen, setIsAbordagemDropdownOpen] = useState(false);
  const [isPublicoDropdownOpen, setIsPublicoDropdownOpen] = useState(false);
  const [areasOptions, setAreasOptions] = useState([]);
  const [abordagemOptions, setAbordagemOptions] = useState([]);
  const [publicoOptions] = useState(['Adolescentes', 'Adultos', 'Casais', 'Idosos', 'Crianças']);
  const [classificacaoOptions, setClassificacaoOptions] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const areasDropdownRef = useRef(null);
  const abordagemDropdownRef = useRef(null);
  const publicoDropdownRef = useRef(null);

  const fetchProfissionais = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/profissionais/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        }
        throw new Error(`Erro ao buscar profissionais: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const mappedData = data.map(profissional => ({
        id: profissional.id || null,
        nome: profissional.nome || '',
        cpf: profissional.cpf || '',
        crp: profissional.crp || '',
        preco: profissional.preco || 0,
        areasAtendimento: profissional.areasAtendimento ? (Array.isArray(profissional.areasAtendimento) ? profissional.areasAtendimento : safeParseJSON(profissional.areasAtendimento)) : [],
        abordagem: profissional.abordagem ? (typeof profissional.abordagem === 'string' ? profissional.abordagem : safeParseJSON(profissional.abordagem)[0] || '') : '',
        publico: profissional.publico ? (Array.isArray(profissional.publico) ? profissional.publico : safeParseJSON(profissional.publico)) : [],
        sobreMim: profissional.sobreMim || '',
        classificacao: profissional.classificacao || '',
        foto: profissional.fotoUrl || null,
        email: profissional.email || '',
        data_nascimento: profissional.dataDeNascimento || profissional.data_nascimento || '',
        especialidade: profissional.especialidade || '',
        avatar: profissional.fotoUrl || null,
        fk_anexo: null,
        created_at: null,
        updated_at: null,
        deleted_at: null,
        fk_especialidade: null,
        link_sala: null,
      }));
      setProfissionais(mappedData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEspecialidades = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/specialties/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Erro ao buscar especialidades: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const mappedEspecialidades = (data.data || []).map(especialidade => ({
        id: especialidade.id,
        nome: especialidade.nome,
      }));
      setEspecialidades(mappedEspecialidades);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProfissionais();
    fetchEspecialidades();
  }, []);

  useEffect(() => {
    setFotoPreview(selectedProfissional?.foto || null);
  }, [selectedProfissional]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (areasDropdownRef.current && !areasDropdownRef.current.contains(event.target)) {
        setIsAreasDropdownOpen(false);
      }
      if (abordagemDropdownRef.current && !abordagemDropdownRef.current.contains(event.target)) {
        setIsAbordagemDropdownOpen(false);
      }
      if (publicoDropdownRef.current && !publicoDropdownRef.current.contains(event.target)) {
        setIsPublicoDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/profissionais/options`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Erro ao buscar opções: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setAreasOptions(data.areas_atendimento || []);
        setAbordagemOptions(data.abordagens || []);
        setClassificacaoOptions(data.classificacao || ['Prata', 'Ouro', 'Nenhum']);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOptions();
  }, []);

  const fetchProfissionalById = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/profissionais/buscarPorId/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        }
        throw new Error(`Erro ao buscar profissional: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setSelectedProfissional({
        id: data.id || null,
        nome: data.nome || '',
        cpf: data.cpf || '',
        crp: data.crp || '',
        preco: data.preco || 0,
        areasAtendimento: data.areasAtendimento ? (Array.isArray(data.areasAtendimento) ? data.areasAtendimento : safeParseJSON(data.areasAtendimento)) : [],
        abordagem: data.abordagem ? (typeof data.abordagem === 'string' ? data.abordagem : safeParseJSON(data.abordagem)[0] || '') : '',
        publico: data.publico ? (Array.isArray(data.publico) ? data.publico : safeParseJSON(data.publico)) : [],
        sobreMim: data.sobreMim || '',
        classificacao: data.classificacao || '',
        foto: data.fotoUrl || null,
        email: data.email || '',
        data_nascimento: data.dataDeNascimento || data.data_nascimento || '',
        especialidade: data.especialidade || '',
        avatar: data.fotoUrl || null,
        fk_anexo: null,
        created_at: null,
        updated_at: null,
        deleted_at: null,
        fk_especialidade: null,
        link_sala: null,
      });
      setFotoPreview(data.fotoUrl || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProfissional = () => {
    setSelectedProfissional({
      id: 0,
      nome: '',
      cpf: '',
      crp: '',
      preco: 0,
      areasAtendimento: [],
      abordagem: '',
      publico: [],
      sobreMim: '',
      classificacao: '',
      foto: null,
      email: '',
      data_nascimento: '',
      especialidade: '',
      avatar: null,
      fk_anexo: null,
      created_at: null,
      updated_at: null,
      deleted_at: null,
      fk_especialidade: null,
      link_sala: null,
    });
    setFotoPreview(null);
    setIsAddingProfissional(true);
  };

  const handleEditProfissional = async (profissional) => {
    await fetchProfissionalById(profissional.id);
    setIsAddingProfissional(false);
  };

  

  const handleProfissionalFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cpf = formData.get('cpf');
    const preco = parseFloat(formData.get('preco'));
    const areasAtendimento = formData.get('areasAtendimento');
    const abordagem = formData.get('abordagem');
    const publico = formData.get('publico');

    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      setError('CPF deve estar no formato 123.456.789-00');
      return;
    }
    if (isNaN(preco) || preco <= 0) {
      setError('Preço deve ser um número maior que 0');
      return;
    }
    if (!areasAtendimento || JSON.parse(areasAtendimento).length === 0) {
      setError('Selecione pelo menos uma área de atendimento');
      return;
    }
    if (!abordagem) {
      setError('Selecione uma abordagem');
      return;
    }
    if (!publico || JSON.parse(publico).length === 0) {
      setError('Selecione pelo menos um público');
      return;
    }

    setIsLoading(true);
    try {
      if (isAddingProfissional) {
        const response = await fetch(`${BASE_URL}/api/profissionais/create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
          },
          body: formData,
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Erro ao criar profissional: ${response.status} ${response.statusText}`);
        }
        await fetchProfissionais(); // Recarrega os dados após criação
      } else {
        const response = await fetch(`${BASE_URL}/api/profissionais/update/${selectedProfissional.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
          },
          body: formData,
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Erro ao atualizar profissional: ${response.status} ${response.statusText}`);
        }
        await fetchProfissionais(); // Recarrega os dados após edição
      }
      setSelectedProfissional(null);
      setIsAddingProfissional(false);
      setFotoPreview(null);
      setError(null);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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

  const handleCancel = () => {
    setSelectedProfissional(null);
    setIsAddingProfissional(false);
    setError(null);
    setFotoPreview(null);
  };

  const toggleArea = (area) => {
    const currentAreas = selectedProfissional?.areasAtendimento || [];
    if (currentAreas.includes(area)) {
      setSelectedProfissional({
        ...selectedProfissional,
        areasAtendimento: currentAreas.filter(a => a !== area),
      });
    } else {
      setSelectedProfissional({
        ...selectedProfissional,
        areasAtendimento: [...currentAreas, area],
      });
    }
  };

  const togglePublico = (publicoOption) => {
    const currentPublico = selectedProfissional?.publico || [];
    if (currentPublico.includes(publicoOption)) {
      setSelectedProfissional({
        ...selectedProfissional,
        publico: currentPublico.filter(p => p !== publicoOption),
      });
    } else {
      setSelectedProfissional({
        ...selectedProfissional,
        publico: [...currentPublico, publicoOption],
      });
    }
  };

  const totalPages = Math.ceil(profissionais.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProfissionais = profissionais.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Section>
      <h2>Configuração de Profissionais</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && <LoadingMessage>Carregando...</LoadingMessage>}
      {isAddingProfissional || selectedProfissional ? (
        <div>
          <h3>{isAddingProfissional ? 'Adicionar Profissional' : 'Editar Profissional'}</h3>
          <Form onSubmit={handleProfissionalFormSubmit}>
            <FormGroup>
              <label htmlFor="nome">Nome</label>
              <Input
                type="text"
                id="nome"
                name="nome"
                value={selectedProfissional?.nome || ''}
                onChange={(e) => setSelectedProfissional({ ...selectedProfissional, nome: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={selectedProfissional?.email || ''}
                onChange={(e) => setSelectedProfissional({ ...selectedProfissional, email: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="cpf">CPF</label>
              <Input
                type="text"
                id="cpf"
                name="cpf"
                value={selectedProfissional?.cpf || ''}
                onChange={(e) => setSelectedProfissional({ ...selectedProfissional, cpf: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="crp">CRP/CRM/CRN</label>
              <Input
                type="text"
                id="crp"
                name="crp"
                value={selectedProfissional?.crp || ''}
                onChange={(e) => setSelectedProfissional({ ...selectedProfissional, crp: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="preco">Preço (R$)</label>
              <Input
                type="number"
                id="preco"
                name="preco"
                value={selectedProfissional?.preco || 0}
                onChange={(e) => setSelectedProfissional({ ...selectedProfissional, preco: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="classificacao">Classificação</label>
              <select
                id="classificacao"
                name="classificacao"
                value={selectedProfissional?.classificacao || ''}
                onChange={(e) => setSelectedProfissional({ ...selectedProfissional, classificacao: e.target.value })}
                required
              >
                <option value="">Selecione uma classificação</option>
                {classificacaoOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="areasAtendimento">Áreas de Atendimento</label>
              <SelectContainer ref={areasDropdownRef}>
                <SelectedOption
                  role="button"
                  aria-expanded={isAreasDropdownOpen}
                  onClick={() => setIsAreasDropdownOpen(!isAreasDropdownOpen)}
                >
                  {selectedProfissional?.areasAtendimento?.length > 0
                    ? `${selectedProfissional.areasAtendimento.length} área(s) selecionada(s)`
                    : 'Selecione as áreas de atendimento'}
                  <FaChevronDown />
                </SelectedOption>
                {isAreasDropdownOpen && (
                  <Dropdown>
                    {areasOptions.map((area) => (
                      <Option
                        key={area}
                        onClick={() => toggleArea(area)}
                        selected={selectedProfissional?.areasAtendimento?.includes(area)}
                      >
                        <Checkbox
                          checked={selectedProfissional?.areasAtendimento?.includes(area)}
                          onChange={() => toggleArea(area)}
                        />
                        {area}
                      </Option>
                    ))}
                  </Dropdown>
                )}
              </SelectContainer>
              <input
                type="hidden"
                name="areasAtendimento"
                value={JSON.stringify(selectedProfissional?.areasAtendimento || [])}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="abordagem">Abordagem</label>
              <SelectContainer ref={abordagemDropdownRef}>
                <SelectedOption
                  role="button"
                  aria-expanded={isAbordagemDropdownOpen}
                  onClick={() => setIsAbordagemDropdownOpen(!isAbordagemDropdownOpen)}
                >
                  {selectedProfissional?.abordagem || 'Selecione uma abordagem'}
                  <FaChevronDown />
                </SelectedOption>
                {isAbordagemDropdownOpen && (
                  <Dropdown>
                    {abordagemOptions.map((abordagemOption) => (
                      <Option
                        key={abordagemOption}
                        onClick={() => setSelectedProfissional({ ...selectedProfissional, abordagem: abordagemOption })}
                        selected={selectedProfissional?.abordagem === abordagemOption}
                      >
                        {abordagemOption}
                      </Option>
                    ))}
                  </Dropdown>
                )}
              </SelectContainer>
              <input
                type="hidden"
                name="abordagem"
                value={selectedProfissional?.abordagem || ''}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="publico">Público</label>
              <SelectContainer ref={publicoDropdownRef}>
                <SelectedOption
                  role="button"
                  aria-expanded={isPublicoDropdownOpen}
                  onClick={() => setIsPublicoDropdownOpen(!isPublicoDropdownOpen)}
                >
                  {selectedProfissional?.publico?.length > 0
                    ? `${selectedProfissional.publico.length} público(s) selecionado(s)`
                    : 'Selecione o público'}
                  <FaChevronDown />
                </SelectedOption>
                {isPublicoDropdownOpen && (
                  <Dropdown>
                    {publicoOptions.map((publicoOption) => (
                      <Option
                        key={publicoOption}
                        onClick={() => togglePublico(publicoOption)}
                        selected={selectedProfissional?.publico?.includes(publicoOption)}
                      >
                        <Checkbox
                          checked={selectedProfissional?.publico?.includes(publicoOption)}
                          onChange={() => togglePublico(publicoOption)}
                        />
                        {publicoOption}
                      </Option>
                    ))}
                  </Dropdown>
                )}
              </SelectContainer>
              <input
                type="hidden"
                name="publico"
                value={JSON.stringify(selectedProfissional?.publico || [])}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="especialidade">Especialidade</label>
              <select
                id="especialidade"
                name="especialidade"
                value={selectedProfissional?.especialidade || ''}
                onChange={(e) => setSelectedProfissional({ ...selectedProfissional, especialidade: e.target.value })}
                required
              >
                <option value="">Selecione uma especialidade</option>
                {especialidades.map((especialidade) => (
                  <option key={especialidade.id} value={especialidade.nome}>
                    {especialidade.nome}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="sobreMim">Sobre Mim</label>
              <Textarea
                id="sobreMim"
                name="sobreMim"
                value={selectedProfissional?.sobreMim || ''}
                onChange={(e) => setSelectedProfissional({ ...selectedProfissional, sobreMim: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="data_nascimento">Data de Nascimento</label>
              <Input
                type="date"
                id="data_nascimento"
                name="data_nascimento"
                value={selectedProfissional?.data_nascimento || ''}
                onChange={(e) => setSelectedProfissional({ ...selectedProfissional, data_nascimento: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="avatar">Foto do Perfil</label>
              <Input id="avatar" type="file" accept="image/*" name="avatar" onChange={handleFotoChange} />
              {fotoPreview ? (
                <FotoPreview src={fotoPreview} alt="Foto do perfil" />
              ) : (
                <FotoPlaceholder>
                  <FaUserCircle />
                </FotoPlaceholder>
              )}
            </FormGroup>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar'}</Button>
            <Button type="button" onClick={handleCancel} disabled={isLoading}>Cancelar</Button>
          </Form>
        </div>
      ) : (
        <div>
          <Button onClick={handleAddProfissional} disabled={isLoading}>Adicionar Profissional</Button>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>CRP</th>
                  <th>Preço (R$)</th>
                  <th>Classificação</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {currentProfissionais.map(p => (
                  <tr key={p.id}>
                    <td>
                      {p.foto ? (
                        <ProfileImage src={p.foto} alt={p.nome} />
                      ) : (
                        <ImagePlaceholder>
                          <FaUserCircle />
                        </ImagePlaceholder>
                      )}
                    </td>
                    <td>{p.nome}</td>
                    <td>{p.crp || ''}</td>
                    <td>{(p.preco || 0).toFixed(2)}</td>
                    <td>{p.classificacao || ''}</td>
                    <td>
                      <Button onClick={() => handleEditProfissional(p)} disabled={isLoading}>Editar</Button>
 
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          {totalPages > 1 && (
            <PaginationContainer>
              <PaginationButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
              >
                Anterior
              </PaginationButton>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <PaginationButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
              >
                Próximo
              </PaginationButton>
            </PaginationContainer>
          )}
        </div>
      )}
    </Section>
  );
};

export default ProfissionaisConfig;