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
        <Link to="/" className="nav-link">Início</Link> {/* Atualizado para Link */}

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
              <Link to="/especialidades" className="dropdown-item">Especialidades</Link> {/* Atualizado para Link */}
              <Link to="/seguros-pessoais" className="dropdown-item">Seguros Pessoais</Link>
              <a href="#telemedicina" className="dropdown-item">Telemedicina</a>
              <a href="#terapia-online" className="dropdown-item">Terapia Online</a>
            </div>
          )}
        </div>

        <div className="nav-link dropdown" onClick={() => setParaEmpresasOpen(!paraEmpresasOpen)}>
          Para Empresas
          {paraEmpresasOpen && (
            <div className="dropdown-menu">
              <a href="#plano-odontologico" className="dropdown-item">Plano Odontológico</a>
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
    </header>
  );
}

export default Header;