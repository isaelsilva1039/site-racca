// FAQModal.js
import React, { useState } from 'react';
import styled from 'styled-components';

// Ícones para expansão e recolhimento
const PlusIcon = () => <span style={{ fontWeight: 'bold' }}>+</span>;
const MinusIcon = () => <span style={{ fontWeight: 'bold' }}>−</span>;

// Estilização da sobreposição da modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

// Estilização do conteúdo da modal
const ModalContent = styled.div`
  background: #f9f9f9;
  max-width: 1000px;
  width: 100%;
  max-height: 90%;
  overflow-y: auto;
  border-radius: 15px;
  padding: 30px 40px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 20px 25px;
    max-width: 90%;
  }

  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

// Estilização do cabeçalho da modal
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h1 {
    font-size: 2rem;
    color: #4a148c;
    font-family: 'Arial', sans-serif;
  }

  button {
    background: none;
    border: none;
    font-size: 2rem;
    color: #4a148c;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #d500f9;
    }
  }
`;

// Estilização da descrição acima dos cards
const Description = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 1.75rem;
    color: #7e57c2;
    margin-bottom: 10px;
    font-family: 'Arial', sans-serif;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    text-align: justify;
    font-family: 'Arial', sans-serif;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.95rem;
    }
  }
`;

// Estilização da barra de pesquisa
const SearchBar = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 30px;
  border: 2px solid #d1c4e9;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #7e57c2;
  }

  ::placeholder {
    color: #7e57c2;
  }
`;

// Estilização dos cards de FAQ
const FAQCard = styled.div`
  background-color: #fff;
  border: 1px solid #ede7f6;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .question {
    background-color: #7e57c2;
    color: #fff;
    padding: 18px 20px;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s;

    &:hover {
      background-color: #5e35b1;
    }
  }

  .answer {
    padding: 20px;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    border-top: 1px solid #ede7f6;
    color: #555;
    text-align: justify;
    animation: fadeIn 0.3s ease-in-out;

    /* Estilização de listas */
    ul {
      list-style-type: disc;
      padding-left: 20px;
    }

    li {
      margin-bottom: 8px;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  }
`;

// Estilização para mensagem de nenhum resultado encontrado
const NoResult = styled.p`
  text-align: center;
  color: #9e9e9e;
  font-size: 1.1rem;
  margin-top: 40px;
`;

