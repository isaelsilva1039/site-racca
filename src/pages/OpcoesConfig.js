import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ConfigContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #a100ff;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const OptionItem = styled.li`
  padding: 8px;
  background: #f9f9f9;
  margin-bottom: 5px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  background: ${props => (props.danger ? '#ff4d4d' : '#a100ff')};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-left: 5px;

  &:hover {
    background: ${props => (props.danger ? '#cc0000' : '#8a00e6')};
  }
`;

const AddForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #a100ff;
  border-radius: 4px;
  flex: 1;
`;

const EditForm = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  margin: 10px 0;
`;

const SuccessMessage = styled.p`
  color: #28a745;
  margin: 10px 0;
`;

const OpcoesConfig = () => {
  const [abordagens, setAbordagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newAbordagem, setNewAbordagem] = useState('');
  const [editingAbordagem, setEditingAbordagem] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const fetchAbordagens = async () => {
      try {
        const response = await fetch('https://racca.store/api/options/abordagens', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmYXR1cmExMDAiLCJpYXQiOjE3NDcwNzE3NjMsImV4cCI6MTc0NzA3MzU2M30.jHpdzkX8-AbygKHcaX0aaslNq7sCNABRO_P5SXHRtjVF9qxVEonBwWNACfnFPt7c0qbTyBvuvq3fWVXxMiKlcw',
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao carregar abordagens');
        }
        const data = await response.json();
        setAbordagens(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAbordagens();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newAbordagem.trim()) {
      setError('O nome da abordagem não pode estar vazio');
      setSuccess(null);
      return;
    }

    try {
      const response = await fetch('https://racca.store/api/options/abordagens', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmYXR1cmExMDAiLCJpYXQiOjE3NDcwNzE3NjMsImV4cCI6MTc0NzA3MzU2M30.jHpdzkX8-AbygKHcaX0aaslNq7sCNABRO_P5SXHRtjVF9qxVEonBwWNACfnFPt7c0qbTyBvuvq3fWVXxMiKlcw',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ nome: newAbordagem }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao adicionar abordagem');
      }
      // Assuming the API returns { message: "Abordagem adicionada com sucesso" }
      // Use the input value for state update since API doesn't return the new item
      setAbordagens([...abordagens, newAbordagem]);
      setNewAbordagem('');
      setSuccess('Abordagem adicionada com sucesso');
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const handleEditStart = (abordagem) => {
    setEditingAbordagem(abordagem);
    setEditValue(abordagem);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editValue.trim()) {
      setError('O nome da abordagem não pode estar vazio');
      setSuccess(null);
      return;
    }

    try {
      const response = await fetch(`https://racca.store/api/options/abordagens/${encodeURIComponent(editingAbordagem)}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmYXR1cmExMDAiLCJpYXQiOjE3NDcwNzE3NjMsImV4cCI6MTc0NzA3MzU2M30.jHpdzkX8-AbygKHcaX0aaslNq7sCNABRO_P5SXHRtjVF9qxVEonBwWNACfnFPt7c0qbTyBvuvq3fWVXxMiKlcw',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ nome: editValue }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao editar abordagem');
      }
      const updatedItem = await response.json();
      setAbordagens(abordagens.map(item => (item === editingAbordagem ? updatedItem.nome : item)));
      setEditingAbordagem(null);
      setEditValue('');
      setSuccess('Abordagem editada com sucesso');
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const handleDelete = async (abordagem) => {
    if (!window.confirm(`Confirmar exclusão da abordagem "${abordagem}"?`)) return;

    try {
      const response = await fetch(`https://racca.store/api/options/abordagens/${encodeURIComponent(abordagem)}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmYXR1cmExMDAiLCJpYXQiOjE3NDcwNzE3NjMsImV4cCI6MTc0NzA3MzU2M30.jHpdzkX8-AbygKHcaX0aaslNq7sCNABRO_P5SXHRtjVF9qxVEonBwWNACfnFPt7c0qbTyBvuvq3fWVXxMiKlcw',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao excluir abordagem');
      }
      setAbordagens(abordagens.filter(item => item !== abordagem));
      setSuccess('Abordagem excluída com sucesso');
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <ConfigContainer>
      <SectionTitle>Abordagens</SectionTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      <AddForm onSubmit={handleAdd}>
        <Input
          type="text"
          value={newAbordagem}
          onChange={(e) => setNewAbordagem(e.target.value)}
          placeholder="Adicionar nova abordagem"
        />
        <Button type="submit">Adicionar</Button>
      </AddForm>
      <OptionList>
        {abordagens.map((item, index) => (
          <OptionItem key={index}>
            {editingAbordagem === item ? (
              <EditForm onSubmit={handleEditSubmit}>
                <Input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <Button type="submit">Salvar</Button>
                <Button danger onClick={() => setEditingAbordagem(null)}>Cancelar</Button>
              </EditForm>
            ) : (
              <>
                {item}
                <div>
                  <Button onClick={() => handleEditStart(item)}>Editar</Button>
                  <Button danger onClick={() => handleDelete(item)}>Excluir</Button>
                </div>
              </>
            )}
          </OptionItem>
        ))}
      </OptionList>
    </ConfigContainer>
  );
};

export default OpcoesConfig;