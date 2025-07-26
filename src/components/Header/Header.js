import './Header.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [raccaOpen, setRaccaOpen] = useState(false);
  const [paraVoceOpen, setParaVoceOpen] = useState(false);
  const [paraEmpresasOpen, setParaEmpresasOpen] = useState(false);
  const [souPacienteOpen, setSouPacienteOpen] = useState(false);
  const [sejaParceiroOpen, setSejaParceiroOpen] = useState(false);
  const [areaClienteOpen, setAreaClienteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const modalRef = useRef(null);
  const navRef = useRef(null);

  const handleAgendamentoClick = () => {
    setIsMenuOpen(false);
    window.open('https://app.racca.store/login', '_blank');
  };

  const handleAtendimentoClick = () => {
    setIsMenuOpen(false);
    window.open('https://wa.me/5537999137500', '_blank');
  };

  const handleBlogClick = () => {
    setIsMenuOpen(false);
    window.open('https://raccasaude.blogspot.com/', '_blank');
  };

  const handleImageOptionsClick = () => {
    setIsMenuOpen(false);
    window.open('https://wa.me/5537999137500', '_blank');
  };

  const handleConsultaClinicaClick = () => {
    setIsMenuOpen(false);
    window.open('https://clientes.raccasaude.com.br/login', '_blank');
  };

  const handleAdminClick = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
  };

  const handleSejaCredenciadoClick = () => {
    setIsMenuOpen(false);
    window.open('https://wa.me/5537999137500', '_blank');
  };

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      window.location.href = '/admin';
      setIsModalOpen(false);
      setUsername('');
      setPassword('');
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUsername('');
    setPassword('');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && !event.target.closest('.hamburger')) {
        setRaccaOpen(false);
        setParaVoceOpen(false);
        setParaEmpresasOpen(false);
        setSouPacienteOpen(false);
        setSejaParceiroOpen(false);
        setAreaClienteOpen(false);
        setIsMenuOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
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

      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? '✖' : '☰'}
      </button>

      <nav className={`nav-container ${isMenuOpen ? 'open' : ''}`} ref={navRef}>
        <Link
          to="/"
          className="nav-link"
          onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Início
        </Link>

        <div className="nav-link dropdown" onClick={() => setParaVoceOpen(!paraVoceOpen)}>
          Para Você
          {paraVoceOpen && (
            <div className="dropdown-menu">
              <Link
                to="/cuidar-conectado"
                className="dropdown-item"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Cuidar Conectado
              </Link>
              <Link
                to="/especialidades"
                className="dropdown-item"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Especialidades
              </Link>
              <Link
                to="/seguros-pessoais"
                className="dropdown-item"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Seguros Pessoais
              </Link>
              <a
                href="#plans"
                className="dropdown-item"
                onClick={() => scrollToSection('plans')}
              >
                Telemedicina
              </a>
              <a
                href="#plans"
                className="dropdown-item"
                onClick={() => scrollToSection('plans')}
              >
                Terapia Online
              </a>
              <a
                href="https://raccasaude.blogspot.com/"
                className="dropdown-item"
                onClick={handleBlogClick}
              >
                Blog RACCA
              </a>
            </div>
          )}
        </div>

        <div className="nav-link dropdown" onClick={() => setParaEmpresasOpen(!paraEmpresasOpen)}>
          Para Empresas
          {paraEmpresasOpen && (
            <div className="dropdown-menu">
              <a
                href="/plano-odonto-empresarial"
                className="dropdown-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Plano Odontológico
              </a>
              <Link
                to="/nr1"
                className="dropdown-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Saúde Mental – NR1
              </Link>
              <a
                href="https://wa.me/5537999137500"
                className="dropdown-item"
                onClick={handleAtendimentoClick}
              >
                Telemedicina
              </a>
              <a
                href="https://wa.me/5537999137500"
                className="dropdown-item"
                onClick={handleAtendimentoClick}
              >
                Terapia Online
              </a>
            </div>
          )}
        </div>

        <div className="nav-link dropdown" onClick={() => setSejaParceiroOpen(!sejaParceiroOpen)}>
          Trabalhe Conosco
          {sejaParceiroOpen && (
            <div className="dropdown-menu">
              <Link
                to="/trabalhe-conosco"
                className="dropdown-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Para Psicólogos
              </Link>
              <a
                href="https://wa.me/5537999137500"
                className="dropdown-item"
                onClick={handleSejaCredenciadoClick}
              >
                Seja um Credenciado
              </a>
            </div>
          )}
        </div>

        <a
          href="#plans"
          className="nav-link agende-agora"
          onClick={() => scrollToSection('plans')}
        >
          Assine Agora
        </a>

        <div className="nav-link dropdown" onClick={() => setAreaClienteOpen(!areaClienteOpen)}>
          Área do Cliente
          {areaClienteOpen && (
            <div className="dropdown-menu">
              <a
                href="https://app.racca.store/login"
                className="dropdown-item"
                onClick={handleAgendamentoClick}
              >
                Agendar Terapia
              </a>
              <a
                href="https://clientes.raccasaude.com.br/login"
                className="dropdown-item"
                onClick={handleConsultaClinicaClick}
              >
                Clínico 24 Horas
              </a>
              <a
                href="https://wa.me/5537999137500"
                className="dropdown-item"
                onClick={handleAtendimentoClick}
              >
                Suporte RACCA
              </a>
            </div>
          )}
        </div>

     

        <div className="nav-link" onClick={handleAdminClick}>
          Área Administrativa
        </div>
      </nav>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <button className="modal-close" onClick={handleCloseModal}>
              ✖
            </button>
            <h2>Área de Administrador</h2>
            <div className="modal-input-group">
              <label htmlFor="username">Usuário</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
              />
            </div>
            <div className="modal-input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>
            <button className="modal-login-button" onClick={handleLogin}>
              Entrar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;