import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams } from 'react-router-dom';

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

const CalendarioContainer = styled.div`
  text-align: center;
  background: linear-gradient(135deg, #eaf4ff 0%, #d6eaff 100%);
  color: #333;
  padding: 50px 20px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 30px 10px;
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
`;

const DiasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 30px;
`;

const DiaCard = styled.div`
  background: ${(props) => (props.disponivel ? '#ffffff' : '#f0f0f0')};
  border-radius: 10px;
  padding: 15px;
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
    font-size: 1.1rem;
  }
`;

const HorariosContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HorariosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const HorarioButton = styled.button`
  background: #ffffff;
  border: 1px solid #a100ff;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1rem;
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
`;

const ConfirmarButton = styled.button`
  margin-top: 20px;
  padding: 10px 30px;
  background: #a100ff;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #8a00e6;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const Calendario = () => {
  const { id } = useParams(); // Pega o ID do psicólogo da URL
  const [selectedDia, setSelectedDia] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [dias, setDias] = useState([]);
  const [horarios, setHorarios] = useState([]);

  // Simulação de dados de disponibilidade (você pode substituir por uma chamada à API)
  useEffect(() => {
    // Exemplo: dias disponíveis em abril de 2025
    const diasDisponiveis = [
      { dia: 1, disponivel: true },
      { dia: 2, disponivel: false },
      { dia: 3, disponivel: true },
      { dia: 4, disponivel: true },
      { dia: 5, disponivel: false },
      { dia: 6, disponivel: true },
      { dia: 7, disponivel: true },
      // Preencha até o dia 30 para um mês completo
    ];

    // Preenche o mês com dias até 30
    const diasCompletos = Array.from({ length: 30 }, (_, i) => {
      const diaExistente = diasDisponiveis.find((d) => d.dia === i + 1);
      return diaExistente || { dia: i + 1, disponivel: false };
    });

    setDias(diasCompletos);

    // Simulação de horários disponíveis para cada dia
    const horariosPorDia = {
      1: ['09:00', '10:00', '14:00'],
      3: ['11:00', '15:00'],
      4: ['09:00', '13:00', '16:00'],
      6: ['10:00', '14:00'],
      7: ['09:00', '11:00', '15:00'],
    };

    if (selectedDia) {
      setHorarios(horariosPorDia[selectedDia] || []);
    } else {
      setHorarios([]);
    }
  }, [selectedDia]);

  const handleDiaClick = (dia) => {
    if (dia.disponivel) {
      setSelectedDia(dia.dia);
      setSelectedHorario(null); // Reseta o horário ao mudar o dia
    }
  };

  const handleHorarioClick = (horario) => {
    setSelectedHorario(horario);
  };

  const handleConfirmar = () => {
    if (selectedDia && selectedHorario) {
      alert(
        `Agendamento confirmado com o psicólogo ${id} no dia ${selectedDia} de abril de 2025 às ${selectedHorario}!`
      );
      // Aqui você pode enviar os dados para uma API para salvar o agendamento
    }
  };

  return (
    <CalendarioContainer>
      <Title>Escolha o Dia e Horário</Title>
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
        <HorariosContainer>
          <h3>Horários Disponíveis para o Dia {selectedDia}</h3>
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
        </HorariosContainer>
      )}
    </CalendarioContainer>
  );
};

export default Calendario;