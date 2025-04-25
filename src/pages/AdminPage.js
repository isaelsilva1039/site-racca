import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

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
  padding: 80px 20px;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  color: #333;

  @media (max-width: 768px) {
    padding: 60px 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #a100ff;
  text-align: center;
  margin-bottom: 40px;
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const Section = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 1s ease-out;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background: #a100ff;
    color: #ffffff;
  }

  td {
    background: #f9f9f9;
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 1rem;
    color: #333;
  }
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #a100ff;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #a100ff;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #a100ff;
  border-radius: 5px;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 10px;
  background: #a100ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #8a00e6;
  }
`;

const FotoPreview = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;
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
`;

const LogoutButton = styled.button`
  position: fixed;
  top: 80px;
  right: 20px;
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

  &:hover {
    background: #8a00e6;
  }

  @media (max-width: 768px) {
    top: 60px;
    right: 10px;
    padding: 8px;
  }
`;

const initialPsicologos = [
  {
    id: 1,
    nome: 'Fábio da Silva Ferreira',
    crp: '04/70777',
    preco: 30,
    areas: ['adolescência', 'casais', 'depressão', 'ansiedade', 'identidade'],
    abordagem: 'Terapia Cognitivo Comportamental - TCC',
    publico: 'Adolescentes, Adultos, Casais, Idosos',
    sobreMim: 'Psicólogo clínico especialista em TCC, terapia cognitiva comportamental. Intervenção em crise de Ansiedade; Tratamento da Depressão; Problemas conjugais; Relacionamentos tóxicos; Dependência emocional; Abuso psicológico; Crises de Pânico; Traumas e Luto; Transtornos de Personalidade; Bipolar; Borderline; Obsessivo Compulsivo; TDAH; Crises Dependentes Químicas; Suicídio; Luto; Perdas e Morte; Transtorno de Automutilação; Suicídio; Prevenção ao Suicídio (diagnóstico e tratamento). Intervenções Mentais, e pacientes, dificuldades de relacionamento interpessoal. Auxílio no processo de evolução pessoal em busca da reestruturação cognitiva, autoestima e autoconhecimento. Priorizo identificar e modificar pensamentos disfuncionais, cognitives distorcidas e alterar padrões destrutivos e desencadeadores de comportamentos causadores de sofrimento psíquico. Disponho de um processo terapêutico eficaz, com ética, sigilo, confiança e sem julgamentos.',
    classificacao: 'Prata',
    foto: null,
  },
  {
    id: 2,
    nome: 'Igor Leonardo da Silva Pinheiro',
    crp: '17/7389',
    preco: 30,
    areas: ['abuso infantil', 'adolescência', 'ansiedade', 'bullying', 'depressão', 'LGBTQIA+', 'relacionamento'],
    abordagem: 'Psicologia Transpessoal',
    publico: 'Adolescentes, Adultos',
    sobreMim: 'Psicólogo com foco em Psicologia Transpessoal, atuo com adolescentes e adultos, especialmente em questões de abuso infantil, bullying e identidade de gênero. Trabalho com ansiedade, depressão e relacionamentos, promovendo o autoconhecimento e a expansão da consciência. Meu objetivo é ajudar os pacientes a encontrarem um sentido maior em suas vidas, superando traumas e desafios emocionais com uma abordagem integrativa e acolhedora.',
    classificacao: 'Prata',
    foto: null,
  },
  {
    id: 3,
    nome: 'Mariana Oliveira',
    crp: '05/12345',
    preco: 40,
    areas: ['ansiedade', 'depressão', 'estresse', 'carreira'],
    abordagem: 'Terapia Cognitivo Comportamental - TCC',
    publico: 'Adultos, Idosos',
    sobreMim: 'Psicóloga clínica com especialização em TCC, atuo com adultos e idosos enfrentando ansiedade, depressão e estresse, especialmente em questões relacionadas à carreira. Ajudo meus pacientes a desenvolverem estratégias práticas para lidar com pressões do dia a dia, promovendo equilíbrio emocional e bem-estar. Minha abordagem é focada em resultados, com ênfase em técnicas baseadas em evidências.',
    classificacao: 'Prata',
    foto: null,
  },
  {
    id: 4,
    nome: 'Clara Souza',
    crp: '06/54321',
    preco: 35,
    areas: ['relacionamento', 'autoestima', 'ansiedade', 'depressão'],
    abordagem: 'Psicoterapia Humanista',
    publico: 'Adolescentes, Adultos',
    sobreMim: 'Psicóloga humanista, trabalho com adolescentes e adultos que buscam melhorar seus relacionamentos e autoestima. Atuo em casos de ansiedade e depressão, oferecendo um espaço seguro para o autoconhecimento e o desenvolvimento pessoal. Minha abordagem valoriza a experiência única de cada indivíduo, promovendo aceitação e crescimento emocional.',
    classificacao: 'Prata',
    foto: null,
  },
  {
    id: 5,
    nome: 'Lucas Almeida',
    crp: '07/98765',
    preco: 50,
    areas: ['trauma', 'ansiedade', 'depressão', 'luto'],
    abordagem: 'EMDR',
    publico: 'Adultos, Idosos',
    sobreMim: 'Psicólogo especializado em EMDR, atuo com adultos e idosos que enfrentam traumas, luto, ansiedade e depressão. Utilizo técnicas avançadas para ajudar na reprocessamento de experiências traumáticas, promovendo alívio emocional e recuperação. Meu trabalho é focado em criar um ambiente seguro e acolhedor para que os pacientes possam superar suas dificuldades.',
    classificacao: 'Prata',
    foto: null,
  },
  {
    id: 6,
    nome: 'Beatriz Lima',
    crp: '08/45678',
    preco: 45,
    areas: ['adolescência', 'bullying', 'autoestima', 'ansiedade'],
    abordagem: 'Terapia Cognitivo Comportamental - TCC',
    publico: 'Adolescentes',
    sobreMim: 'Psicóloga clínica com foco em adolescentes, utilizo a TCC para tratar questões como bullying, ansiedade e baixa autoestima. Meu objetivo é ajudar jovens a desenvolverem resiliência emocional e habilidades para enfrentar os desafios da adolescência. Trabalho com empatia e acolhimento, criando um espaço seguro para o crescimento pessoal.',
    classificacao: 'Prata',
    foto: null,
  },
  {
    id: 7,
    nome: 'Rafael Costa',
    crp: '09/11223',
    preco: 30,
    areas: ['casais', 'relacionamento', 'conflitos familiares'],
    abordagem: 'Terapia Sistêmica',
    publico: 'Casais, Adultos',
    sobreMim: 'Psicólogo especializado em Terapia Sistêmica, atuo com casais e adultos que enfrentam conflitos familiares e dificuldades nos relacionamentos. Meu trabalho foca em compreender as dinâmicas familiares e promover uma comunicação mais saudável entre os envolvidos. Ofereço um espaço de escuta e reflexão para construir relações mais harmoniosas.',
    classificacao: 'Prata',
    foto: null,
  },
  {
    id: 8,
    nome: 'Sofia Mendes',
    crp: '10/33445',
    preco: 40,
    areas: ['LGBTQIA+', 'identidade', 'depressão', 'ansiedade'],
    abordagem: 'Psicologia Analítica',
    publico: 'Adolescentes, Adultos',
    sobreMim: 'Psicóloga com abordagem em Psicologia Analítica, atuo com adolescentes e adultos, especialmente da comunidade LGBTQIA+, em questões de identidade, depressão e ansiedade. Meu trabalho é focado em explorar o inconsciente e promover o autoconhecimento, ajudando os pacientes a encontrarem equilíbrio e autenticidade em suas vidas.',
    classificacao: 'Prata',
    foto: null,
  },
  {
    id: 9,
    nome: 'Pedro Henrique',
    crp: '11/55667',
    preco: 35,
    areas: ['carreira', 'estresse', 'ansiedade', 'depressão'],
    abordagem: 'Terapia Cognitivo Comportamental - TCC',
    publico: 'Adultos',
    sobreMim: 'Psicólogo clínico com especialização em TCC, atuo com adultos que enfrentam estresse, ansiedade e depressão relacionados à carreira. Ajudo meus pacientes a desenvolverem estratégias para lidar com pressões profissionais e encontrar um equilíbrio entre vida pessoal e trabalho. Minha abordagem é prática e focada em resultados.',
    classificacao: 'Prata',
    foto: null,
  },
  {
    id: 10,
    nome: 'Ana Clara Ribeiro',
    crp: '12/77889',
    preco: 50,
    areas: ['trauma', 'luto', 'ansiedade', 'depressão'],
    abordagem: 'Psicoterapia Psicanalítica',
    publico: 'Adultos, Idosos',
    sobreMim: 'Psicóloga com formação em Psicoterapia Psicanalítica, atuo com adultos e idosos que enfrentam traumas, luto, ansiedade e depressão. Meu trabalho é focado em explorar os processos inconscientes que influenciam o comportamento e as emoções, promovendo autoconhecimento e transformação pessoal em um ambiente acolhedor e seguro.',
    classificacao: 'Prata',
    foto: null,
  },
];

