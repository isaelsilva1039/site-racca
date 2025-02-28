import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsApp/WhatsAppButton';
import Home from './pages/Home';
import Benefits from './pages/Benefits';
import Plans from './pages/Plans/Plans';
import LegalLinks from './components/LegalLinks/LegalLinks';
import BenefitsSection from './pages/BenefitsSection';
import FloatingVideo from './components/FloatingVideo';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQModal from './components/FaqModal';
import TermosDeUso from './pages/TermosDeUso';
import PoliticaDeReembolso from './pages/PoliticaDeReembolso';
import ServicesSection from './pages/NossosServicos';
import TestimonialsSection from './pages/Depoimentos';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log('Modal aberta');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    console.log('Modal fechada');
  };

  return (
    <Router>
      <MainContainer>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Section id="home">
                  <Home />
                </Section>
                <Section id="services">
                  <ServicesSection/>
                </Section>
                <Section id="depoiments">
                  <TestimonialsSection/>
                </Section>
                <Section id="benefits">
                  <Benefits />
                </Section>
                <BenefitsSection />
                <Section id="plans">
                  <Plans />
                </Section>
                <LegalLinks onFAQClick={handleOpenModal} />
                <Footer />
                <WhatsAppButton />
                <FloatingVideo />
              </>
            }
          />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/politica-de-reembolso" element={<PoliticaDeReembolso />} />

          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
        <FAQModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </MainContainer>
    </Router>
  );
}

export default App;
