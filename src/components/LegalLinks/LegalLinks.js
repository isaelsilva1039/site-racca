import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaYoutube, FaBlog, FaGooglePlay, FaApple } from 'react-icons/fa';

const LegalSection = styled.div`
  background-color: #f8f9fa;
  padding: 20px 0;
  text-align: center;
  font-size: 0.9rem;
  color: #666;

  .social-icons {
    margin-bottom: 10px;
    
    a {
      margin: 0 10px;
      font-size: 1.5rem;
      color: #a100ff;
      transition: color 0.3s;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;

      &:hover {
        color: #7d00cc;
      }

      span {
        font-size: 0.7rem;
        margin-top: 5px;
        color: #666;
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
          <span>Instagram</span>
        </a>
        <a href="https://www.youtube.com/@RACCASAUDE" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
          <span>YouTube</span>
        </a>
        <a href="https://www.facebook.com/raccasaude" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
          <span>Facebook</span>
        </a>
        <a href="https://raccasaude.blogspot.com" target="_blank" rel="noopener noreferrer">
          <FaBlog />
          <span>Blog</span>
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.racca.raccaapp" target="_blank" rel="noopener noreferrer">
          <FaGooglePlay />
          <span>Google Play</span>
        </a>
        <a href="https://apps.apple.com/br/app/racca-sa%C3%BAde-app/id6745531117" target="_blank" rel="noopener noreferrer">
          <FaApple />
          <span>App Store</span>
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