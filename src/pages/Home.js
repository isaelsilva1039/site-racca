import styled from 'styled-components';

const Banner = styled.section`
  background: linear-gradient(to right, #a100ff, #7d00cc); /* Gradiente com cores principais */
  color: white;
  text-align: center;
  padding: 50px;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Button = styled.button`
  background-color: white;
  color: #a100ff;
  border: 2px solid #a100ff;
  padding: 10px 25px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #a100ff;
    color: white;
  }
`;

function Home() {
  return (
    <Banner>
      <h1>Racca Saúde</h1>
      <p>Terapia Online e Monitoramento</p>
      <ButtonGroup>
        <Button>Veja Planos</Button>
        <Button>Saiba Mais</Button>
      </ButtonGroup>
    </Banner>
  );
}

export default Home;
