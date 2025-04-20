import './Header.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

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
    window.open('https://app.racca.store/login', '_blank');
  };

  const handleAtendimentoClick = () => {
    window.open('https://wa.me/5537999137500', '_blank');
  };

  const handleBlogClick = () => {
    window.open('https://raccasaude.blogspot.com/', '_blank');
  };

  const handleContatoClick = () => {
    window.open('https://wa.me/5537999137500', '_blank');
  };

  const handleImageOptionsClick = () => {
    window.open('https://wa.me/5537999137500', '_blank');
  };

  const handleAdminClick = () => {
    setIsModalOpen(true); // Abre a modal
  };

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      window.location.href = '/admin'; // Redireciona se credenciais corretas
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
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
        <Link to="/" className="nav-link">Início</Link>

        <div className="nav-link dropdown" onClick={() => setRaccaOpen(!raccaOpen)}>
          Racca Saúde
          {raccaOpen && (
            <div className="dropdown-menu">
              <a href="#missao-visao-valores" className="dropdown-item">Missão, Visão e Valores</a>
              <a href="#grupo-racca" className="dropdown-item">O Grupo RACCA</a>
              <a href="#depoimentos" className="dropdown-item">Depoimentos</a>
              <Link to="/politica-de-privacidade" className="dropdown-item">Política de Privacidade</Link>
            </div>
          )}
        </div>

        <a href="#benefits" className="nav-link">Benefícios</a>

        <div className="nav-link dropdown" onClick={() => setParaVoceOpen(!paraVoceOpen)}>
          Para Você
          {paraVoceOpen && (
            <div className="dropdown-menu">
              <Link to="/cuidar-conectado" className="dropdown-item">Cuidar Conectado</Link>
              <Link to="/especialidades" className="dropdown-item">Especialidades</Link>
              <Link to="/seguros-pessoais" className="dropdown-item">Seguros Pessoais</Link>
              <a href="#plans" className="dropdown-item">Telemedicina</a>
              <a href="#plans" className="dropdown-item">Terapia Online</a>
            </div>
          )}
        </div>

        <div className="nav-link dropdown" onClick={() => setParaEmpresasOpen(!paraEmpresasOpen)}>
          Para Empresas
          {paraEmpresasOpen && (
            <div className="dropdown-menu">
              <a href="/plano-odonto-empresarial" className="dropdown-item">Plano Odontológico</a>
              <Link to="/nr1" className="dropdown-item">Saúde Mental – NR1</Link>
              <a href="#telemedicina" className="dropdown-item">Telemedicina</a>
              <a href="#terapia-online" className="dropdown-item">Terapia Online</a>
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
              <Link to="/cuidar-conectado" className="dropdown-item">Programa Cuidar Conectado</Link>
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

        <a href="#blog" className="nav-link" onClick={handleBlogClick}>Blog</a>
        <a href="#agende-agora" className="nav-link agende-agora" onClick={handleAgendamentoClick}>Agende Agora</a>
        <a href="#contato" className="nav-link" onClick={handleContatoClick}>Contato</a>
      </nav>

      <div className="profile-container">
        <AccountCircle className="profile-icon" />
        <div className="profile-dropdown">
          <div className="dropdown-item" onClick={handleAdminClick}>
            Área de Administrador
          </div>
        </div>
      </div>

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