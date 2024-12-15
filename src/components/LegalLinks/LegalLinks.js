import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

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
      {/* Ícones das Redes Sociais */}
      <div className="social-icons">
        <a href="https://www.instagram.com/raccasaude/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/raccasaude" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com/in/racca-sa%C3%BAde-64a48b2a5/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
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
