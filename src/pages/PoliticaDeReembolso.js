import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Estilização com styled-components
const StyledPolicy = styled.div`
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

const PoliticaDeReembolso = () => {
  const navigate = useNavigate();

  // Função para voltar à página anterior
  const handleBackClick = () => {
    console.log('Botão Voltar clicado'); // Log para debug
    navigate(-1); // Volta para a página anterior
  };

  return (
    <StyledPolicy>
      {/* Botão Voltar destacado */}


      <h1>Política de Reembolso</h1>

      <section>
        <h2>1. Direito de Arrependimento</h2>
        <p>
          Os usuários têm o direito de cancelar a contratação de qualquer serviço, incluindo consultas com clínicos gerais, médicos especialistas e psicólogos, dentro de 7 (sete) dias corridos após a contratação, com direito a reembolso integral, conforme previsto pelo Código de Defesa do Consumidor.
        </p>
      </section>

      <section>
        <h2>2. Cancelamento e Reembolso</h2>
        <p>
          Dentro do prazo estabelecido por lei, qual seja, 7 (sete) dias corridos, o direito ao arrependimento poderá ser exercido, oportunidade em qual a Racca Saúde dispõe de 30 dias úteis para efetuar o reembolso integral da importância paga a título de valor do plano contratado.
        </p>
      </section>

      <section>
        <h2>3. Exceções</h2>
        <p>
          Não serão concedidos reembolsos sob nenhuma hipótese em casos de não comparecimento à consulta agendada sem prévio aviso ou quando os serviços contratados tiverem sido parciais ou totalmente prestados. Além disso, consultas iniciadas, mas não concluídas por questões técnicas não imputáveis à Racca Saúde, não são elegíveis para o reembolso.
        </p>
      </section>
      <button className="back-button" onClick={handleBackClick}>
        Voltar
      </button>
      <footer className="footer-note">
        <p>© {new Date().getFullYear()} Racca Saúde. Todos os direitos reservados.</p>
      </footer>
    </StyledPolicy>
  );
};

export default PoliticaDeReembolso;