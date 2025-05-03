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

const initialPsicologos = [
  {
    id: 1,
    nome: 'Fábio da Silva Ferreira',
    cpf: '123.456.789-00',
    crp: '04/70777',
    preco: 30,
    areas: ['adolescência', 'casais', 'depressão', 'ansiedade', 'identidade'],
    abordagem: ['Terapia Cognitivo Comportamental - TCC'],
    publico: 'Adolescentes, Adultos, Casais, Idosos',
    sobreMim: 'Psicólogo clínico especialista em TCC...',
    classificacao: 'Prata',
    foto: null,
    email: 'fabio@example.com',
    data_nascimento: '2000-02-01',
    especialidade: 'Psicologia',
    avatar: null,
    fk_anexo: null,
    created_at: null,
    updated_at: null,
    deleted_at: null,
    fk_especialidade: null,
    link_sala: null,
  },
  {
    id: 2,
    nome: 'Ana Clara Souza',
    cpf: '987.654.321-00',
    crp: '04/80888',
    preco: 50,
    areas: ['trauma', 'ansiedade', 'depressão', 'luto'],
    abordagem: ['Psicanálise'],
    publico: 'Adultos, Idosos',
    sobreMim: 'Psicanalista com 10 anos de experiência...',
    classificacao: 'Ouro',
    foto: null,
    email: 'ana@example.com',
    data_nascimento: '1985-05-15',
    especialidade: 'Psicanálise',
    avatar: null,
    fk_anexo: null,
    created_at: null,
    updated_at: null,
    deleted_at: null,
    fk_especialidade: null,
    link_sala: null,
  },
  {
    id: 3,
    nome: 'Lucas Mendes Oliveira',
    cpf: '456.789.123-00',
    crp: '04/90999',
    preco: 40,
    areas: ['carreira', 'estresse', 'relacionamentos'],
    abordagem: ['Terapia Sistêmica'],
    publico: 'Jovens Adultos, Adultos',
    sobreMim: 'Especialista em coaching e terapia sistêmica...',
    classificacao: 'Prata',
    foto: null,
    email: 'lucas@example.com',
    data_nascimento: '1990-08-20',
    especialidade: 'Terapia Sistêmica',
    avatar: null,
    fk_anexo: null,
    created_at: null,
    updated_at: null,
    deleted_at: null,
    fk_especialidade: null,
    link_sala: null,
  },
];

const areasOptions = [
  'adolescência',
  'ansiedade',
  'carreira',
  'casais',
  'depressão',
  'estresse',
  'identidade',
  'luto',
  'relacionamentos',
  'trauma',
  'alimentação',
  'autoestima',
  'burnout',
  'dependência química',
  'desenvolvimento pessoal',
  'educação',
  'família',
  'fobias',
  'gestação',
  'infância',
  'sexualidade',
  'sono',
  'tdah',
  'toc',
  'transtornos alimentares',
  'violência',
  'idosos',
  'neuropsicologia',
  'saúde mental',
  'orientação vocacional',
  'divórcio',
  'grief',
  'parentalidade',
  'autismo',
  'crises existenciais',
  'lgbtqia+',
  'conflitos interpessoais',
  'timidez',
  'assertividade',
  'mindfulness',
  'estresse pós-traumático'
];

const abordagemOptions = [
  'Terapia Cognitivo Comportamental - TCC',
  'Psicanálise',
  'Terapia Sistêmica',
  'Terapia Humanista',
  'Terapia Comportamental',
  'Terapia Junguiana',
  'Terapia Gestalt',
  'Terapia Familiar',
  'Terapia de Aceitação e Compromisso - ACT',
  'Terapia Dialética Comportamental - DBT',
  'Terapia Focada nas Emoções - EFT',
  'Terapia Breve',
  'Terapia Centrada na Pessoa',
  'Terapia Existencial',
  'Terapia Psicanalítica',
  'Terapia Integrativa',
  'Terapia de Esquemas',
  'Terapia Corporal',
  'Terapia Transpessoal',
  'Terapia Analítico-Comportamental',
  'Terapia de Casal Sistêmica',
  'Terapia Fenomenológica',
  'Terapia Narrativa',
  'Terapia Comportamental Dialética',
  'Terapia de Reprocessamento Traumático',
  'Terapia Psicodinâmica',
  'Terapia de Grupo',
  'Terapia Cognitiva',
  'Terapia Baseada em Mindfulness',
  'Terapia Experiencial',
  'Terapia de Solução de Problemas',
  'Terapia de Apoio',
  'Terapia Comportamental Integrativa',
  'Terapia de Autocompaixão',
  'Terapia de Exposição',
  'Terapia Metacognitiva',
  'Terapia de Resolução de Conflitos'
];

