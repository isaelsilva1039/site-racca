import './Header.css';
import { useState, useEffect, useRef } from 'react';

function Header() {
  // Estados para cada dropdown
  const [raccaOpen, setRaccaOpen] = useState(false);
  const [beneficiosOpen, setBeneficiosOpen] = useState(false);
  const [paraVoceOpen, setParaVoceOpen] = useState(false);
  const [paraEmpresasOpen, setParaEmpresasOpen] = useState(false);
  const [souPacienteOpen, setSouPacienteOpen] = useState(false);
  const [sejaParceiroOpen, setSejaParceiroOpen] = useState(false);

  // Referência para o menu inteiro (para fechar ao clicar fora)
  const navRef = useRef(null);

  // Funções de clique para abrir links externos
  const handleAgendamentoClick = () => {
    window.open('https://app.racca.store/login', '_blank');
  };

  const handleAtendimentoClick = () => {
    window.open('https://wa.me/5537999137500', '_blank');
  };

  // Fecha todos os dropdowns ao clicar fora do nav
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setRaccaOpen(false);
        setBeneficiosOpen(false);
        setParaVoceOpen(false);
        setParaEmpresasOpen(false);
        setSouPacienteOpen(false);
        setSejaParceiroOpen(false);
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
        <img
          src="/img/logo-racca.png"
          alt="Racca Saúde Logo"
          className="racca-logo"
        />
      </div>
      <nav className="nav-container" ref={navRef}>
        
        {/* Menu Principal: Início (sem submenu) */}
        <a href="#home" className="nav-link">
          Início
        </a>

        {/* RACCA SAÚDE */}
        <div
          className="nav-link dropdown"
          onClick={() => setRaccaOpen((prev) => !prev)}
        >
          Racca Saúde
          {raccaOpen && (
            <div className="dropdown-menu">
              <a href="#missao-visao-valores" className="dropdown-item">
                Missão, Visão e Valores
              </a>
              <a href="#grupo-racca" className="dropdown-item">
                O Grupo RACCA
              </a>
              <a href="#depoimentos" className="dropdown-item">
                Depoimentos
              </a>
              <a href="#politica-privacidade" className="dropdown-item">
                Política de Privacidade
              </a>
            </div>
          )}
        </div>

        {/* BENEFÍCIOS */}
        <div
          className="nav-link dropdown"
          onClick={() => setBeneficiosOpen((prev) => !prev)}
        >
          Benefícios
          {beneficiosOpen && (
            <div className="dropdown-menu">
              <a href="#terapia-online" className="dropdown-item">
                Terapia Online
              </a>
              <a href="#telemedicina" className="dropdown-item">
                Telemedicina
              </a>
              <a href="#acessibilidade-conveniencia" className="dropdown-item">
                Acessibilidade e Conveniência
              </a>
              <a href="#custo-beneficio" className="dropdown-item">
                Custo-benefício
              </a>
              <a href="#privacidade-conforto" className="dropdown-item">
                Privacidade e Conforto
              </a>
              <a href="#continuidade-tratamento" className="dropdown-item">
                Continuidade do Tratamento
              </a>
              <a href="#tecnologia-personalizacao" className="dropdown-item">
                Tecnologia e Personalização
              </a>
            </div>
          )}
        </div>

        {/* PARA VOCÊ */}
        <div
          className="nav-link dropdown"
          onClick={() => setParaVoceOpen((prev) => !prev)}
        >
          Para Você
          {paraVoceOpen && (
            <div className="dropdown-menu">
              <a href="#cuidar-conectado" className="dropdown-item">
                Cuidar Conectado
              </a>
              <a href="#especialidades" className="dropdown-item">
                Especialidades
              </a>
              <a href="#seguros-pessoais" className="dropdown-item">
                Seguros Pessoais
              </a>
              <a href="#telemedicina" className="dropdown-item">
                Telemedicina
              </a>
              <a href="#terapia-online" className="dropdown-item">
                Terapia Online
              </a>
            </div>
          )}
        </div>

        {/* PARA EMPRESAS */}
        <div
          className="nav-link dropdown"
          onClick={() => setParaEmpresasOpen((prev) => !prev)}
        >
          Para Empresas
          {paraEmpresasOpen && (
            <div className="dropdown-menu">
              <a href="#plano-odontologico" className="dropdown-item">
                Plano Odontológico
              </a>
              <a href="#saude-mental-nr1" className="dropdown-item">
                Saúde Mental – NR1
              </a>
              <a href="#telemedicina" className="dropdown-item">
                Telemedicina
              </a>
              <a href="#terapia-online" className="dropdown-item">
                Terapia Online
              </a>
            </div>
          )}
        </div>

        {/* SOU PACIENTE */}
        <div
          className="nav-link dropdown"
          onClick={() => setSouPacienteOpen((prev) => !prev)}
        >
          Sou Paciente
          {souPacienteOpen && (
            <div className="dropdown-menu">
              {/* Itens que abrem novas abas */}
              <div className="dropdown-item" onClick={handleAgendamentoClick}>
                Agendamento
              </div>
              <div className="dropdown-item" onClick={handleAtendimentoClick}>
                Atendimento
              </div>

              {/* Demais subitens */}
              <a href="#consulta-clinica" className="dropdown-item">
                Consulta Clínica
              </a>
              <a href="#financeiro" className="dropdown-item">
                Financeiro
              </a>
              <a href="#ouvidoria" className="dropdown-item">
                Ouvidoria
              </a>
              <a href="#programa-cuidar-conectado" className="dropdown-item">
                Programa Cuidar Conectado
              </a>
            </div>
          )}
        </div>

        {/* SEJA PARCEIRO */}
        <div
          className="nav-link dropdown"
          onClick={() => setSejaParceiroOpen((prev) => !prev)}
        >
          Seja Parceiro
          {sejaParceiroOpen && (
            <div className="dropdown-menu">
              <a href="#formulario-parceiro" className="dropdown-item">
                Formulário para Interessados em Ser Parceiro RACCA
              </a>
            </div>
          )}
        </div>

        {/* BLOG (sem submenu) */}
        <a href="#blog" className="nav-link">
          Blog
        </a>

        {/* AGENDE AGORA (com sombreamento amarelo ao redor do texto) */}
        <a href="#agende-agora" className="nav-link agende-agora-highlight">
          Agende Agora
        </a>

        {/* CONTATO (sem submenu) */}
        <a href="#contato" className="nav-link">
          Contato
        </a>
      </nav>
    </header>
  );
}

export default Header;