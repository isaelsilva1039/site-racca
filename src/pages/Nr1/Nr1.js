import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import { FaArrowLeft } from 'react-icons/fa'; // Importando ícone de seta
import './Nr1.css';

function NR1() {
  const navigate = useNavigate(); // Hook para navegação

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <section className="nr1-container">
      <header className="nr1-header">
        <button className="back-button" onClick={handleBack} title="Voltar">
          <FaArrowLeft /> Voltar
        </button>
        <h1 className="nr1-title">Guia Completo da NR-1</h1>
        <p className="subtitle">Nova Atualização de 2024 - Conformidade, Segurança e Saúde Mental</p>
      </header>

      <div className="nr1-content">
        <aside className="nr1-sidebar">
          <h3>Tópicos do Guia</h3>
          <ul className="nr1-topics">
            <li><a href="#introducao">01. Introdução à NR-1</a></li>
            <li><a href="#objetivos">02. Objetivos e Princípios Fundamentais</a></li>
            <li><a href="#quem-deve-seguir">03. Quem Deve Seguir a NR-1?</a></li>
            <li><a href="#componentes">04. Principais Componentes da NR-1</a></li>
            <li><a href="#atualizacoes">05. Atualizações Recentes</a></li>
            <li><a href="#grandes-empresas">06. NR-1 para Grandes Empresas</a></li>
            <li><a href="#pequenas-empresas">07. NR-1 para Micro e Pequenas Empresas</a></li>
            <li><a href="#beneficios">08. Benefícios de Implementar a NR-1</a></li>
            <li><a href="#papel-rh">09. O Papel do RH e da Liderança</a></li>
            <li><a href="#racca-ajuda">10. Como a RACCA Saúde Pode Ajudar</a></li>
            <li><a href="#faq">11. Perguntas Frequentes</a></li>
          </ul>
          <button className="nr1-button">Entre em Contato</button>
        </aside>

        <main className="nr1-main">
          <section id="introducao" className="nr1-section">
            <h2>1. Introdução à NR-1</h2>
            <p>A NR-1 é a norma base da segurança do trabalho no Brasil. Ela define regras para a prevenção de riscos ocupacionais, estabelecendo obrigações para empresas e trabalhadores. Sua aplicação contribui para:</p>
            <ul className="nr1-benefits">
              <li>Redução de acidentes e doenças ocupacionais</li>
              <li>Conformidade legal para evitar multas e penalidades</li>
              <li>Ambiente de trabalho seguro e produtivo</li>
            </ul>
            <p>Todas as empresas que empregam trabalhadores sob a CLT devem seguir a NR-1.</p>
          </section>

          <section id="objetivos" className="nr1-section">
            <h2>2. Objetivos e Princípios Fundamentais da NR-1</h2>
            <p>A NR-1 tem como base a Gestão de Riscos Ocupacionais (GRO) e estabelece um modelo de prevenção contínua:</p>
            <ul className="nr1-benefits">
              <li>Identificar e mitigar riscos no ambiente de trabalho</li>
              <li>Garantir a segurança e saúde dos trabalhadores</li>
              <li>Assegurar a conformidade com a legislação trabalhista</li>
              <li>Promover uma cultura de segurança e bem-estar</li>
            </ul>
            <p>A norma prevê obrigatoriedade de treinamentos, implementação de medidas preventivas e monitoramento de riscos.</p>
          </section>

          <section id="quem-deve-seguir" className="nr1-section">
            <h2>3. Quem Deve Seguir a NR-1?</h2>
            <p>A NR-1 é obrigatória para todas as empresas com funcionários registrados, independentemente do porte ou segmento:</p>
            <ul className="nr1-benefits">
              <li>Grandes empresas – Precisam de um Programa de Gerenciamento de Riscos (PGR) completo.</li>
              <li>Micro e pequenas empresas – Se forem de baixo risco, podem apresentar Declaração de Inexistência de Riscos.</li>
            </ul>
            <p><strong>Atenção:</strong> O não cumprimento da NR-1 pode resultar em multas, interdições e processos trabalhistas.</p>
          </section>

          <section id="componentes" className="nr1-section">
            <h2>4. Principais Componentes da NR-1</h2>
            <p>Para cumprir a NR-1, as empresas devem implementar um Programa de Gerenciamento de Riscos (PGR), composto por:</p>
            <ul className="nr1-benefits">
              <li><strong>Inventário de Riscos</strong> – Mapeamento de riscos físicos, químicos, biológicos, ergonômicos e psicossociais.</li>
              <li><strong>Plano de Ação</strong> – Estratégias para eliminar ou minimizar riscos no ambiente de trabalho.</li>
              <li><strong>Treinamentos Obrigatórios</strong> – Capacitação periódica para segurança dos colaboradores.</li>
            </ul>
            <p>Esses componentes garantem proteção ao trabalhador e segurança jurídica à empresa.</p>
          </section>

          <section id="atualizacoes" className="nr1-section">
            <h2>5. Atualizações Recentes na NR-1</h2>
            <p>As últimas revisões da NR-1 trouxeram mudanças importantes, como:</p>
            <ul className="nr1-benefits">
              <li>Gestão de riscos psicossociais – Prevenção de estresse, ansiedade e burnout no trabalho.</li>
              <li>Flexibilização para pequenas empresas – Microempresas de baixo risco podem substituir o PGR por uma declaração simples.</li>
              <li>Digitalização dos processos – Documentos podem ser armazenados eletronicamente, facilitando auditorias.</li>
            </ul>
            <p>Essas atualizações reduzem burocracias e tornam a implementação da norma mais eficiente.</p>
          </section>

          <section id="grandes-empresas" className="nr1-section">
            <h2>6. NR-1 para Grandes Empresas</h2>
            <p>As grandes empresas precisam de um PGR completo, pois possuem mais trabalhadores e riscos ocupacionais. Ações recomendadas:</p>
            <ul className="nr1-benefits">
              <li>Mapeamento avançado de riscos ocupacionais.</li>
              <li>Treinamentos contínuos para colaboradores e gestores.</li>
              <li>Acompanhamento regular da saúde mental dos trabalhadores.</li>
            </ul>
            <p>Ter um PGR atualizado evita autuações e processos trabalhistas.</p>
          </section>

          <section id="pequenas-empresas" className="nr1-section">
            <h2>7. NR-1 para Micro e Pequenas Empresas</h2>
            <p>Micro e pequenas empresas podem simplificar a adequação à NR-1:</p>
            <ul className="nr1-benefits">
              <li>Se não houver riscos significativos, substitua o PGR por uma Declaração de Inexistência de Riscos.</li>
              <li>Negócios com riscos devem implementar um PGR simplificado.</li>
            </ul>
            <p>Empresas que não comprovarem a inexistência de riscos podem ser multadas.</p>
          </section>

          <section id="beneficios" className="nr1-section">
            <h2>8. Benefícios de Implementar a NR-1</h2>
            <ul className="nr1-benefits">
              <li><strong>Redução de Acidentes</strong> – Menos afastamentos e melhor produtividade.</li>
              <li><strong>Ambiente Seguro</strong> – Funcionários mais engajados e satisfeitos.</li>
              <li><strong>Cumprimento da Lei</strong> – Prevenção de multas e processos.</li>
              <li><strong>Menos Custos</strong> – Redução de afastamentos e ações judiciais.</li>
            </ul>
            <p>Implementar a NR-1 é um investimento na segurança e no crescimento sustentável da empresa.</p>
          </section>

          <section id="papel-rh" className="nr1-section">
            <h2>9. O Papel do RH e da Liderança na NR-1</h2>
            <p>RH e gestores são responsáveis por garantir a cultura de segurança no trabalho:</p>
            <ul className="nr1-benefits">
              <li><strong>RH:</strong> Organizar treinamentos e campanhas de conscientização; manter documentos atualizados.</li>
              <li><strong>Liderança:</strong> Fomentar a cultura de segurança; monitorar riscos e implementar melhorias.</li>
            </ul>
            <p>Atuação conjunta garante conformidade e um ambiente seguro.</p>
          </section>

          <section id="racca-ajuda" className="nr1-section">
            <h2>10. Como a RACCA Saúde Pode Ajudar</h2>
            <p>A RACCA Saúde oferece suporte completo para implementar a NR-1:</p>
            <ul className="nr1-benefits">
              <li><strong>Mapeamento de Riscos Psicossociais</strong> – Controle de estresse e ansiedade ocupacional.</li>
              <li><strong>Treinamentos Personalizados</strong> – Capacitação para líderes e equipes.</li>
              <li><strong>Consultoria em Segurança</strong> – Auxílio no PGR e Plano de Ação.</li>
              <li><strong>Programas de Bem-Estar</strong> – Acompanhamento para um ambiente saudável.</li>
            </ul>
            <p>Com a RACCA Saúde, sua empresa garante conformidade e qualidade de vida no trabalho.</p>
          </section>

          <section id="faq" className="nr1-section">
            <h2>11. Perguntas Frequentes sobre a NR-1</h2>
            <dl>
              <dt>1. Quem precisa seguir a NR-1?</dt>
              <dd>Empresas com funcionários registrados na CLT, independentemente do porte ou setor.</dd>
              <dt>2. O que é o PGR e por que ele é importante?</dt>
              <dd>O Programa de Gerenciamento de Riscos mapeia e reduz riscos no ambiente de trabalho.</dd>
              <dt>3. Como a NR-1 se aplica a pequenas empresas?</dt>
              <dd>Microempresas de baixo risco podem substituir o PGR por uma Declaração de Inexistência de Riscos.</dd>
              <dt>4. O que acontece se minha empresa não cumprir a NR-1?</dt>
              <dd>Ela pode ser multada, interditada ou sofrer ações trabalhistas.</dd>
              <dt>5. Como a RACCA Saúde pode ajudar?</dt>
              <dd>Oferecemos treinamentos, consultoria e programas de saúde ocupacional.</dd>
            </dl>
          </section>

          <section className="nr1-section conclusion">
            <h2>Conclusão</h2>
            <p>A NR-1 é essencial para garantir um ambiente seguro, produtivo e legalmente adequado. Quer ajuda para implementá-la? A RACCA Saúde tem soluções completas para sua empresa!</p>
            <button className="nr1-button">Fale Conosco</button>
          </section>
        </main>
      </div>
    </section>
  );
}

export default NR1;