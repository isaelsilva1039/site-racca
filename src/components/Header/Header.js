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

  const handleContatoClick = () => {
    setIsMenuOpen(false);
    window.open('https://wa.me/5537999137500', '_blank');
  };

  const handleImageOptionsClick = () => {
    setIsMenuOpen(false);
    window.open('https://wa.me/5537999137500', '_blank');
  };

  const handleAdminClick = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
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

  // Função para rolar para o topo da página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && !event.target.closest('.hamburger')) {
        setRaccaOpen(false);
        setParaVoceOpen(false);
        setParaEmpresasOpen(false);
        setSouPacienteOpen(false);
        setSejaParceiroOpen(false);
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
            scrollToTop();
          }}
        >
          Início
        </Link>

        <div className="nav-link dropdown" onClick={() => setRaccaOpen(!raccaOpen)}>
          Racca Saúde
          {raccaOpen && (
            <div className="dropdown-menu">
              <a href="#missao-visao-valores" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Missão, Visão e Valores</a>
              <a href="#grupo-racca" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>O Grupo RACCA</a>
              <a href="#depoimentos" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Depoimentos</a>
              <Link 
                to="/politica-de-privacidade" 
                className="dropdown-item" 
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
              >
                Política de Privacidade
              </Link>
            </div>
          )}
        </div>

        <a href="#benefits" className="nav-link" onClick={() => setIsMenuOpen(false)}>Benefícios</a>

        <div className="nav-link dropdown" onClick={() => setParaVoceOpen(!paraVoceOpen)}>
          Para Você
          {paraVoceOpen && (
            <div className="dropdown-menu">
              <Link 
                to="/cuidar-conectado" 
                className="dropdown-item" 
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
              >
                Cuidar Conectado
              </Link>
              <Link 
                to="/especialidades" 
                className="dropdown-item" 
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
              >
                Especialidades
              </Link>
              <Link 
                to="/seguros-pessoais" 
                className="dropdown-item" 
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
              >
                Seguros Pessoais
              </Link>
              <a href="#plans" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Telemedicina</a>
              <a 
                href="#consultaavulsa" 
                className="dropdown-item" 
                onClick={() => setIsMenuOpen(false)}
              >
                Terapia Online
              </a>
            </div>
          )}
        </div>

        <div className="nav-link dropdown" onClick={() => setParaEmpresasOpen(!paraEmpresasOpen)}>
          Para Empresas
          {paraEmpresasOpen && (
            <div className="dropdown-menu">
              <a href="/plano-odonto-empresarial" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Plano Odontológico</a>
              <Link to="/nr1" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Saúde Mental – NR1</Link>
              <a href="#telemedicina" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Telemedicina</a>
              <a href="#terapia-online" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Terapia Online</a>
            </div>
          )}
        </div>

        <div className="nav-link dropdown" onClick={() => setSouPacienteOpen(!souPacienteOpen)}>
          Sou Paciente
          {souPacienteOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleAgendamentoClick}>Agendamento</div>
              <div className="dropdown-item" onClick={handleAtendimentoClick}>Atendimento</div>
              <div className="dropdown-item" onClick={handleImageOptionsClick}>Consulta Clínica</div>
              <div className="dropdown-item" onClick={handleImageOptionsClick}>Financeiro</div>
              <div className="dropdown-item" onClick={handleImageOptionsClick}>Ouvidoria</div>
              <Link to="/cuidar-conectado" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Programa Cuidar Conectado</Link>
            </div>
          )}
        </div>

        <div className="nav-link dropdown" onClick={() => setSejaParceiroOpen(!sejaParceiroOpen)}>
          Seja Parceiro
          {sejaParceiroOpen && (
            <div className="dropdown-menu">
              {/* Adicione itens aqui se necessário */}
            </div>
          )}
        </div>

        <Link to="/trabalhe-conosco" className="nav-link" onClick={() => setIsMenuOpen(false)}>Trabalhe Conosco</Link>

        <a href="#blog" className="nav-link" onClick={handleBlogClick}>Blog</a>
        <a href="#agende-agora" className="nav-link agende-agora" onClick={handleAgendamentoClick}>Agende Agora</a>
        <a href="#contato" className="nav-link" onClick={handleContatoClick}>Contato</a>
        
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