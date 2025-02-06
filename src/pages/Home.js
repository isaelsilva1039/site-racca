import styled from 'styled-components';

const Banner = styled.section`
  background: 
    linear-gradient(rgba(161, 0, 255, 0.7), rgba(161, 0, 255, 0.7)),
    url('/telemedicina.jpg') no-repeat center center/cover;
  color: white;
  text-align: center;
  padding: 50px;
  min-height: 70vh;
  
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 30px;
    min-height: 50vh;
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 50px;
  border-radius: 10px;
  display: inline-block;
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
      <Overlay>
        <h1>Racca Saúde</h1>
        <p>Terapia Online e Monitoramento</p>
        <ButtonGroup>
          {/* O botão foi transformado em link, direcionando para a âncora #plans */}
          <Button as="a" href="#plans" className="nav-link">
            Veja Planos
          </Button>
        </ButtonGroup>
      </Overlay>
    </Banner>
  );
}

export default Home;
