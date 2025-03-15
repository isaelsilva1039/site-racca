import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { keyframes } from 'styled-components';
import {
  LocalHospital, // Clínico Geral
  Spa, // Dermatologia
  Psychology, // Neurologia
  ChildCare, // Pediatria
  Female, // Ginecologia
  Favorite, // Cardiologia
  Bloodtype, // Endocrinologia
  AccessibilityNew, // Ortopedia
  SentimentVerySatisfied, // Psicologia
  Restaurant, // Nutrição
} from '@mui/icons-material';

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

const EspecialidadesContainer = styled.section`
  padding: 80px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #eaf4ff 0%, #ffffff 100%);
  color: #333;
  overflow: hidden;
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

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #555;
  text-align: center;
  max-width: 900px;
  margin-bottom: 60px;
  line-height: 1.6;
  animation: ${fadeIn} 1.2s ease-out;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
`;

const EspecialidadesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
`;

const EspecialidadeCard = styled.div`
  background: #fff;
  border-radius: 15px;
  padding: 30px; /* Aumentado para acomodar ícones maiores */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 1.5s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const EspecialidadeIcon = styled.div`
  color: #a100ff;
  font-size: 9rem; /* Aumentado de 4rem para 6rem */
  margin-bottom: 0px;
  transition: transform 0.3s ease;

  ${EspecialidadeCard}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 4.5rem; /* Aumentado de 3rem para 4.5rem */
  }
`;

const EspecialidadeTitle = styled.h3`
  font-size: 1.6rem;
  color: #a100ff;
  margin-bottom: 0px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const EspecialidadeText = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 0.9rem;
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

function Especialidades() {
  return (
    <EspecialidadesContainer>
      <Title>Especialidades</Title>
      <Subtitle>Nossa equipe de especialistas está pronta para cuidar da sua saúde em diversas áreas.</Subtitle>

      <EspecialidadesGrid>
        <EspecialidadeCard>
          <EspecialidadeIcon as={LocalHospital} />
          <EspecialidadeTitle>Clínico Geral</EspecialidadeTitle>
          <EspecialidadeText>Atendimento primário para diversas condições de saúde.</EspecialidadeText>
        </EspecialidadeCard>

        <EspecialidadeCard>
          <EspecialidadeIcon as={Spa} />
          <EspecialidadeTitle>Dermatologia</EspecialidadeTitle>
          <EspecialidadeText>Cuidados com a pele, cabelos e unhas.</EspecialidadeText>
        </EspecialidadeCard>

        <EspecialidadeCard>
          <EspecialidadeIcon as={Psychology} />
          <EspecialidadeTitle>Neurologia</EspecialidadeTitle>
          <EspecialidadeText>Diagnóstico e tratamento de distúrbios do sistema nervoso.</EspecialidadeText>
        </EspecialidadeCard>

        <EspecialidadeCard>
          <EspecialidadeIcon as={ChildCare} />
          <EspecialidadeTitle>Pediatria</EspecialidadeTitle>
          <EspecialidadeText>Cuidados médicos para crianças e adolescentes.</EspecialidadeText>
        </EspecialidadeCard>

        <EspecialidadeCard>
          <EspecialidadeIcon as={Female} />
          <EspecialidadeTitle>Ginecologia</EspecialidadeTitle>
          <EspecialidadeText>Saúde feminina e acompanhamento preventivo.</EspecialidadeText>
        </EspecialidadeCard>

        <EspecialidadeCard>
          <EspecialidadeIcon as={Favorite} />
          <EspecialidadeTitle>Cardiologia</EspecialidadeTitle>
          <EspecialidadeText>Tratamento de doenças do coração e sistema circulatório.</EspecialidadeText>
        </EspecialidadeCard>

        <EspecialidadeCard>
          <EspecialidadeIcon as={Bloodtype} />
          <EspecialidadeTitle>Endocrinologia</EspecialidadeTitle>
          <EspecialidadeText>Distúrbios hormonais e metabólicos.</EspecialidadeText>
        </EspecialidadeCard>

        <EspecialidadeCard>
          <EspecialidadeIcon as={AccessibilityNew} />
          <EspecialidadeTitle>Ortopedia</EspecialidadeTitle>
          <EspecialidadeText>Cuidados com o sistema musculoesquelético.</EspecialidadeText>
        </EspecialidadeCard>

        <EspecialidadeCard>
          <EspecialidadeIcon as={SentimentVerySatisfied} />
          <EspecialidadeTitle>Psicologia</EspecialidadeTitle>
          <EspecialidadeText>Apoio emocional e terapias para saúde mental.</EspecialidadeText>
        </EspecialidadeCard>

        <EspecialidadeCard>
          <EspecialidadeIcon as={Restaurant} />
          <EspecialidadeTitle>Nutrição</EspecialidadeTitle>
          <EspecialidadeText>Orientação alimentar e dietética.</EspecialidadeText>
        </EspecialidadeCard>
      </EspecialidadesGrid>

      <BackButton to="/">Voltar</BackButton>
    </EspecialidadesContainer>
  );
}

export default Especialidades;