// App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importando Router e Rotas
import Header from './components/Header/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsApp/WhatsAppButton';
import Home from './pages/Home';
import Benefits from './pages/Benefits';
import Plans from './pages/Plans/Plans';
import LegalLinks from './components/LegalLinks/LegalLinks'; // Importando o componente de links legais
import BenefitsSection from './pages/BenefitsSection';
import FloatingVideo from './components/FloatingVideo';
import PrivacyPolicy from './pages/PrivacyPolicy'; // Importando a página de Política de Privacidade
import FAQModal from './components/FaqModal'; // Importando FAQModal (nome correto)

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  scroll-behavior: smooth; /* Adiciona a rolagem suave */
`;

const Section = styled.section`
  padding: 50px 20px;
`;

function App() {
  // Estado para controlar a visibilidade da modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir a modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log('Modal aberta');
  };

  // Função para fechar a modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    console.log('Modal fechada');
  };

  return (
    <Router>
      <MainContainer>
        <Header />
        <Routes>
          {/* Rotas de navegação */}
          <Route
            path="/"
            element={
              <>
                <Section id="home">
                  <Home />
                </Section>
                <Section id="benefits">
                  <Benefits />
                </Section>
                <BenefitsSection />
                <Section id="plans">
                  <Plans />
                </Section>
                <LegalLinks onFAQClick={handleOpenModal} /> {/* Passando a função para abrir FAQ */}
                <Footer />
                <WhatsAppButton />
                <FloatingVideo />
              </>
            }
          />
          {/* Rota para Política de Privacidade */}
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
        {/* FAQ Modal fora das rotas para ser acessado a qualquer momento */}
        <FAQModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </MainContainer>
    </Router>
  );
}

export default App;
