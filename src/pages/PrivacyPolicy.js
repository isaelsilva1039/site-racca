import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';

const PrivacyContainer = styled.div`
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  line-height: 1.8;
  font-family: 'Poppins', Arial, sans-serif; /* Tipografia moderna */
  color: #2d2d2d;
  background: linear-gradient(135deg, #f9f9f9, #ffffff); /* Gradiente sutil no fundo */
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Sombra leve */
  margin-top: 20px;
  margin-bottom: 20px;

  h1 {
    color: #a100ff;
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.5rem; /* Tamanho maior */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  h2 {
    color: #a100ff;
    margin-top: 30px;
    font-size: 1.5rem;
    font-weight: 600;
    border-bottom: 2px solid #a100ff; /* Linha decorativa */
    padding-bottom: 5px;
    display: inline-block;
  }

  p {
    margin: 15px 0;
    text-align: justify;
    font-size: 1.1rem;
    color: #444;
  }

  ul {
    margin: 15px 0 25px 30px;
    list-style-type: disc;
  }

  li {
    margin-bottom: 10px;
    font-size: 1.05rem;
    color: #555;
  }

  .footer-note {
    font-size: 0.95rem;
    text-align: center;
    margin-top: 40px;
    color: #777;
    font-style: italic;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }

  .back-button {
    display: block;
    width: 200px; /* Largura fixa para destaque */
    margin: 0 auto 40px auto; /* Centralizado e com mais espaço */
    padding: 12px 0;
    background-color: #a100ff;
    color: white;
    border: none;
    border-radius: 50px; /* Bordas arredondadas modernas */
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    box-shadow: 0 4px 15px rgba(161, 0, 255, 0.3); /* Sombra roxa suave */
    transition: all 0.3s ease;

    &:hover {
      background-color: #7d00cc;
      transform: translateY(-2px); /* Efeito de elevação */
      box-shadow: 0 6px 20px rgba(161, 0, 255, 0.4);
    }

    &:active {
      transform: translateY(0); /* Volta ao normal ao clicar */
      box-shadow: 0 2px 10px rgba(161, 0, 255, 0.2);
    }
  }
`;

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <PrivacyContainer>
      <button className="back-button" onClick={() => navigate(-1)}>
        Voltar
      </button>
      <h1>Política de Privacidade</h1>
      <p>
        <h2>1. Preâmbulo</h2>
        <br />
        1.1. A RACCA MONITORAMENTO E GESTÃO DA SAUDE LTDA (“RACCA”), CNPJ:
        50.633.829/0001-08, com sede na Rua Fortuna n. 40, Bairro Industrial,
        Divinópolis/MG, está comprometida em garantir a conformidade de suas
        atividades ao que dispõe a Lei Federal nº 13.709/2018 (“Lei Geral de
        Proteção de Dados Pessoais” ou “LGPD”). Por isso, convidamos você a
        conhecer a nossa Política de Privacidade.
      </p>
      <p>
        1.2. Dessa forma, o intuito dessa Política de Privacidade (“Política”)
        é demonstrar a você, profissional da saúde, beneficiário, clínica e/ou
        empresa que utiliza a nossa plataforma ou que venha utilizá-la, nossa
        preocupação com a sua privacidade e segurança, além de informá-lo(a)
        com transparência sobre como utilizamos e protegemos suas informações e
        sobre como você poderá exercer os seus direitos.
      </p>
      <p>
        1.3. Ao se cadastrar em nossa plataforma e/ou ao utilizar os nossos
        produtos ou serviços, você declara estar ciente das previsões desta
        Política.
      </p>
      <p>
        1.4. Caso não esteja de acordo com os termos definidos, você não poderá
        utilizar nossos serviços e, caso já seja usuário, poderá solicitar a
        exclusão da sua conta nos canais indicados mais adiante.
      </p>
      <p>
        1.5. A presente Política está dividida em duas seções: A partir do
        tópico 1, você encontrará informações sobre como realizamos o
        tratamento de Dados Pessoais de nossos clientes (profissionais de
        saúde). A partir do tópico 9, você encontrará informações sobre como
        realizamos o tratamento de Dados Pessoais de pacientes. Portanto, caso
        você seja um paciente com prontuário médico armazenado no sistema da
        Racca Saúde, consulte o tópico 9 dessa Política.
      </p>
      <h2>2. Identificação do Agente de Tratamento</h2>
      <p>
        2.1. Em relação ao tratamento dos dados pessoais dos representantes de
        nossos clientes (clínicas, profissionais da saúde e empresas
        contratantes), a RACCA SAÚDE será considerada Controladora de dados
        pessoais.
      </p>
      <p>
        2.2. De acordo com a LGPD, é considerado um Controlador de dados
        pessoais a pessoa natural ou jurídica, de direito público ou privado, a
        quem competem as decisões referentes ao tratamento de dados pessoais.
      </p>
      <h2>3. Dados Pessoais Tratados</h2>
      <p>
        3.1. A RACCA SAÚDE, quando Controladora dos dados pessoais, poderá
        coletar os seguintes dados pessoais e/ou dados pessoais sensíveis para
        a correta e adequada prestação de serviços:
      </p>
      <ul>
        <li>
          3.1.1. Dados Cadastrais: Nome, e-mail, telefone celular, profissão,
          área de atuação.
        </li>
        <li>
          3.1.2. Dados Comportamentais: dados de navegação em aplicações
          digitais (“cookies”), geolocalização e perfil comportamental de
          clientes, criado a partir de suas preferências de consumo.
        </li>
      </ul>
      <h2>4. Finalidades de Tratamento</h2>
      <p>
        4.1. A RACCA SAÚDE poderá tratar os dados pessoais coletados junto à
        profissional da saúde, clínica e/ou empresa que utiliza a nossa
        plataforma ou que venha utilizá-la, para as seguintes finalidades:
      </p>
      <ul>
        <li>
          4.1.1. Para que possamos entrar em contato com você, quando solicitado
          através do “Entre em Contato – Fale com a gente” disponível no nosso
          site.
        </li>
        <li>
          4.1.2. Para que possamos iniciar uma conversa com você, quando
          solicitado através do ícone do WhatsApp disponível em nosso site.
        </li>
        <li>
          4.1.3. Suporte a dúvidas e problemas relacionados ao uso dos serviços
          fornecidos pela RACCA SAÚDE.
        </li>
        <li>
          4.1.4. Oferecer produtos e serviços personalizados que melhor
          correspondam às necessidades e preferências de nossos parceiros e
          potenciais clientes.
        </li>
      </ul>
      <h2>5. Bases Legais de Tratamento</h2>
      <p>
        5.1. A LGPD nos permite realizar atividades de tratamento de dados
        pessoais para as finalidades acima descritas com fundamento em
        diferentes bases legais. Em alguns casos, o seu consentimento será
        imprescindível para a nossa atividade. Em outras situações, poderemos
        utilizar seus dados pessoais sem que seja necessário solicitarmos sua
        autorização.
      </p>
      <ul>
        <li>5.2.1. Consentimento livre, informado, inequívoco e para finalidades específicas;</li>
        <li>5.2.2. Cumprimento de obrigações legais;</li>
        <li>5.2.3. Execução de contrato ou medidas preliminares;</li>
        <li>5.2.4. Interesse legítimo, desde que respeite os direitos do titular;</li>
      </ul>
      <h2>6. Com Quem Compartilhamos Seus Dados Pessoais</h2>
      <p>
        6.1. Podemos compartilhar seus dados pessoais com autoridades, parceiros
        e outros agentes conforme necessário para prestação de serviços ou
        cumprimento de obrigações legais.
      </p>
      <p className="footer-note">
        Última atualização: 31 de janeiro de 2024.
      </p>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;