import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const OdontoContainer = styled.section`
  padding: 80px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #eaf4ff 0%, #ffffff 100%);
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  color: #a100ff;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  max-width: 900px;
  margin-bottom: 40px;
  line-height: 1.6;
  animation: ${fadeIn} 1.2s ease-out;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

const FAQSection = styled.div`
  max-width: 900px;
  width: 100%;
  margin-bottom: 40px;
`;

const FAQTitle = styled.h3`
  font-size: 1.8rem;
  color: #a100ff;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
  animation: ${fadeIn} 1.4s ease-out;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FAQItem = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1.6s ease-out;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const FAQQuestion = styled.h4`
  font-size: 1.3rem;
  color: #a100ff;
  margin-bottom: 10px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FAQAnswer = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const WhatsAppButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 12px 30px;
  background: linear-gradient(90deg, #a100ff, #7b00cc);
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.3s ease, transform 0.3s ease;
  animation: ${fadeIn} 1.8s ease-out;

  &:hover {
    background: linear-gradient(90deg, #7b00cc, #a100ff);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 50px;
  padding: 12px 30px;
  background: linear-gradient(90deg, #a100ff, #7b00cc);
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.3s ease, transform 0.3s ease;
  animation: ${fadeIn} 1.8s ease-out;

  &:hover {
    background: linear-gradient(90deg, #7b00cc, #a100ff);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1rem;
  }
`;

function PlanoOdontoEmpresarial() {
  return (
    <OdontoContainer>
      <Title>Plano Odonto Empresarial</Title>
      <Description>
        Os cuidados com a saúde bucal podem prevenir diversas doenças, além de manter os dentes mais fortes e bonitos, impactando na autoestima e na qualidade de vida de uma pessoa. Com os planos odontológicos, os beneficiários têm acesso facilitado a cirurgias, dentística, odontologia estética, endodontia, exames clínicos e radiológicos, periodontia e emergências.
      </Description>

      <FAQSection>
        <FAQTitle>Dúvidas Frequentes sobre os Planos Odontológicos da Unimed Odonto</FAQTitle>

        <FAQItem>
          <FAQQuestion>Qual a carência do plano odontológico Unimed Odonto? É possível contratar um plano sem carência?</FAQQuestion>
          <FAQAnswer>
            A carência do plano odontológico Unimed pode variar de acordo com o tipo de plano e cobertura escolhidos. Geralmente, os planos possuem carência de 24 horas para urgência e emergência, 30 dias para consultas e procedimentos simples, e 180 dias para procedimentos mais complexos, como tratamentos de canal e próteses. Verifique a tabela de carências específica do plano desejado.
          </FAQAnswer>
        </FAQItem>

        <FAQItem>
          <FAQQuestion>Quais procedimentos o plano odontológico cobre?</FAQQuestion>
          <FAQAnswer>
            O plano oferece cobertura para consultas de rotina, limpeza, profilaxia, tratamento de cáries, restaurações, tratamento de gengivite e periodontite, tratamento de canal, extrações, radiografias, odontopediatria, ortodontia, próteses e cirurgias bucais. A cobertura exata depende do plano contratado, então consulte as cláusulas contratuais.
          </FAQAnswer>
        </FAQItem>

        <FAQItem>
          <FAQQuestion>Quem pode contratar o plano odontológico Unimed?</FAQQuestion>
          <FAQAnswer>
            O plano pode ser contratado por pessoas físicas para si e dependentes, ou por empresas como benefício aos funcionários. Parcerias com associações e entidades de classe também estão disponíveis. Verifique as opções na sua região.
          </FAQAnswer>
        </FAQItem>
      </FAQSection>

      <WhatsAppButton
        href="https://wa.me/5537999137500"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contrate Agora: (37) 99913-7500
      </WhatsAppButton>

      <BackButton to="/">Voltar</BackButton>
    </OdontoContainer>
  );
}

export default PlanoOdontoEmpresarial;