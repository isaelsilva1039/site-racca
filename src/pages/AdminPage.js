import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import ProfissionaisConfig from './ProfissionaisConfig.js';
import PlanosConfig from './PlanosConfig.js';
import PlanosProfissionaisConfig from './PlanosProfissionaisConfig.js';
import EspecialidadesConfig from './EspecialidadesConfig.js';

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

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
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

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 10px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const Tab = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => (props.active ? '#ffffff' : '#a100ff')};
  background: ${props => (props.active ? '#a100ff' : '#ffffff')};
  border: 1px solid #a100ff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => (props.active ? '#a100ff' : '#f0eaff')};
    color: ${props => (props.active ? '#ffffff' : '#8a00e6')};
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
`;

const TabContent = styled.div`
  width: 100%;
`;

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profissionais'); // Aba inicial: Profissionais

  const handleLogout = () => {
    navigate('/');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profissionais':
        return <ProfissionaisConfig />;
      case 'planos':
        return <PlanosConfig />;
      case 'planosProfissionais':
        return <PlanosProfissionaisConfig />;
      case 'especialidades':
        return <EspecialidadesConfig />;
      default:
        return null;
    }
  };

  return (
    <AdminContainer>
      <Title>Painel de Administração</Title>
      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt /> Sair
      </LogoutButton>
      <TabsContainer>
        <Tab
          active={activeTab === 'profissionais'}
          onClick={() => setActiveTab('profissionais')}
        >
          Profissionais
        </Tab>
        <Tab
          active={activeTab === 'planos'}
          onClick={() => setActiveTab('planos')}
        >
          Planos
        </Tab>
        <Tab
          active={activeTab === 'planosProfissionais'}
          onClick={() => setActiveTab('planosProfissionais')}
        >
          Planos Profissionais
        </Tab>
        <Tab
          active={activeTab === 'especialidades'}
          onClick={() => setActiveTab('especialidades')}
        >
          Especialidades
        </Tab>
      </TabsContainer>
      <TabContent>{renderTabContent()}</TabContent>
    </AdminContainer>
  );
};

export default AdminPage;