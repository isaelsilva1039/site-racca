import styled from 'styled-components';

const Banner = styled.section`
  background: linear-gradient(to right, #9f00ff, #ff00ff);
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
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Button = styled.button`
  background-color: #dfff00;
  border: none;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #bfff00;
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
