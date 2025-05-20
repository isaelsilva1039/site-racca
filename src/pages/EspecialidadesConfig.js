import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

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

const BASE_URL = 'https://racca.store';

const EspecialidadesConfig = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidade, setSelectedEspecialidade] = useState(null);
  const [isAddingEspecialidade, setIsAddingEspecialidade] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchEspecialidades = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/specialties/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Sessão expirada. Faça login novamente.');
        }
        throw new Error(`Erro ao buscar especialidades: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const mappedData = (data.data || []).map(especialidade => ({
        id: especialidade.id || null,
        nome: especialidade.nome || '',
      }));
      setEspecialidades(mappedData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const handleAddEspecialidade = () => {
    setSelectedEspecialidade({
      id: 0,
      nome: '',
    });
    setIsAddingEspecialidade(true);
  };

  const handleEditEspecialidade = (especialidade) => {
    setSelectedEspecialidade(especialidade);
    setIsAddingEspecialidade(false);
  };

  const handleDeleteEspecialidade = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta especialidade?')) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/specialties/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Sessão expirada. Faça login novamente.');
          }
          throw new Error(`Erro ao excluir especialidade: ${response.status} ${response.statusText}`);
        }
        setEspecialidades(especialidades.filter(e => e.id !== id));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEspecialidadeFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nome = formData.get('nome');

    if (!nome || nome.trim() === '') {
      setError('O nome da especialidade é obrigatório');
      return;
    }

    setIsLoading(true);
    try {
      const payload = { nome };
      if (isAddingEspecialidade) {
        const response = await fetch(`${BASE_URL}/api/specialties/create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Erro ao criar especialidade: ${response.status} ${response.statusText}`);
        }
        await fetchEspecialidades();
      } else {
        const response = await fetch(`${BASE_URL}/api/specialties/update/${selectedEspecialidade.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Erro ao atualizar especialidade: ${response.status} ${response.statusText}`);
        }
        await fetchEspecialidades();
      }
      setSelectedEspecialidade(null);
      setIsAddingEspecialidade(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedEspecialidade(null);
    setIsAddingEspecialidade(false);
    setError(null);
  };

  const totalPages = Math.ceil(especialidades.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEspecialidades = especialidades.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Section>
      <h2>Configuração de Especialidades</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && <LoadingMessage>Carregando...</LoadingMessage>}
      {isAddingEspecialidade || selectedEspecialidade ? (
        <div>
          <h3>{isAddingEspecialidade ? 'Adicionar Especialidade' : 'Editar Especialidade'}</h3>
          <Form onSubmit={handleEspecialidadeFormSubmit}>
            <FormGroup>
              <label htmlFor="nome">Nome</label>
              <Input
                type="text"
                id="nome"
                name="nome"
                value={selectedEspecialidade?.nome || ''}
                onChange={(e) => setSelectedEspecialidade({ ...selectedEspecialidade, nome: e.target.value })}
                required
              />
            </FormGroup>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar'}</Button>
            <Button type="button" onClick={handleCancel} disabled={isLoading}>Cancelar</Button>
          </Form>
        </div>
      ) : (
        <div>
          <Button onClick={handleAddEspecialidade} disabled={isLoading}>Adicionar Especialidade</Button>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {currentEspecialidades.map(e => (
                  <tr key={e.id}>
                    <td>{e.nome}</td>
                    <td>
                      <Button onClick={() => handleEditEspecialidade(e)} disabled={isLoading}>Editar</Button>
                      <Button onClick={() => handleDeleteEspecialidade(e.id)} disabled={isLoading}>
                        {isLoading ? 'Excluindo...' : 'Excluir'}
                      </Button>
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

export default EspecialidadesConfig;