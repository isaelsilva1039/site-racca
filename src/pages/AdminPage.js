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
  top: 100px;
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
    top: 130px;
    right: 10px;
    padding: 8px;
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