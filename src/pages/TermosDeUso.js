import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledTerms = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.8;
  font-family: Arial, sans-serif;
  color: #333;

  h1 {
    color: #a100ff;
    text-align: center;
    margin-bottom: 20px;
  }

  h2 {
    color: #a100ff;
    margin-top: 20px;
  }

  p {
    margin: 10px 0;
    text-align: justify;
  }

  ul {
    margin: 10px 0 20px 20px;
    list-style-type: disc;
  }

  li {
    margin-bottom: 5px;
  }

  .footer-note {
    font-size: 0.9rem;
    text-align: center;
    margin-top: 20px;
    color: #666;
  }

  .back-button {
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #a100ff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #7d00cc;
    }
  }
`;

const TermosDeUso = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <StyledTerms>
      <button className="back-button" onClick={handleBackClick}>Voltar</button>

      <h1>Termos de Uso</h1>

      <section>
        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e usar os serviços da Racca Saúde, você concorda em cumprir estes Termos de Uso, todas as leis e
          regulamentos aplicáveis, incluindo, sem limitação, a aceitação da nossa prática de consultas com clínicos gerais,
          médicos especialistas e psicólogos, conforme descrito nestes Termos.
        </p>
      </section>

      <section>
        <h2>2. Descrição do Serviço</h2>
        <p>
          A Racca Saúde oferece uma plataforma de telemedicina que facilita o acesso a consultas à distância com clínicos gerais,
          médicos especialistas em diversas áreas e psicólogos. Estes serviços são destinados a proporcionar avaliações,
          diagnósticos e acompanhamentos médicos ou psicológicos, conforme o caso, utilizando tecnologias de comunicação para
          realizar consultas de maneira remota.
        </p>
        <p>
          É importante ressaltar que os serviços de telemedicina oferecidos pela Racca Saúde são complementares e não substituem
          completamente o atendimento médico presencial, especialmente em situações de emergência ou quando o profissional de saúde
          assim determinar.
        </p>
      </section>

      <section>
        <h2>3. Privacidade e Proteção de Dados</h2>
        <p>
          A política de privacidade da Racca Saúde é rigorosa e alinhada com a Lei Geral de Proteção de Dados Pessoais (LGPD).
          Nós garantimos a confidencialidade de todas as informações fornecidas pelos usuários e asseguramos que os dados serão
          utilizados exclusivamente para os fins de prestação dos serviços de saúde à distância, incluindo consultas médicas e
          psicológicas, respeitando sempre os mais altos padrões de segurança da informação.
        </p>
      </section>

      <section>
        <h2>4. Direitos Autorais e Propriedade Intelectual</h2>
        <p>
          Os usuários devem respeitar os direitos autorais e a propriedade intelectual da Racca Saúde e de seus colaboradores.
          Isso inclui, mas não se limita a, conteúdos gerados durante as consultas, materiais educativos fornecidos pela plataforma
          e qualquer outro material protegido por leis de direitos autorais.
        </p>
      </section>

      <footer className="footer-note">
        <p>&copy; {new Date().getFullYear()} Racca Saúde. Todos os direitos reservados.</p>
      </footer>
    </StyledTerms>
  );
};

export default TermosDeUso;
