import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsApp/WhatsAppButton';
import Home from './pages/Home/Home';
import Benefits from './pages/Benefits';
import Plans from './pages/Plans/Plans';
import LegalLinks from './components/LegalLinks/LegalLinks';
import BenefitsSection from './pages/BenefitsSection';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQModal from './components/FaqModal';
import TermosDeUso from './pages/TermosDeUso';
import PoliticaDeReembolso from './pages/PoliticaDeReembolso';
import ServicesSection from './pages/NossosServicos';
import TestimonialsSection from './pages/Depoimentos';
import AboutRacca from './pages/Racca';
import MissionVisionValues from './pages/Missao';
import NR1 from './pages/Nr1/Nr1';
import CuidarConectado from './pages/CuidarConectado';
import SegurosPessoais from './pages/SegurosPessoais';
import Especialidades from './pages/Especialidades';
import PlanoOdontoEmpresarial from './pages/PlanoOdontoEmpresarial';
import ConsultaAvulsa from './pages/ConsultaAvulsa';
import AdminPage from './pages/AdminPage';
import TrabalheConosco from './pages/TrabalheConosco';
import RaVerifiedSeal from './components/RaVerifiedSeal'; 

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  scroll-behavior: smooth;
`;

const Section = styled.section`
  padding: 0px 0px;
`;

function App() {
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const handleOpenFAQModal = () => {
    setIsFAQModalOpen(true);
    console.log('Modal FAQ aberta');
  };

  const handleCloseFAQModal = () => {
    setIsFAQModalOpen(false);
    console.log('Modal FAQ fechada');
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
                  <ServicesSection />
                </Section>
                <Section id="consultaavulsa">
                  <ConsultaAvulsa />
                </Section>
                                <Section id="plans">
                  <Plans />
                </Section>
                <Section id="benefits-section">
                  <BenefitsSection />
                </Section>
                <Section id="depoimentos">
                  <TestimonialsSection />
                </Section>
                <Section id="missao-visao-valores">
                  <MissionVisionValues />
                </Section>
                <Section id="grupo-racca">
                  <AboutRacca />
                </Section>
                <Section id="benefits">
                  <Benefits />
                </Section>
                <LegalLinks onFAQClick={handleOpenFAQModal} />
                <RaVerifiedSeal />
                <Footer />
                <WhatsAppButton />
              </>
            }
          />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/politica-de-reembolso" element={<PoliticaDeReembolso />} />
          <Route path="/nr1" element={<NR1 />} />
          <Route path="/cuidar-conectado" element={<CuidarConectado />} />
          <Route path="/seguros-pessoais" element={<SegurosPessoais />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/plano-odonto-empresarial" element={<PlanoOdontoEmpresarial />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
        </Routes>
        <FAQModal isOpen={isFAQModalOpen} onClose={handleCloseFAQModal} />
      </MainContainer>
    </Router>
  );
}

export default App;
