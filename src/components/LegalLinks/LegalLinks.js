import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaYoutube, FaBlog, FaGooglePlay } from 'react-icons/fa'; // Added FaYoutube, FaBlog, and FaGooglePlay

const LegalSection = styled.div`
  background-color: #f8f9fa; /* Cor de fundo */
  padding: 20px 0;
  text-align: center;
  font-size: 0.9rem;
  color: #666;

  .social-icons {
    margin-bottom: 10px; /* Espaço entre os ícones e os links */
    
    a {
      margin: 0 10px;
      font-size: 1.5rem; /* Tamanho dos ícones */
      color: #a100ff;
      transition: color 0.3s;

      &:hover {
        color: #7d00cc;
      }
    }
  }

  .legal-links {
    a, .router-link {
      text-decoration: none;
      color: #a100ff;
      margin: 0 10px;
      transition: color 0.3s;

      &:hover {
        color: #7d00cc;
      }
    }
  }
`;

function LegalLinks({ onFAQClick }) {
  const handleFAQClick = (e) => {
    e.preventDefault();
    if (onFAQClick) {
      onFAQClick();
    }
  };

  return (
    <LegalSection>
      {/* Ícones das Redes Sociais e Links Adicionais */}
      <div className="social-icons">
        <a href="https://www.instagram.com/raccasaude/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.youtube.com/@RACCASAUDE" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
        <a href="https://www.facebook.com/raccasaude" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://raccasaude.blogspot.com" target="_blank" rel="noopener noreferrer">
          <FaBlog />
        </a>
        <a href="https://play.google.com/store/apps/details?id=br.com.app.gpu3062692.gpu1d404764e1a7796325d587e2a0a7dc10&hl=pt_BR&pli=1" target="_blank" rel="noopener noreferrer">
          <FaGooglePlay />
        </a>
      </div>

      {/* Links Legais */}
      <div className="legal-links">
        <Link to="/politica-de-privacidade" className="router-link">
          Política de Privacidade
        </Link>
        |
        <a href="#faq" onClick={handleFAQClick} rel="noopener noreferrer">
          FAQ
        </a>
        |
        <Link to="/termos-de-uso" className="router-link">
          Termos de Uso
        </Link>
        |
        <Link to="/politica-de-reembolso" className="router-link">
          Política de Reembolso
        </Link>
      </div>
    </LegalSection>
  );
}

export default LegalLinks;