const AdminPage = () => {
  const [psicologos, setPsicologos] = useState(initialPsicologos);
  const [selectedPsicologo, setSelectedPsicologo] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFotoPreview(selectedPsicologo?.foto || null);
  }, [selectedPsicologo]);

  const handleAdd = () => {
    setSelectedPsicologo({
      nome: '',
      crp: '',
      preco: 0,
      areas: [],
      abordagem: '',
      publico: '',
      sobreMim: '',
      classificacao: 'Prata',
      foto: null,
    });
    setIsAdding(true);
  };

  const handleEdit = (psicologo) => {
    setSelectedPsicologo({ ...psicologo });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este psicólogo?')) {
      setPsicologos(psicologos.filter(p => p.id !== id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const psicologoData = {
      nome: formData.get('nome'),
      crp: formData.get('crp'),
      preco: parseFloat(formData.get('preco')) || 0,
      areas: formData.get('areas').split(',').map(a => a.trim()).filter(a => a),
      abordagem: formData.get('abordagem'),
      publico: formData.get('publico'),
      sobreMim: formData.get('sobreMim'),
      classificacao: formData.get('classificacao'),
      foto: fotoPreview,
    };

    if (isAdding) {
      const newId = psicologos.length > 0 ? Math.max(...psicologos.map(p => p.id)) + 1 : 1;
      setPsicologos([...psicologos, { id: newId, ...psicologoData }]);
    } else {
      setPsicologos(psicologos.map(p => (p.id === selectedPsicologo.id ? { ...p, ...psicologoData } : p)));
    }
    setSelectedPsicologo(null);
    setIsAdding(false);
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
    setIsAdding(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <AdminContainer>
      <Title>Painel de Administração</Title>
      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt /> Sair
      </LogoutButton>
      <Section>
        <h2>Configuração de Profissionais</h2>
        {isAdding || selectedPsicologo ? (
          <div>
            <h3>{isAdding ? 'Adicionar Psicólogo' : 'Editar Psicólogo'}</h3>
            <Form onSubmit={handleFormSubmit}>
              <FormGroup>
                <label>Nome</label>
                <Input type="text" name="nome" defaultValue={selectedPsicologo?.nome || ''} required />
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
                <Select name="classificacao" defaultValue={selectedPsicologo?.classificacao || 'Prata'} required>
                  <option value="Ouro">Ouro</option>
                  <option value="Prata">Prata</option>
                </Select>
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
            <Button onClick={handleAdd}>Adicionar Psicólogo</Button>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
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
                    <td>{p.crp}</td>
                    <td>{p.preco.toFixed(2)}</td>
                    <td>{p.classificacao}</td>
                    <td>
                      <Button onClick={() => handleEdit(p)}>Editar</Button>
                      <Button onClick={() => handleDelete(p.id)}>Excluir</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Section>
    </AdminContainer>
  );
};

export default AdminPage;