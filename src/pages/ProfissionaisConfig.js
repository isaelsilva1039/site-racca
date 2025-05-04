import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';

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

const ProfissionaisConfig = () => {
  const [psicologos, setPsicologos] = useState([]);
  const [selectedPsicologo, setSelectedPsicologo] = useState(null);
  const [isAddingPsicologo, setIsAddingPsicologo] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAreasDropdownOpen, setIsAreasDropdownOpen] = useState(false);
  const [isAbordagemDropdownOpen, setIsAbordagemDropdownOpen] = useState(false);
  const [areasOptions, setAreasOptions] = useState([]);
  const [abordagemOptions, setAbordagemOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const areasDropdownRef = useRef(null);
  const abordagemDropdownRef = useRef(null);

  // Fetch professionals from API on component mount
  useEffect(() => {
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
          throw new Error(`Erro ao buscar profissionais: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Map API data to match component's expected structure
        const mappedData = data.map(profissional => ({
          id: profissional.id,
          nome: profissional.nome,
          cpf: profissional.cpf,
          crp: profissional.crp || '',
          preco: profissional.preco || 0,
          areasAtendimento: profissional.areasAtendimento ? JSON.parse(profissional.areasAtendimento) : [],
          abordagem: profissional.abordagem ? JSON.parse(profissional.abordagem) : [],
          publico: profissional.publico || '',
          sobreMim: profissional.sobreMim || '',
          classificacao: profissional.classificacao || 'Prata',
          foto: profissional.fotoUrl || null,
          email: profissional.email || '', // Email not provided in API, default to empty
          data_nascimento: profissional.data_nascimento || '', // Not provided, default to empty
          especialidade: profissional.especialidade || '', // Not provided, default to empty
          avatar: profissional.fotoUrl || null,
          fk_anexo: null,
          created_at: null,
          updated_at: null,
          deleted_at: null,
          fk_especialidade: null,
          link_sala: null,
        }));
        setPsicologos(mappedData);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar profissionais: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfissionais();
  }, []);

  useEffect(() => {
    setFotoPreview(selectedPsicologo?.foto || null);
  }, [selectedPsicologo]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (areasDropdownRef.current && !areasDropdownRef.current.contains(event.target)) {
        setIsAreasDropdownOpen(false);
      }
      if (abordagemDropdownRef.current && !abordagemDropdownRef.current.contains(event.target)) {
        setIsAbordagemDropdownOpen(false);
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
        const data = await response.json();
        setAreasOptions(data.areas_atendimento || []);
        setAbordagemOptions(data.abordagens || []);
      } catch (err) {
        setError('Erro ao carregar opções: ' + err.message);
      }
    };
    fetchOptions();
  }, []);

  const handleAddPsicologo = () => {
    setSelectedPsicologo({
      id: 0,
      nome: '',
      cpf: '',
      crp: '',
      preco: 0,
      areasAtendimento: [],
      abordagem: [],
      publico: '',
      sobreMim: '',
      classificacao: 'Prata',
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
    setIsAddingPsicologo(true);
  };

  const handleEditPsicologo = (psicologo) => {
    setSelectedPsicologo({
      ...psicologo,
      abordagem: Array.isArray(psicologo.abordagem) ? psicologo.abordagem : [psicologo.abordagem].filter(Boolean),
    });
    setIsAddingPsicologo(false);
  };

  const handleDeletePsicologo = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este psicólogo?')) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/profissionais/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Erro ao excluir psicólogo: ${response.status} ${response.statusText}`);
        }
        setPsicologos(psicologos.filter(p => p.id !== id));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePsicologoFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cpf = formData.get('cpf');
    const crp = formData.get('crp');
    const preco = parseFloat(formData.get('preco'));
    const avatarFile = formData.get('avatar');
    const areasAtendimento = JSON.stringify(formData.getAll('areasAtendimento')[0] || []);
    const abordagem = JSON.stringify(formData.getAll('abordagem')[0] || []);

    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      setError('CPF deve estar no formato 123.456.789-00');
      return;
    }
    if (!/^\d{2}\/\d{5}$/.test(crp)) {
      setError('CRP deve estar no formato 04/70777');
      return;
    }
    if (isNaN(preco) || preco <= 0) {
      setError('Preço deve ser um número maior que 0');
      return;
    }
    if (JSON.parse(areasAtendimento).length === 0) {
      setError('Selecione pelo menos uma área de atendimento');
      return;
    }
    if (JSON.parse(abordagem).length === 0) {
      setError('Selecione pelo menos uma abordagem');
      return;
    }

    formData.set('areasAtendimento', areasAtendimento);
    formData.set('abordagem', abordagem);

    setIsLoading(true);
    try {
      if (isAddingPsicologo) {
        const response = await fetch(`${BASE_URL}/api/profissionais/create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`Erro ao criar psicólogo: ${response.status} ${response.statusText}`);
        }
        const newPsicologo = await response.json();
        const updatedPsicologo = {
          ...newPsicologo,
          preco: newPsicologo.preco || 0,
          areasAtendimento: newPsicologo.areasAtendimento ? JSON.parse(newPsicologo.areasAtendimento) : [],
          abordagem: newPsicologo.abordagem ? JSON.parse(newPsicologo.abordagem) : [],
          email: newPsicologo.email || '',
          data_nascimento: newPsicologo.data_nascimento || '',
          especialidade: newPsicologo.especialidade || '',
          foto: newPsicologo.fotoUrl || null,
          avatar: newPsicologo.fotoUrl || null,
        };
        setPsicologos([...psicologos, updatedPsicologo]);
      } else {
        const response = await fetch(`${BASE_URL}/api/profissionais/update/${selectedPsicologo.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`Erro ao atualizar psicólogo: ${response.status} ${response.statusText}`);
        }
        const updatedPsicologo = await response.json();
        const mergedPsicologo = {
          ...updatedPsicologo,
          preco: updatedPsicologo.preco || 0,
          areasAtendimento: updatedPsicologo.areasAtendimento ? JSON.parse(updatedPsicologo.areasAtendimento) : [],
          abordagem: updatedPsicologo.abordagem ? JSON.parse(updatedPsicologo.abordagem) : [],
          email: updatedPsicologo.email || '',
          data_nascimento: updatedPsicologo.data_nascimento || '',
          especialidade: updatedPsicologo.especialidade || '',
          foto: updatedPsicologo.fotoUrl || null,
          avatar: updatedPsicologo.fotoUrl || null,
        };
        setPsicologos(psicologos.map(p => (p.id === selectedPsicologo.id ? mergedPsicologo : p)));
      }
      setSelectedPsicologo(null);
      setIsAddingPsicologo(false);
      setError(null);
      setCurrentPage(1); // Reset to first page after adding/updating
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
    setSelectedPsicologo(null);
    setIsAddingPsicologo(false);
    setError(null);
  };

  const toggleArea = (area) => {
    const currentAreas = selectedPsicologo.areasAtendimento || [];
    if (currentAreas.includes(area)) {
      setSelectedPsicologo({
        ...selectedPsicologo,
        areasAtendimento: currentAreas.filter(a => a !== area),
      });
    } else {
      setSelectedPsicologo({
        ...selectedPsicologo,
        areasAtendimento: [...currentAreas, area],
      });
    }
  };

  const toggleAbordagem = (abordagemOption) => {
    const currentAbordagem = selectedPsicologo.abordagem || [];
    if (currentAbordagem.includes(abordagemOption)) {
      setSelectedPsicologo({
        ...selectedPsicologo,
        abordagem: currentAbordagem.filter(a => a !== abordagemOption),
      });
    } else {
      setSelectedPsicologo({
        ...selectedPsicologo,
        abordagem: [...currentAbordagem, abordagemOption],
      });
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(psicologos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPsicologos = psicologos.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Section>
      <h2>Configuração de Profissionais</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && <LoadingMessage>Carregando...</LoadingMessage>}
      {isAddingPsicologo || selectedPsicologo ? (
        <div>
          <h3>{isAddingPsicologo ? 'Adicionar Psicólogo' : 'Editar Psicólogo'}</h3>
          <Form onSubmit={handlePsicologoFormSubmit}>
            <FormGroup>
              <label htmlFor="nome">Nome</label>
              <Input type="text" id="nome" name="nome" defaultValue={selectedPsicologo?.nome || ''} required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <Input type="email" id="email" name="email" defaultValue={selectedPsicologo?.email || ''} required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="cpf">CPF</label>
              <Input type="text" id="cpf" name="cpf" defaultValue={selectedPsicologo?.cpf || ''} required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="crp">CRP</label>
              <Input type="text" id="crp" name="crp" defaultValue={selectedPsicologo?.crp || ''} required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="preco">Preço (R$)</label>
              <Input
                type="number"
                id="preco"
                name="preco"
                defaultValue={selectedPsicologo?.preco || 0}
                min="0"
                step="0.01"
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="classificacao">Classificação</label>
              <select id="classificacao" name="classificacao" defaultValue={selectedPsicologo?.classificacao || 'Prata'} required>
                <option value="Ouro">Ouro</option>
                <option value="Prata">Prata</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="areasAtendimento">Áreas de Atendimento</label>
              <SelectContainer ref={areasDropdownRef}>
                <SelectedOption onClick={() => setIsAreasDropdownOpen(!isAreasDropdownOpen)}>
                  {selectedPsicologo?.areasAtendimento?.length > 0
                    ? `${selectedPsicologo.areasAtendimento.length} área(s) selecionada(s)`
                    : 'Selecione as áreas de atendimento'}
                  <FaChevronDown />
                </SelectedOption>
                {isAreasDropdownOpen && (
                  <Dropdown>
                    {areasOptions.map((area) => (
                      <Option
                        key={area}
                        onClick={() => toggleArea(area)}
                        selected={selectedPsicologo?.areasAtendimento?.includes(area)}
                      >
                        <Checkbox
                          checked={selectedPsicologo?.areasAtendimento?.includes(area)}
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
                value={JSON.stringify(selectedPsicologo?.areasAtendimento || [])}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="abordagem">Abordagem</label>
              <SelectContainer ref={abordagemDropdownRef}>
                <SelectedOption onClick={() => setIsAbordagemDropdownOpen(!isAbordagemDropdownOpen)}>
                  {selectedPsicologo?.abordagem?.length > 0
                    ? `${selectedPsicologo.abordagem.length} abordagem(es) selecionada(s)`
                    : 'Selecione as abordagens'}
                  <FaChevronDown />
                </SelectedOption>
                {isAbordagemDropdownOpen && (
                  <Dropdown>
                    {abordagemOptions.map((abordagemOption) => (
                      <Option
                        key={abordagemOption}
                        onClick={() => toggleAbordagem(abordagemOption)}
                        selected={selectedPsicologo?.abordagem?.includes(abordagemOption)}
                      >
                        <Checkbox
                          checked={selectedPsicologo?.abordagem?.includes(abordagemOption)}
                          onChange={() => toggleAbordagem(abordagemOption)}
                        />
                        {abordagemOption}
                      </Option>
                    ))}
                  </Dropdown>
                )}
              </SelectContainer>
              <input
                type="hidden"
                name="abordagem"
                value={JSON.stringify(selectedPsicologo?.abordagem || [])}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="publico">Público</label>
              <Input type="text" id="publico" name="publico" defaultValue={selectedPsicologo?.publico || ''} required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="sobreMim">Sobre Mim</label>
              <Textarea id="sobreMim" name="sobreMim" defaultValue={selectedPsicologo?.sobreMim || ''} required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="data_nascimento">Data de Nascimento</label>
              <Input
                type="date"
                id="data_nascimento"
                name="data_nascimento"
                defaultValue={selectedPsicologo?.data_nascimento || ''}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="especialidade">Especialidade</label>
              <Input
                type="text"
                id="especialidade"
                name="especialidade"
                defaultValue={selectedPsicologo?.especialidade || ''}
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
            <Button type="submit" disabled={isLoading}>Salvar</Button>
            <Button type="button" onClick={handleCancel} disabled={isLoading}>Cancelar</Button>
          </Form>
        </div>
      ) : (
        <div>
          <Button onClick={handleAddPsicologo} disabled={isLoading}>Adicionar Psicólogo</Button>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>CRP</th>
                  <th>Preço (R$)</th>
                  <th>Classificação</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {currentPsicologos.map(p => (
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
                    <td>{p.email}</td>
                    <td>{p.cpf}</td>
                    <td>{p.crp || ''}</td>
                    <td>{(p.preco || 0).toFixed(2)}</td>
                    <td>{p.classificacao || ''}</td>
                    <td>
                      <Button onClick={() => handleEditPsicologo(p)} disabled={isLoading}>Editar</Button>
                      <Button onClick={() => handleDeletePsicologo(p.id)} disabled={isLoading}>Excluir</Button>
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
                disabled={currentPage === 1}
              >
                Anterior
              </PaginationButton>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <PaginationButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
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