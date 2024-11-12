import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Benefits from './pages/Benefits';
import Plans from './pages/Plans/Plans';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsApp/WhatsAppButton';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

function App() {
  return (
    <Router>
      <MainContainer>
        <Header />
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/plans" element={<Plans />} />
          </Routes>
        </ContentWrapper>
        <Footer />
        <WhatsAppButton /> {/* Botão de WhatsApp */}
      </MainContainer>
    </Router>
  );
}

export default App;
