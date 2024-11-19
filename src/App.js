import styled from 'styled-components';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsApp/WhatsAppButton';
import Home from './pages/Home';
import Benefits from './pages/Benefits';
import Plans from './pages/Plans/Plans';
import LegalLinks from './components/LegalLinks/LegalLinks'; // Importando o componente de links legais
import BenefitsSection from './pages/BenefitsSection';
import FloatingVideo from './components/FloatingVideo';

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
  return (
    <MainContainer>
      <Header />
      <Section id="home">
        <Home />
      </Section>
      <Section id="benefits">
        <Benefits />
      </Section>
      <BenefitsSection/>
      <Section id="plans">
        <Plans />
      </Section>
      <LegalLinks /> {/* Bloco de links legais adicionado aqui */}
      <Footer />
      <WhatsAppButton />
      <FloatingVideo/>
    </MainContainer>
  );
}

export default App;
