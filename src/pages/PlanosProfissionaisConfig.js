import React, { useState, useEffect, useRef } from 'react';
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

const PlanosProfissionaisConfig = () => {
  const [professionalPlans, setProfessionalPlans] = useState([]);
  const [selectedProfessionalPlan, setSelectedProfessionalPlan] = useState(null);
  const [isAddingProfessionalPlan, setIsAddingProfessionalPlan] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProfessionalPlans = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/profissionais/planos/all`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Erro ao buscar planos para profissionais: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const mappedData = data.map(plan => ({
          id: plan.id,
          title: plan.titulo,
          price: parseFloat(plan.preco).toFixed(2),
          benefits: plan.beneficios.split(',').map(b => b.trim()),
          classificacao: plan.classificacao,
          icon: plan.icon || 'FaStar',
          created_at: plan.created_at,
          updated_at: plan.updated_at,
        }));
        setProfessionalPlans(mappedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfessionalPlans();
  }, []);

  const handleAddProfessionalPlan = () => {
    setSelectedProfessionalPlan({
      id: 0,
      title: '',
      price: '',
      benefits: [],
      classificacao: 'Prata',
      icon: 'FaStar',
    });
    setIsAddingProfessionalPlan(true);
  };

  const handleEditProfessionalPlan = async (plan) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/profissionais/planos/${plan.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Erro ao buscar plano para profissional: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const mappedData = {
        id: data.id,
        title: data.titulo,
        price: parseFloat(data.preco).toFixed(2),
        benefits: data.beneficios.split(',').map(b => b.trim()),
        classificacao: data.classificacao,
        icon: data.icon || 'FaStar',
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
      setSelectedProfessionalPlan(mappedData);
      setIsAddingProfessionalPlan(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfessionalPlan = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este plano para profissionais?')) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/profissionais/planos/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Erro ao excluir plano para profissional: ${response.status} ${response.statusText}`);
        }
        setProfessionalPlans(professionalPlans.filter(p => p.id !== id));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleProfessionalPlanFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const price = formData.get('price');

    if (!/^\d+(\.\d{2})?$/.test(price)) {
      setError('O preço deve estar no formato 30.00');
      return;
    }

    const planData = {
      titulo: formData.get('title'),
      preco: price,
      beneficios: formData.get('benefits').split('\n').map(b => b.trim()).join(','),
      classificacao: formData.get('classificacao'),
      icon: formData.get('icon'),
    };

    setIsLoading(true);
    try {
      if (isAddingProfessionalPlan) {
        const response = await fetch(`${BASE_URL}/api/profissionais/planos/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(planData),
        });
        if (!response.ok) {
          throw new Error(`Erro ao criar plano para profissional: ${response.status} ${response.statusText}`);
        }
        const newPlan = await response.json();
        const mappedNewPlan = {
          id: newPlan.id,
          title: newPlan.titulo,
          price: parseFloat(newPlan.preco).toFixed(2),
          benefits: newPlan.beneficios.split(',').map(b => b.trim()),
          classificacao: newPlan.classificacao,
          icon: newPlan.icon || 'FaStar',
          created_at: newPlan.created_at,
          updated_at: newPlan.updated_at,
        };
        setProfessionalPlans([...professionalPlans, mappedNewPlan]);
      } else {
        const response = await fetch(`${BASE_URL}/api/profissionais/planos/update/${selectedProfessionalPlan.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(planData),
        });
        if (!response.ok) {
          throw new Error(`Erro ao atualizar plano para profissional: ${response.status} ${response.statusText}`);
        }
        const updatedPlan = await response.json();
        const mappedUpdatedPlan = {
          id: updatedPlan.id,
          title: updatedPlan.titulo,
          price: parseFloat(updatedPlan.preco).toFixed(2),
          benefits: updatedPlan.beneficios.split(',').map(b => b.trim()),
          classificacao: updatedPlan.classificacao,
          icon: updatedPlan.icon || 'FaStar',
          created_at: updatedPlan.created_at,
          updated_at: updatedPlan.updated_at,
        };
        setProfessionalPlans(professionalPlans.map(p => (p.id === selectedProfessionalPlan.id ? mappedUpdatedPlan : p)));
      }
      setSelectedProfessionalPlan(null);
      setIsAddingProfessionalPlan(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedProfessionalPlan(null);
    setIsAddingProfessionalPlan(false);
    setError(null);
  };

  const handleIconSelect = (iconName) => {
    setSelectedProfessionalPlan({ ...selectedProfessionalPlan, icon: iconName });
    setIsDropdownOpen(false);
  };

  const selectedProfessionalIcon = iconOptions.find(opt => opt.name === selectedProfessionalPlan?.icon)?.component || <FaStar />;

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
      <h2>Configuração de Planos para Profissionais</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && <LoadingMessage>Carregando...</LoadingMessage>}
      {isAddingProfessionalPlan || selectedProfessionalPlan ? (
        <div>
          <h3>{isAddingProfessionalPlan ? 'Adicionar Plano para Profissionais' : 'Editar Plano para Profissionais'}</h3>
          <Form onSubmit={handleProfessionalPlanFormSubmit}>
            <FormGroup>
              <label htmlFor="title">Título</label>
              <Input
                type="text"
                id="title"
                name="title"
                defaultValue={selectedProfessionalPlan?.title || ''}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="price">Preço (ex: 30.00)</label>
              <Input
                type="text"
                id="price"
                name="price"
                defaultValue={selectedProfessionalPlan?.price || ''}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="classificacao">Classificação</label>
              <select id="classificacao" name="classificacao" defaultValue={selectedProfessionalPlan?.classificacao || 'Prata'} required>
                <option value="Ouro">Ouro</option>
                <option value="Prata">Prata</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="icon">Ícone</label>
              <SelectContainer ref={dropdownRef}>
                <SelectedOption onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {selectedProfessionalIcon} {selectedProfessionalPlan?.icon || 'Selecione um ícone'}
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
              <input type="hidden" name="icon" value={selectedProfessionalPlan?.icon || 'FaStar'} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="benefits">Benefícios (um por linha)</label>
              <Textarea
                id="benefits"
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
  );
};

export default PlanosProfissionaisConfig;