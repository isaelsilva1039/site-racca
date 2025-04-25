
import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUserCircle, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ConsultaContainer = styled.section`
  text-align: center;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  color: #333;
  padding: 50px 20px;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }

  @media (max-width: 480px) {
    padding: 20px 8px;
  }
`;

const Title = styled.h2`
  font-size: 5.5rem;
  margin-bottom: 40px;
  color: #a100ff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const FiltroContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  gap: 10px;

  label {
    font-size: 1.2rem;
    color: #333;
  }

  select {
    padding: 10px;
    font-size: 1.2rem;
    border-radius: 10px;
    border: 1px solid #a100ff;
    color: #333;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;

    label {
      font-size: 1rem;
    }

    select {
      font-size: 1rem;
      padding: 8px;
      max-width: 200px;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;

    label {
      font-size: 0.9rem;
    }

    select {
      font-size: 0.9rem;
      padding: 6px;
    }
  }
`;

const GridContainer = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const PsicologoGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding: 0 10px;
  overflow-x: auto;
  scrollbar-width: thick;
  scrollbar-color: #a100ff #e6d6ff;

  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #e6d6ff;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #a100ff;
    border-radius: 6px;
    border: 2px solid #e6d6ff;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #8a00e6;
  }

  @media (max-width: 768px) {
    gap: 20px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  @media (max-width: 480px) {
    gap: 15px;
    padding: 0 5px;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(161, 0, 255, 0.8);
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background 0.3s ease;
  z-index: 10;

  &:hover {
    background: #8a00e6;
  }

  &:first-child {
    left: 0;
  }

  &:last-child {
    right: 0;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;

    &:first-child {
      left: 5px;
    }

    &:last-child {
      right: 5px;
    }
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 1rem;

    &:first-child {
      left: 5px;
    }

    &:last-child {
      right: 5px;
    }
  }
`;

const PsicologoCard = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  color: #333;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
  min-width: 400px;
  max-width: 400px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeInUp} 1s ease-out ${({ delay }) => delay || '0s'} forwards;
  background: linear-gradient(145deg, #ffffff, #f0f0f5);
  border: 2px solid ${({ classificacao }) => (classificacao === 'Ouro' ? '#FFD700' : '#C0C0C0')};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: 300px;
    max-width: 320px;
    padding: 15px;
    scroll-snap-align: start;
  }

  @media (max-width: 480px) {
    min-width: 260px;
    max-width: 280px;
    padding: 12px;
  }
`;

const PsicologoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 10px;
  }
`;

const PsicologoFoto = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(145deg, #e6d6ff, #d6eaff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #a100ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 2rem;
  }
`;

const PsicologoInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 1.3rem;
    margin: 0;
    color: #333;
    font-weight: bold;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin: 2px 0;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 0.75rem;
    }
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;

  @media (max-width: 480px) {
    gap: 6px;
    margin: 8px 0;
  }
`;

const Tag = styled.span`
  background: #e6d6ff;
  color: #a100ff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  text-transform: capitalize;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
`;

const Abordagem = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin: 10px 0;
  font-weight: bold;

  span {
    font-weight: normal;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: 8px 0;
  }
`;

const Publico = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 10px 0;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: 8px 0;
  }
`;

const SobreMim = styled.div`
  margin: 10px 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;

  strong {
    color: #333;
    display: block;
    margin-bottom: 5px;
  }

  .texto {
    display: -webkit-box;
    -webkit-line-clamp: ${({ expandido }) => (expandido ? 'unset' : '7')};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.4;

    .texto {
      -webkit-line-clamp: ${({ expandido }) => (expandido ? 'unset' : '5')};
    }
  }
