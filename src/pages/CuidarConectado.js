import React from 'react';
import styled from 'styled-components';
import { FaUserCheck, FaChartLine, FaQuestionCircle } from 'react-icons/fa';
import { 
  ArrowRightAlt,
  Smartphone,
  MedicalServices,
  Campaign,
  PushPin
} from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Para o botão Voltar

const CuidarConectadoContainer = styled.section`
  padding: 50px;
  text-align: center;
  background-color: #eaf4ff;
  color: #333;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #a100ff;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #a100ff;
  margin: 20px 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto 15px auto;
  max-width: 800px;
  text-align: left;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #666;
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  &:before {
    content: '✔';
    color: #a100ff;
    font-size: 1rem;
  }
`;

const IconText = styled.span`
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: #a100ff;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #a100ff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7b00cc;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const WhatsAppLink = styled.a`
  color: #a100ff;
  font-weight: bold;
  text-decoration: underline;
  font-size: 1rem;

  &:hover {
    color: #7b00cc;
  }
`;

function CuidarConectado() {
  return (
    <CuidarConectadoContainer>
      <Title>Programa Cuidar Conectado – RACCA Saúde</Title>
      
      <Text>
        O Cuidar Conectado é um programa inovador da RACCA Saúde que utiliza tecnologia digital para oferecer um atendimento integrado, humanizado e personalizado. Seu objetivo é garantir acesso ágil e contínuo à saúde, unindo telemedicina, terapia online e acompanhamento preventivo, sem a necessidade de deslocamento.
        <br />
        <strong>Foco:</strong> Conveniência, qualidade de vida e diagnóstico precoce.
      </Text>

      <SectionTitle><FaUserCheck /> Principais Recursos do Programa</SectionTitle>
      <Text><IconText><ArrowRightAlt /></IconText> <strong>Linha de Cuidado Personalizada:</strong></Text>
      <List>
        <ListItem>Avaliação de saúde inicial com check-up e questionário.</ListItem>
        <ListItem>Plano individual com orientações sobre bem-estar e prevenção.</ListItem>
        <ListItem>Monitoramento contínuo de doenças crônicas e lembretes de consultas.</ListItem>
      </List>
      <Text><IconText><ArrowRightAlt /></IconText> <strong>Educação e Suporte Multidisciplinar:</strong></Text>
      <List>
        <ListItem>Aulas, workshops e campanhas de saúde.</ListItem>
        <ListItem>Equipe de médicos, nutricionistas, psicólogos e enfermeiros.</ListItem>
        <ListItem>Suporte para tabagismo, estresse e bem-estar emocional.</ListItem>
      </List>
      <Text><IconText><ArrowRightAlt /></IconText> <strong>Ferramentas Digitais:</strong></Text>
      <List>
        <ListItem><IconText><Smartphone /></IconText> <strong>Aplicativo e Painel de Gestão:</strong> Histórico médico digital e monitoramento de indicadores de saúde, lembretes automáticos e comunicação com especialistas.</ListItem>
        <ListItem><IconText><MedicalServices /></IconText> <strong>Telemedicina e Atendimento Online:</strong> Consultas médicas e psicológicas remotas, canal de suporte rápido para dúvidas.</ListItem>
        <ListItem><IconText><Campaign /></IconText> <strong>Campanhas de Saúde Personalizadas:</strong> Notificações e conteúdos educativos periódicos.</ListItem>
      </List>

      <SectionTitle><FaChartLine /> Impacto e Benefícios</SectionTitle>
      <List>
        <ListItem><strong>Indicadores de Engajamento:</strong> Crescimento no número de participantes e consultas realizadas.</ListItem>
        <ListItem><strong>Indicadores de Saúde:</strong> Redução de doenças crônicas e melhora nos exames dos pacientes.</ListItem>
        <ListItem><strong>Indicadores Financeiros:</strong> Economia com prevenção e fidelização dos clientes.</ListItem>
      </List>

      <SectionTitle><FaQuestionCircle /> Perguntas para Avaliação Contínua</SectionTitle>
      <List>
        <ListItem><IconText><PushPin /></IconText> <strong>No início:</strong> Avaliação de hábitos de saúde e presença de doenças crônicas.</ListItem>
        <ListItem><IconText><PushPin /></IconText> <strong>Durante o programa:</strong> Engajamento com o plano de cuidado e percepção de melhorias.</ListItem>
        <ListItem><IconText><PushPin /></IconText> <strong>Pesquisa de satisfação:</strong> Eficiência do atendimento e recomendação do programa.</ListItem>
      </List>

      <Text>
        Quer saber mais ou participar do programa?{' '}
        <WhatsAppLink href="https://chat.whatsapp.com/D7kpOgdXaSxIjz1m6GZce5" target="_blank" rel="noopener noreferrer">
          Clique aqui para entrar no nosso grupo do WhatsApp!
        </WhatsAppLink>
      </Text>

      <BackButton to="/">Voltar</BackButton>
    </CuidarConectadoContainer>
  );
}

export default CuidarConectado;