import './Header.css';
import { AccountCircle } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleAgendamentoClick = () => {
    window.open('https://app.racca.store/login', '_blank');
  };

  const handleAtendimentoClick = () => {
    window.open('https://wa.me/5537999137500', '_blank');
  };

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header-container">
      <div className="logo-container">
        <img src="/img/logo-racca.png" alt="Racca Saúde Logo" className="racca-logo" />
      </div>

      {/* Botão de Menu Mobile */}
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navegação para Desktop e Mobile */}
      <nav className={`nav-container ${isMobileMenuOpen ? 'nav-open' : ''}`}>
        <a href="#home" className="nav-link" onClick={closeMobileMenu}>
          Início
        </a>
        <a href="#benefits" className="nav-link" onClick={closeMobileMenu}>
          Benefícios
        </a>
        <a href="#plans" className="nav-link" onClick={closeMobileMenu}>
          Planos
        </a>
        <div
          className="nav-link dropdown"
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          Sou Cliente
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleAgendamentoClick}>
                Agendamento
              </div>
              <div className="dropdown-item" onClick={handleAtendimentoClick}>
                Atendimento
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Ícone de Usuário */}
      <a href="/admin" className="user-icon">
        <AccountCircle className="icon" />
      </a>
    </header>
  );
}

export default Header;
