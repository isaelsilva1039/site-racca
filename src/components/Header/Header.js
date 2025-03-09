import './Header.css';
import { useState, useEffect, useRef } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu hambúrguer
  const [raccaOpen, setRaccaOpen] = useState(false);
  const [beneficiosOpen, setBeneficiosOpen] = useState(false);
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

  // Fechar dropdowns e menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setRaccaOpen(false);
        setBeneficiosOpen(false);
        setParaVoceOpen(false);
        setParaEmpresasOpen(false);
        setSouPacienteOpen(false);
        setSejaParceiroOpen(false);
        setIsMenuOpen(false); // Fecha o menu hambúrguer também
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

      {/* Botão Hambúrguer */}
      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? '✖' : '☰'} {/* Ícone de abrir/fechar */}
      </button>

      <nav className={`nav-container ${isMenuOpen ? 'open' : ''}`} ref={navRef}>
        <a href="#home" className="nav-link">Início</a>

        <div className="nav-link dropdown" onClick={() => setRaccaOpen(!raccaOpen)}>
          Racca Saúde
          {raccaOpen && (
            <div className="dropdown-menu">
              <a href="#missao-visao-valores" className="dropdown-item">Missão, Visão e Valores</a>
              <a href="#grupo-racca" className="dropdown-item">O Grupo RACCA</a>
              <a href="#depoimentos" className="dropdown-item">Depoimentos</a>
              <a href="#politica-privacidade" className="dropdown-item">Política de Privacidade</a>
            </div>
          )}
        </div>

        <div className="nav-link dropdown" onClick={() => setBeneficiosOpen(!beneficiosOpen)}>
          Benefícios
          {beneficiosOpen && (
            <div className="dropdown-menu">
              <a href="#terapia-online" className="dropdown-item">Terapia Online</a>
              <a href="#telemedicina" className="dropdown-item">Telemedicina</a>
              <a href="#acessibilidade-conveniencia" className="dropdown-item">Acessibilidade e Conveniência</a>
              <a href="#custo-beneficio" className="dropdown-item">Custo-benefício</a>
              <a href="#privacidade-conforto" className="dropdown-item">Privacidade e Conforto</a>
              <a href="#continuidade-tratamento" className="dropdown-item">Continuidade do Tratamento</a>
              <a href="#tecnologia-personalizacao" className="dropdown-item">Tecnologia e Personalização</a>
            </div>
          )}
        </div>

        <div className="nav-link dropdown" onClick={() => setParaVoceOpen(!paraVoceOpen)}>
          Para Você
          {paraVoceOpen && (
            <div className="dropdown-menu">
              <a href="#cuidar-conectado" className="dropdown-item">Cuidar Conectado</a>
              <a href="#especialidades" className="dropdown-item">Especialidades</a>
              <a href="#seguros-pessoais" className="dropdown-item">Seguros Pessoais</a>
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
              <a href="#saude-mental-nr1" className="dropdown-item">Saúde Mental – NR1</a>
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
              <div className="dropdown-item" onClick={handleImageOptionsClick}>Programa Cuidar Conectado</div>
            </div>
          )}
        </div>

        <div className="nav-link dropdown" onClick={() => setSejaParceiroOpen(!sejaParceiroOpen)}>
          Seja Parceiro
          {sejaParceiroOpen && (
            <div className="dropdown-menu">
              <a href="#formulario-parceiro" className="dropdown-item">Formulário para Parceiros</a>
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