const BASE_URL = 'https://racca.store';

const ProfissionaisConfig = () => {
  const [psicologos, setPsicologos] = useState(initialPsicologos);
  const [selectedPsicologo, setSelectedPsicologo] = useState(null);
  const [isAddingPsicologo, setIsAddingPsicologo] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAreasDropdownOpen, setIsAreasDropdownOpen] = useState(false);
  const [isAbordagemDropdownOpen, setIsAbordagemDropdownOpen] = useState(false);
  const areasDropdownRef = useRef(null);
  const abordagemDropdownRef = useRef(null);

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

  const handleAddPsicologo = () => {
    setSelectedPsicologo({
      id: 0,
      nome: '',
      cpf: '',
      crp: '',
      preco: 0,
      areas: [],
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
    setSelectedPsicologo({ ...psicologo, abordagem: Array.isArray(psicologo.abordagem) ? psicologo.abordagem : [psicologo.abordagem] });
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
    const areas = formData.getAll('areas');
    const abordagem = formData.getAll('abordagem');

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
    if (areas.length === 0) {
      setError('Selecione pelo menos uma área de atendimento');
      return;
    }
    if (abordagem.length === 0) {
      setError('Selecione pelo menos uma abordagem');
      return;
    }

    const psicologoData = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      cpf,
      crp,
      preco,
      areas,
      abordagem,
      publico: formData.get('publico'),
      sobreMim: formData.get('sobreMim'),
      classificacao: formData.get('classificacao'),
      data_nascimento: formData.get('data_nascimento'),
      especialidade: formData.get('especialidade'),
      avatar: avatarFile,
    };

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
        setPsicologos([...psicologos, newPsicologo]);
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
        setPsicologos(psicologos.map(p => (p.id === selectedPsicologo.id ? updatedPsicologo : p)));
      }
      setSelectedPsicologo(null);
      setIsAddingPsicologo(false);
      setError(null);
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
    const currentAreas = selectedPsicologo.areas || [];
    if (currentAreas.includes(area)) {
      setSelectedPsicologo({
        ...selectedPsicologo,
        areas: currentAreas.filter(a => a !== area),
      });
    } else {
      setSelectedPsicologo({
        ...selectedPsicologo,
        areas: [...currentAreas, area],
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
              <label htmlFor="areas">Áreas de Atendimento</label>
              <SelectContainer ref={areasDropdownRef}>
                <SelectedOption onClick={() => setIsAreasDropdownOpen(!isAreasDropdownOpen)}>
                  {selectedPsicologo?.areas?.length > 0
                    ? `${selectedPsicologo.areas.length} área(s) selecionada(s)`
                    : 'Selecione as áreas de atendimento'}
                  <FaChevronDown />
                </SelectedOption>
                {isAreasDropdownOpen && (
                  <Dropdown>
                    {areasOptions.map((area) => (
                      <Option
                        key={area}
                        onClick={() => toggleArea(area)}
                        selected={selectedPsicologo?.areas?.includes(area)}
                      >
                        <Checkbox
                          name="areas"
                          value={area}
                          checked={selectedPsicologo?.areas?.includes(area)}
                          onChange={() => toggleArea(area)}
                        />
                        {area}
                      </Option>
                    ))}
                  </Dropdown>
                )}
              </SelectContainer>
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
                          name="abordagem"
                          value={abordagemOption}
                          checked={selectedPsicologo?.abordagem?.includes(abordagemOption)}
                          onChange={() => toggleAbordagem(abordagemOption)}
                        />
                        {abordagemOption}
                      </Option>
                    ))}
                  </Dropdown>
                )}
              </SelectContainer>
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
                  <th>Email</th>
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
                    <td>{p.email}</td>
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
  );
};

export default ProfissionaisConfig;