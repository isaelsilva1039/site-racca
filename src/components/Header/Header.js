import './Header.css';
import { AccountCircle } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Referência para o dropdown

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
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
      <nav className="nav-container">
        <a href="#home" className="nav-link">Início</a>
        <a href="#benefits" className="nav-link">Benefícios</a>
        <a href="#plans" className="nav-link">Planos</a>

        {/* Dropdown Sou Cliente */}
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
      {/* Ícone do usuário com redirecionamento */}
      <a href="/admin" className="user-icon">
        <AccountCircle className="icon" />
      </a>
    </header>
  );
}

export default Header;