`;

const VerMaisButton = styled.button`
  background: none;
  border: none;
  color: #a100ff;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 5px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.3s ease;

  &:hover {
    color: #8a00e6;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ConsultarButton = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 10px;
  background: #a100ff;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  display: block;
  margin: 10px auto;

  &:hover {
    background: #8a00e6;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-width: 180px;
    font-size: 1rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    max-width: 160px;
    font-size: 0.9rem;
    padding: 7px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
    max-width: 600px;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 12px;
    max-height: 85vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #a100ff;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    top: 8px;
    right: 8px;
  }
`;

const ModalTitle = styled.h3`
  font-size: 2rem;
  color: #a100ff;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
`;

const CalendarioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 15px;
  }
`;

const MesAno = styled.h4`
  font-size: 1.2rem;
  color: #333;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const NavegacaoButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #a100ff;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #8a00e6;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DiasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-bottom: 12px;
  }
`;

const DiaCard = styled.div`
  background: ${(props) => (props.disponivel ? '#ffffff' : '#f0f0f0')};
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  cursor: ${(props) => (props.disponivel ? 'pointer' : 'not-allowed')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${(props) =>
    props.disponivel &&
    `
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
  `}

  ${(props) =>
    props.selecionado &&
    `
    background: #a100ff;
    color: #ffffff;
  `}

  p {
    margin: 0;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 8px;

    p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    padding: 6px;

    p {
      font-size: 0.8rem;
    }
  }
`;

const HorariosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    margin-bottom: 12px;
  }
`;

const HorarioButton = styled.button`
  background: #ffffff;
  border: 1px solid #a100ff;
  border-radius: 10px;
  padding: 8px 15px;
  font-size: 0.9rem;
  color: #a100ff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #a100ff;
    color: #ffffff;
  }

  ${(props) =>
    props.selecionado &&
    `
    background: #a100ff;
    color: #ffffff;
  `}

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.75rem;
  }
`;

const ConfirmarButton = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 10px;
  background: #a100ff;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  display: block;
  margin: 10px auto;

  &:hover {
    background: #8a00e6;
    transform: scale(1.05);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    max-width: 180px;
    padding: 8px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    max-width: 160px;
    padding: 7px;
    font-size: 0.9rem;
  }
`;