// Componente da Modal de FAQs
const FAQModal = ({ isOpen, onClose }) => {
  const [openCard, setOpenCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      question: 'O que é o RACCA SAÚDE?',
      answer: `
        O RACCA SAÚDE é uma empresa de tecnologia em saúde, não é um plano de saúde tradicional. 
        Foca na união de inteligência artificial (IA) com uma equipe multidisciplinar de saúde, 
        objetivando melhorar o cuidado com a saúde do cliente sem custos elevados. A empresa busca 
        resolver desafios da Saúde Suplementar, auxiliando na gestão e monitoramento da saúde dos 
        indivíduos para promover longevidade e qualidade de vida. Atua principalmente em:

        - Redução dos custos com saúde;
        - Aperfeiçoamento constante da saúde dos usuários;
        - Telemonitoramento, Telemedicina (diversos ramos) e Programas de Promoção da Saúde e Prevenção de Doenças.

        A sigla RACCA representa:
        Respeito, Amor, Carinho, Cuidado e Atenção.
      `,
    },
    {
      question: 'Quando posso começar a usar os benefícios do RACCA SAÚDE?',
      answer: `
        Após a compra e confirmação dos dados, o cliente pode acessar a central para consultas online com o clínico geral. 
        Também tem acesso à Central de Agendamento para sessões com Psicólogos.
      `,
    },
    {
      question: 'Quais serviços são oferecidos?',
      answer: `
        Os serviços inclusos na mensalidade abrangem:

        - Pronto atendimento médico 24h via telefone com enfermeiro(a);
        - Videoconsulta com clínico geral (limitadas);
        - Chat com profissionais da saúde;
        - Monitoramento especializado para condições como diabetes, pressão alta e obesidade;
        - Programa de reeducação alimentar;
        - Assistência social em casos graves de saúde;

        Benefícios adicionais envolvem:

        - Videoconsulta com especialistas e videoterapia por valores acessíveis;
        - Descontos em medicamentos em parceiros como Drogasil/Drogaraya;
        - Descontos variados em estabelecimentos pelo Brasil.
      `,
    },
    {
      question: 'Quanto custa a assinatura do RACCA SAÚDE?',
      answer: `
        Todos os planos estão disponíveis no site www.raccasaude.com.br/planos, porém os principais são:

        - O plano individual custa R$ 39,90 mensais.
        - Para o plano familiar, a partir de R$ 79,90 por mês, abrangendo dependentes como cônjuges, filhos, pais, irmãos, avós, sobrinhos e tios.
      `,
    },
    {
      question: 'Quem pode ser cadastrado como dependente?',
      answer: `
        É possível incluir cônjuges, filhos, pais, irmãos, avós, sobrinhos e tios.
      `,
    },
    {
      question: 'Quais medicamentos podem ser prescritos digitalmente?',
      answer: `
        Medicamentos que não necessitam de receita e medicamentos tarja vermelha que podem ou não precisar de receita, como antibióticos. 
        A decisão final cabe ao profissional de saúde.
      `,
    },
    {
      question: 'Quais atestados podem ser emitidos por teleconsulta?',
      answer: `
        São permitidos:
        - Afastamento do trabalho por motivos de doença (quando determinado pelo médico)
        - Atestado de comparecimento

        Não são permitidos:
        - Uso de piscina, aptidão física, prática esportiva, concursos, perícias
        - Atestar deficiência física (exceto com atestado anterior)
        - Medicina ocupacional
      `,
    },
    {
      question: 'Como funciona a receita digital?',
      answer: `
        A receita é emitida eletronicamente com assinatura digital pelo médico. O paciente recebe um SMS com um link, podendo também usar QR Code ou baixar em PDF. 
        Cada receita tem um código único identificador, garantindo sua validade e uso único, especialmente para medicamentos com retenção de receituário.
      `,
    },
    {
      question: 'O médico pode solicitar exames pela plataforma?',
      answer: `
        Sim, os médicos podem solicitar vários tipos de exames diretamente na plataforma ao final da consulta.
      `,
    },
    {
      question: 'Como garantem a qualidade dos profissionais de saúde?',
      answer: `
        Todos os nossos profissionais são cuidadosamente selecionados e têm sua documentação validada pelos respectivos Conselhos. 
        Qualquer dúvida pode ser esclarecida pelos canais de atendimento.
      `,
    },
    {
      question: 'Quais métodos de pagamento são aceitos?',
      answer: `
        Aceitamos pagamentos via cartão de crédito, PIX, boleto e Paypal.
      `,
    },
    {
      question: 'Os dados pessoais são protegidos?',
      answer: `
        Sim, a plataforma garante alto padrão de segurança de dados, criptografando todas as informações conforme a LGPD (Lei Geral de Proteção de Dados).
      `,
    },
    {
      question: 'É possível ter retorno no plantão?',
      answer: `
        Não, o plantão visa resolver questões específicas ou fornecer orientações médicas. Em casos de necessidade de retorno, recomenda-se agendamento conforme a Resolução nº 1.958/2010 do CFM.
      `,
    },
    {
      question: 'O que é telessaúde e telemedicina?',
      answer: `
        A telessaúde é um serviço de saúde a distância, aproveitando a tecnologia para realizar atendimentos não presenciais. 
        A telemedicina é uma subcategoria da telessaúde, focada em diagnóstico e tratamento a distância. 
        A teleconsulta é um tipo de telemedicina, que ocorre em tempo real, com comunicação direta entre paciente e profissional.
      `,
    },
    {
      question: 'Benefícios da telemedicina:',
      answer: `
        - Atendimento rápido e seguro;
        - Capacidade de lidar com grande volume de trabalho;
        - Mais segurança durante eventos como a pandemia de COVID-19;
        - Acompanhamento de saúde eficaz ao longo do tempo.
      `,
    },
    {
      question: 'Limitações da telessaúde:',
      answer: `
        - Não substitui consultas presenciais que necessitam de contato físico;
        - Nem todos os pacientes têm acesso às tecnologias adequadas;
        - Não é possível realizar exames a distância.
      `,
    },
    {
      question: 'A equipe de enfermagem pode fazer consultas?',
      answer: `
        Sim, a equipe de enfermagem pode realizar consultas e, se necessário e conforme protocolos institucionais, prescrever medicamentos ou exames. 
        Se a situação não puder ser resolvida digitalmente, a equipe encaminha o paciente para outros serviços ou especialistas médicos.
      `,
    },
    {
      question: 'Como agendar uma consulta online?',
      answer: `
        As consultas online são válidas tanto no SUS quanto em consultas particulares ou planos de saúde. 
        Basta verificar com seu médico ou plano de saúde se o atendimento por telemedicina está disponível. 
        Atualmente, a consulta por telemedicina pode ser realizada desde a primeira consulta, não apenas em emergências.
      `,
    },
    {
      question: 'Os médicos podem se registrar para oferecer consultas a distância? Como?',
      answer: `
        Sim, mas eles precisam usar plataformas que garantam a privacidade dos pacientes e cumprir requisitos como a certificação de segurança da SBIS, assinatura digital, entre outros. 
        Todas as regras podem ser encontradas no site do CFM.
      `,
    },
    {
      question: 'Como funciona a telemedicina no RACCA SAÚDE?',
      answer: `
        O RACCA SAÚDE utiliza a telemedicina para cuidados com a saúde. 
        Oferece uma equipe médica e de enfermagem 24 horas por dia, 7 dias por semana, focada na atenção primária e preventiva.
      `,
    },
    {
      question: 'Existe um custo adicional por consulta?',
      answer: `
        Não, o valor é fixo e cobrado mensalmente.
      `,
    },
    {
      question: 'Posso cancelar o plano?',
      answer: `
        O cancelamento poderá ser solicitado após o período de fidelidade.
      `,
    },
    {
      question: 'Existe um período de carência para usar o plano?',
      answer: `
        Não, o plano é liberado em até 7 dias para uso.
      `,
    },
    {
      question: 'Quantas consultas tenho disponíveis com um psicólogo?',
      answer: `
        São disponibilizadas 2 consultas de 45 minutos ao mês com o psicólogo.
      `,
    },
    {
      question: 'Terei acesso a todos os especialistas pelo valor do plano?',
      answer: `
        Sim, você terá acesso a todos os especialistas listados na descrição do plano.
      `,
    },
    {
      question: 'Como está a regulamentação da Telemedicina no Brasil?',
      answer: `
        A regulamentação da telemedicina sofreu várias mudanças, especialmente após o início da pandemia de COVID-19. Algumas resoluções relevantes são:

        - Resolução CFM 2.227/2018: Primeira tentativa de regulamentação, posteriormente revogada.
        - Resolução CFM 2.228/2020: Flexibilizou o atendimento médico à distância devido à pandemia.
        - Resolução CFM 2.314/2022: Autorizou e regulamentou o uso da telemedicina após o fim da Emergência em Saúde Pública de Importância Nacional.

        Outras informações sobre modalidades permitidas, prontuário eletrônico, consentimento, segurança e privacidade também são relevantes na regulamentação.
      `,
    },
  ];

  // Função para alternar a abertura dos cards
  const toggleCard = (index) => {
    setOpenCard(openCard === index ? null : index);
  };

  // Função para lidar com a pesquisa
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setOpenCard(null); // Fecha todos os cards abertos ao pesquisar
  };

  // Filtragem dos FAQs com base na pesquisa
  const filteredFAQ = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery) ||
      item.answer.toLowerCase().includes(searchQuery)
  );

  // Função para fechar a modal ao clicar na sobreposição
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log('Clique na sobreposição detectado');
      onClose();
    }
  };

  // Função para renderizar o conteúdo da resposta de forma segura
  const renderAnswer = (answer) => {
    const lines = answer.trim().split('\n').filter(line => line.trim() !== '');
    return lines.map((line, idx) => {
      if (line.startsWith('- ')) {
        return <li key={idx}>{line.substring(2).trim()}</li>;
      }
      return <p key={idx}>{line.trim()}</p>;
    });
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <h1>Perguntas Frequentes</h1>
          <button 
            onClick={() => { 
              console.log('Botão de fechar clicado'); 
              onClose(); 
            }} 
            aria-label="Fechar Modal"
          >
            ×
          </button>
        </ModalHeader>
        <SearchBar
          type="text"
          placeholder="Pesquise por palavras-chave..."
          value={searchQuery}
          onChange={handleSearch}
          aria-label="Barra de pesquisa"
        />
        <Description>
          <h2>Obtenha respostas para suas perguntas mais frequentes</h2>
          <p>
            Tire suas dúvidas rapidamente com nossa seção de Perguntas Frequentes. Aqui na Racca Saúde, queremos garantir que você tenha todas as informações necessárias para aproveitar ao máximo nossos serviços de telemedicina. Encontre respostas para as dúvidas mais comuns dos nossos pacientes e entenda melhor como funciona o atendimento online, os planos disponíveis, a segurança dos seus dados e muito mais.
          </p>
        </Description>
        {filteredFAQ.length > 0 ? (
          filteredFAQ.map((item, index) => (
            <FAQCard key={index} isOpen={openCard === index}>
              <div className="question" onClick={() => toggleCard(index)}>
                {item.question}
                {openCard === index ? <MinusIcon /> : <PlusIcon />}
              </div>
              <div className="answer">
                {item.answer.includes('- ') ? (
                  <ul>
                    {renderAnswer(item.answer)}
                  </ul>
                ) : (
                  renderAnswer(item.answer)
                )}
              </div>
            </FAQCard>
          ))
        ) : (
          <NoResult>Nenhum resultado encontrado para "{searchQuery}"</NoResult>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default FAQModal;
