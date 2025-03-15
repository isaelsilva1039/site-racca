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

const SegurosContainer = styled.section`
  padding: 20px 20px;
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
  margin-bottom: 10px;
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
  margin-bottom:40px;
  line-height: 1.6;
  animation: ${fadeIn} 1.2s ease-out;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
`;

const SegurosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  padding: 0 0px;
`;

const SeguroCard = styled.div`
  background: #fff;
  border-radius: 15px;
  margin-top:0px;
  padding:0 0  10px;
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
    padding: 15px;
  }
`;

const SeguroTitle = styled.h3`
  font-size: 1.6rem;
  color: #a100ff;
  margin-bottom: 1px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const SeguroText = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SeguroImage = styled.img`
  width: 100%;
  max-width: 250px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 10px;
  transition: transform 0.3s ease;

  ${SeguroCard}:hover & {
    transform: scale(1.05);
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 50px;
  padding: 10px 30px;
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

function SegurosPessoais() {
  return (
    <SegurosContainer>
      <Title>Seguros Pessoais</Title>
      <Subtitle>Proteção e tranquilidade para você aproveitar o melhor da vida.</Subtitle>

      <SegurosGrid>
        <SeguroCard>
          <SeguroTitle>Previdência Privada</SeguroTitle>
          <SeguroText>
            Uma aposentadoria independente do INSS, com contribuições personalizáveis. O valor recebido é proporcional ao investido, com opção de resgate se desistir.
          </SeguroText>
          <SeguroImage src="/img/previdencia-privada.jpg" alt="Previdência Privada" />
        </SeguroCard>

        <SeguroCard>
          <SeguroTitle>Seguro Bike</SeguroTitle>
          <SeguroText>
            Proteção para bicicletas de alto valor contra danos, furtos e roubos, incluindo cobertura para o ciclista e terceiros em acidentes.
          </SeguroText>
          <SeguroImage src="/img/seguro-bike.jpg" alt="Seguro Bike" />
        </SeguroCard>

        <SeguroCard>
          <SeguroTitle>Seguro de Equipamentos</SeguroTitle>
          <SeguroText>
            Cobertura 24h para smartphones, notebooks e câmeras contra furtos, roubos e quedas, válida no Brasil e no exterior.
          </SeguroText>
          <SeguroImage src="/img/seguro-equipamentos.jpg" alt="Seguro de Equipamentos" />
        </SeguroCard>

        <SeguroCard>
          <SeguroTitle>Seguro de Vida</SeguroTitle>
          <SeguroText>
            Proteção financeira para você e sua família, com indenização em casos de morte, acidentes ou doenças.
          </SeguroText>
          <SeguroImage src="/img/seguro-vida.jpg" alt="Seguro de Vida" />
        </SeguroCard>

        <SeguroCard>
          <SeguroTitle>Seguro de Automóvel</SeguroTitle>
          <SeguroText>
            Em parceria com Bravim Conecta e Aratu Seguros, oferece cobertura para roubos, panes, colisões e assistência 24h com reboque e carro reserva.
          </SeguroText>
          <SeguroImage src="/img/seguro-automovel.jpg" alt="Seguro de Automóvel" />
        </SeguroCard>

        <SeguroCard>
          <SeguroTitle>Seguro Residencial</SeguroTitle>
          <SeguroText>
            Protege casas e apartamentos contra desastres naturais, roubos e panes, com assistência 24h para reparos domésticos.
          </SeguroText>
          <SeguroImage src="/img/seguro-residencial.jpg" alt="Seguro Residencial" />
        </SeguroCard>

        <SeguroCard>
          <SeguroTitle>Seguro Pet</SeguroTitle>
          <SeguroText>
            Com Dr. Pet, cobre consultas, emergências e cirurgias para cães e gatos, disponível em 1.400 clínicas credenciadas no Brasil.
          </SeguroText>
          <SeguroImage src="/img/seguro-pet.jpg" alt="Seguro Pet" />
        </SeguroCard>

        <SeguroCard>
          <SeguroTitle>Seguro Viagem</SeguroTitle>
          <SeguroText>
            Tranquilidade em viagens com proteção médica, odontológica e assistência para voos atrasados ou extravio de bagagem.
          </SeguroText>
          <SeguroImage src="/img/seguro-viagem.jpg" alt="Seguro Viagem" />
        </SeguroCard>
      </SegurosGrid>

      <BackButton to="/">Voltar</BackButton>
    </SegurosContainer>
  );
}

export default SegurosPessoais;