const ConsultaAvulsa = () => {
  const [filtroArea, setFiltroArea] = useState('todos');
  const [selectedPsicologo, setSelectedPsicologo] = useState(null);
  const [selectedDia, setSelectedDia] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [expandedSobreMim, setExpandedSobreMim] = useState({});
  const [mesAtual, setMesAtual] = useState(4); // Mês inicial: abril (1-12)
  const [anoAtual, setAnoAtual] = useState(2025); // Ano inicial: 2025
  const gridRef = useRef(null);

  const psicologos = [
    {
      id: 1,
      nome: 'Fábio da Silva Ferreira',
      crp: '04/70777',
      preco: 30,
      areas: ['adolescência', 'casais', 'depressão', 'ansiedade', 'identidade'],
      abordagem: 'Terapia Cognitivo Comportamental - TCC',
      publico: 'Adolescentes, Adultos, Casais, Idosos',
      sobreMim:
        'Psicólogo clínico especialista em TCC, terapia cognitiva comportamental. Intervenção em crise de Ansiedade; Tratamento da Depressão; Problemas conjugais; Relacionamentos tóxicos; Dependência emocional; Abuso psicológico; Crises de Pânico; Traumas e Luto; Transtornos de Personalidade; Bipolar; Borderline; Obsessivo Compulsivo; TDAH; Crises Dependentes Químicas; Suicídio; Luto; Perdas e Morte; Transtorno de Automutilação; Suicídio; Prevenção ao Suicídio (diagnóstico e tratamento). Intervenções Mentais, e pacientes, dificuldades de relacionamento interpessoal. Auxílio no processo de evolução pessoal em busca da reestruturação cognitiva, autoestima e autoconhecimento. Priorizo identificar e modificar pensamentos disfuncionais, cognitives distorcidas e alterar padrões destrutivos e desencadeadores de comportamentos causadores de sofrimento psíquico. Disponho de um processo terapêutico eficaz, com ética, sigilo, confiança e sem julgamentos.',
      disponibilidade: {
        '2025-04': {
          1: ['09:00', '10:00', '14:00'],
          3: ['11:00', '15:00'],
          4: ['09:00', '13:00', '16:00'],
        },
        '2025-05': {
          5: ['10:00', '14:00'],
          6: ['09:00', '11:00'],
        },
      },
      classificacao: 'Ouro',
    },
    {
      id: 2,
      nome: 'Igor Leonardo da Silva Pinheiro',
      crp: '17/7389',
      preco: 30,
      areas: ['abuso infantil', 'adolescência', 'ansiedade', 'bullying', 'depressão', 'LGBTQIA+', 'relacionamento'],
      abordagem: 'Psicologia Transpessoal',
      publico: 'Adolescentes, Adultos',
      sobreMim:
        'Psicólogo com foco em Psicologia Transpessoal, atuo com adolescentes e adultos, especialmente em questões de abuso infantil, bullying e identidade de gênero. Trabalho com ansiedade, depressão e relacionamentos, promovendo o autoconhecimento e a expansão da consciência. Meu objetivo é ajudar os pacientes a encontrarem um sentido maior em suas vidas, superando traumas e desafios emocionais com uma abordagem integrativa e acolhedora.',
      disponibilidade: {
        '2025-04': {
          2: ['10:00', '14:00'],
          5: ['09:00', '11:00', '15:00'],
        },
        '2025-05': {
          7: ['10:00', '14:00'],
          8: ['09:00', '13:00'],
        },
      },
      classificacao: 'Prata',
    },
    {
      id: 3,
      nome: 'Mariana Oliveira',
      crp: '05/12345',
      preco: 40,
      areas: ['ansiedade', 'depressão', 'estresse', 'carreira'],
      abordagem: 'Terapia Cognitivo Comportamental - TCC',
      publico: 'Adultos, Idosos',
      sobreMim:
        'Psicóloga clínica com especialização em TCC, atuo com adultos e idosos enfrentando ansiedade, depressão e estresse, especialmente em questões relacionadas à carreira. Ajudo meus pacientes a desenvolverem estratégias práticas para lidar com pressões do dia a dia, promovendo equilíbrio emocional e bem-estar. Minha abordagem é focada em resultados, com ênfase em técnicas baseadas em evidências.',
      disponibilidade: {
        '2025-04': {
          6: ['09:00', '11:00'],
          7: ['14:00', '16:00'],
        },
        '2025-05': {
          9: ['10:00', '14:00'],
          10: ['09:00', '15:00'],
        },
      },
      classificacao: 'Ouro',
    },
    {
      id: 4,
      nome: 'Clara Souza',
      crp: '06/54321',
      preco: 35,
      areas: ['relacionamento', 'autoestima', 'ansiedade', 'depressão'],
      abordagem: 'Psicoterapia Humanista',
      publico: 'Adolescentes, Adultos',
      sobreMim:
        'Psicóloga humanista, trabalho com adolescentes e adultos que buscam melhorar seus relacionamentos e autoestima. Atuo em casos de ansiedade e depressão, oferecendo um espaço seguro para o autoconhecimento e o desenvolvimento pessoal. Minha abordagem valoriza a experiência única de cada indivíduo, promovendo aceitação e crescimento emocional.',
      disponibilidade: {
        '2025-04': {
          8: ['10:00', '15:00'],
          9: ['09:00', '13:00'],
        },
        '2025-05': {
          11: ['10:00', '14:00'],
          12: ['09:00', '15:00'],
        },
      },
      classificacao: 'Prata',
    },
    {
      id: 5,
      nome: 'Lucas Almeida',
      crp: '07/98765',
      preco: 50,
      areas: ['trauma', 'ansiedade', 'depressão', 'luto'],
      abordagem: 'EMDR',
      publico: 'Adultos, Idosos',
      sobreMim:
        'Psicólogo especializado em EMDR, atuo com adultos e idosos que enfrentam traumas, luto, ansiedade e depressão. Utilizo técnicas avançadas para ajudar na reprocessamento de experiências traumáticas, promovendo alívio emocional e recuperação. Meu trabalho é focado em criar um ambiente seguro e acolhedor para que os pacientes possam superar suas dificuldades.',
      disponibilidade: {
        '2025-04': {
          10: ['11:00', '14:00'],
          11: ['09:00', '16:00'],
        },
        '2025-05': {
          13: ['10:00', '14:00'],
          14: ['09:00', '15:00'],
        },
      },
      classificacao: 'Ouro',
    },
    {
      id: 6,
      nome: 'Beatriz Lima',
      crp: '08/45678',
      preco: 45,
      areas: ['adolescência', 'bullying', 'autoestima', 'ansiedade'],
      abordagem: 'Terapia Cognitivo Comportamental - TCC',
      publico: 'Adolescentes',
      sobreMim:
        'Psicóloga clínica com foco em adolescentes, utilizo a TCC para tratar questões como bullying, ansiedade e baixa autoestima. Meu objetivo é ajudar jovens a desenvolverem resiliência emocional e habilidades para enfrentar os desafios da adolescência. Trabalho com empatia e acolhimento, criando um espaço seguro para o crescimento pessoal.',
      disponibilidade: {
        '2025-04': {
          12: ['09:00', '10:00'],
          13: ['14:00', '15:00'],
        },
        '2025-05': {
          15: ['10:00', '14:00'],
          16: ['09:00', '15:00'],
        },
      },
      classificacao: 'Prata',
    },
    {
      id: 7,
      nome: 'Rafael Costa',
      crp: '09/11223',
      preco: 30,
      areas: ['casais', 'relacionamento', 'conflitos familiares'],
      abordagem: 'Terapia Sistêmica',
      publico: 'Casais, Adultos',
      sobreMim:
        'Psicólogo especializado em Terapia Sistêmica, atuo com casais e adultos que enfrentam conflitos familiares e dificuldades nos relacionamentos. Meu trabalho foca em compreender as dinâmicas familiares e promover uma comunicação mais saudável entre os envolvidos. Ofereço um espaço de escuta e reflexão para construir relações mais harmoniosas.',
      disponibilidade: {
        '2025-04': {
          14: ['10:00', '11:00'],
          15: ['13:00', '16:00'],
        },
        '2025-05': {
          17: ['10:00', '14:00'],
          18: ['09:00', '15:00'],
        },
      },
      classificacao: 'Prata',
    },
    {
      id: 8,
      nome: 'Sofia Mendes',
      crp: '10/33445',
      preco: 40,
      areas: ['LGBTQIA+', 'identidade', 'depressão', 'ansiedade'],
      abordagem: 'Psicologia Analítica',
      publico: 'Adolescentes, Adultos',
      sobreMim:
        'Psicóloga com abordagem em Psicologia Analítica, atuo com adolescentes e adultos, especialmente da comunidade LGBTQIA+, em questões de identidade, depressão e ansiedade. Meu trabalho é focado em explorar o inconsciente e promover o autoconhecimento, ajudando os pacientes a encontrarem equilíbrio e autenticidade em suas vidas.',
      disponibilidade: {
        '2025-04': {
          16: ['09:00', '14:00'],
          17: ['10:00', '15:00'],
        },
        '2025-05': {
          19: ['10:00', '14:00'],
          20: ['09:00', '15:00'],
        },
      },
      classificacao: 'Ouro',
    },
    {
      id: 9,
      nome: 'Pedro Henrique',
      crp: '11/55667',
      preco: 35,
      areas: ['carreira', 'estresse', 'ansiedade', 'depressão'],
      abordagem: 'Terapia Cognitivo Comportamental - TCC',
      publico: 'Adultos',
      sobreMim:
        'Psicólogo clínico com especialização em TCC, atuo com adultos que enfrentam estresse, ansiedade e depressão relacionados à carreira. Ajudo meus pacientes a desenvolverem estratégias para lidar com pressões profissionais e encontrar um equilíbrio entre vida pessoal e trabalho. Minha abordagem é prática e focada em resultados.',
      disponibilidade: {
        '2025-04': {
          18: ['11:00', '13:00'],
          19: ['09:00', '16:00'],
        },
        '2025-05': {
          21: ['10:00', '14:00'],
          22: ['09:00', '15:00'],
        },
      },
      classificacao: 'Prata',
    },
    {
      id: 10,
      nome: 'Ana Clara Ribeiro',
      crp: '12/77889',
      preco: 50,
      areas: ['trauma', 'luto', 'ansiedade', 'depressão'],
      abordagem: 'Psicoterapia Psicanalítica',
      publico: 'Adultos, Idosos',
      sobreMim:
        'Psicóloga com formação em Psicoterapia Psicanalítica, atuo com adultos e idosos que enfrentam traumas, luto, ansiedade e depressão. Meu trabalho é focado em explorar os processos inconscientes que influenciam o comportamento e as emoções, promovendo autoconhecimento e transformação pessoal em um ambiente acolhedor e seguro.',
      disponibilidade: {
        '2025-04': {
          20: ['10:00', '14:00'],
          21: ['09:00', '15:00'],
        },
        '2025-05': {
          23: ['10:00', '14:00'],
          24: ['09:00', '15:00'],
        },
      },
      classificacao: 'Prata',
    },
  ];

  const todasAreas = [
    'todos',
    ...new Set(
      psicologos.flatMap((psicologo) => psicologo.areas)
    ),
  ];

  const psicologosFiltrados = filtroArea === 'todos'
    ? psicologos
    : psicologos.filter((psicologo) =>
        psicologo.areas.includes(filtroArea)
      );

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasNoMes = (mes, ano) => {
    return new Date(ano, mes, 0).getDate();
  };

  const dias = Array.from({ length: diasNoMes(mesAtual, anoAtual) }, (_, i) => {
    const dia = i + 1;
    const chaveMesAno = `${anoAtual}-${String(mesAtual).padStart(2, '0')}`;
    const disponibilidadeMes = selectedPsicologo?.disponibilidade[chaveMesAno] || {};
    return {
      dia,
      disponivel: disponibilidadeMes[dia] !== undefined,
    };
  });

  const horarios = selectedDia
    ? (selectedPsicologo?.disponibilidade[`${anoAtual}-${String(mesAtual).padStart(2, '0')}`]?.[selectedDia] || [])
    : [];

  const handleConsultarClick = (psicologo) => {
    if (psicologo.classificacao === 'Prata') {
      const mensagem = `Olá, gostaria de agendar uma consulta com o psicólogo ${psicologo.nome} (CRP: ${psicologo.crp}).`;
      const url = `https://wa.me/5537999137500?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
    } else {
      setSelectedPsicologo(psicologo);
      setSelectedDia(null);
      setSelectedHorario(null);
      setMesAtual(4);
      setAnoAtual(2025);
    }
  };

  const handleDiaClick = (dia) => {
    if (dia.disponivel) {
      setSelectedDia(dia.dia);
      setSelectedHorario(null);
    }
  };

  const handleHorarioClick = (horario) => {
    setSelectedHorario(horario);
  };

  const handleConfirmar = () => {
    if (selectedDia && selectedHorario && selectedPsicologo.classificacao === 'Ouro') {
      const mensagem = `Olá, gostaria de agendar uma consulta com o psicólogo ${selectedPsicologo.nome} (CRP: ${selectedPsicologo.crp}) no dia ${selectedDia} de ${meses[mesAtual - 1]} de ${anoAtual} às ${selectedHorario}.`;
      const url = `https://wa.me/5537999137500?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
      setSelectedPsicologo(null);
    }
  };

  const toggleExpandSobreMim = (id) => {
    setExpandedSobreMim((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrevMes = () => {
    setSelectedDia(null);
    setSelectedHorario(null);
    if (mesAtual === 1) {
      setMesAtual(12);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  };

  const handleNextMes = () => {
    setSelectedDia(null);
    setSelectedHorario(null);
    if (mesAtual === 12) {
      setMesAtual(1);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  };

  const scrollLeft = () => {
    if (gridRef.current) {
      const scrollAmount = window.innerWidth <= 480 ? -280 : window.innerWidth <= 768 ? -320 : -400;
      gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      const scrollAmount = window.innerWidth <= 480 ? 280 : window.innerWidth <= 768 ? 320 : 400;
      gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <ConsultaContainer>
      <Title>Consulta Avulsa</Title>
      <FiltroContainer>
        <label>Filtrar por área:</label>
        <select
          value={filtroArea}
          onChange={(e) => setFiltroArea(e.target.value)}
        >
          {todasAreas.map((area) => (
            <option key={area} value={area}>
              {area.charAt(0).toUpperCase() + area.slice(1)}
            </option>
          ))}
        </select>
      </FiltroContainer>
      <GridContainer>
        <NavButton onClick={scrollLeft}>
          <FaChevronLeft />
        </NavButton>
        <PsicologoGrid ref={gridRef}>
          {psicologosFiltrados.map((psicologo, index) => (
            <PsicologoCard
              key={psicologo.id}
              delay={`${0.2 * (index + 1)}s`}
              classificacao={psicologo.classificacao}
            >
              <PsicologoHeader>
                <PsicologoFoto>
                  <FaUserCircle />
                </PsicologoFoto>
                <PsicologoInfo>
                  <h3>{psicologo.nome}</h3>
                  <p>Psicólogo</p>
                  <p>CRP: {psicologo.crp}</p>
                  <p>Valor da consulta: R${psicologo.preco}</p>
                </PsicologoInfo>
              </PsicologoHeader>
              <TagsContainer>
                {psicologo.areas.map((area) => (
                  <Tag key={area}>{area}</Tag>
                ))}
              </TagsContainer>
              <Abordagem>
                Abordagem: <span>{psicologo.abordagem}</span>
              </Abordagem>
              <Publico>👥 {psicologo.publico}</Publico>
              <SobreMim expandido={expandedSobreMim[psicologo.id]}>
                <strong>Sobre mim:</strong>
                <div className="texto">{psicologo.sobreMim}</div>
                {psicologo.sobreMim.split('\n').length > 7 && (
                  <VerMaisButton onClick={() => toggleExpandSobreMim(psicologo.id)}>
                    {expandedSobreMim[psicologo.id] ? 'Ver menos' : 'Ver mais'}
                  </VerMaisButton>
                )}
              </SobreMim>
              <ConsultarButton onClick={() => handleConsultarClick(psicologo)}>
                Quero me consultar
              </ConsultarButton>
            </PsicologoCard>
          ))}
        </PsicologoGrid>
        <NavButton onClick={scrollRight}>
          <FaChevronRight />
        </NavButton>
      </GridContainer>

      {selectedPsicologo && selectedPsicologo.classificacao === 'Ouro' && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setSelectedPsicologo(null)}>
              <FaTimes />
            </CloseButton>
            <ModalTitle>Agendar com {selectedPsicologo.nome}</ModalTitle>
            <CalendarioHeader>
              <NavegacaoButton onClick={handlePrevMes}>
                <FaChevronLeft />
              </NavegacaoButton>
              <MesAno>{meses[mesAtual - 1]} {anoAtual}</MesAno>
              <NavegacaoButton onClick={handleNextMes}>
                <FaChevronRight />
              </NavegacaoButton>
            </CalendarioHeader>
            <h4>Selecione o Dia</h4>
            <DiasGrid>
              {dias.map((dia) => (
                <DiaCard
                  key={dia.dia}
                  disponivel={dia.disponivel}
                  selecionado={selectedDia === dia.dia}
                  onClick={() => handleDiaClick(dia)}
                >
                  <p>{dia.dia}</p>
                </DiaCard>
              ))}
            </DiasGrid>
            {selectedDia && (
              <>
                <h4>Selecione o Horário</h4>
                <HorariosGrid>
                  {horarios.length > 0 ? (
                    horarios.map((horario) => (
                      <HorarioButton
                        key={horario}
                        selecionado={selectedHorario === horario}
                        onClick={() => handleHorarioClick(horario)}
                      >
                        {horario}
                      </HorarioButton>
                    ))
                  ) : (
                    <p>Nenhum horário disponível para este dia.</p>
                  )}
                </HorariosGrid>
                <ConfirmarButton
                  disabled={!selectedHorario}
                  onClick={handleConfirmar}
                >
                  Confirmar Agendamento
                </ConfirmarButton>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </ConsultaContainer>
  );
};

export default ConsultaAvulsa;
