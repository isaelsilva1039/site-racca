import styled from 'styled-components';

const Banner = styled.section`
  background: 
    linear-gradient(rgba(161, 0, 255, 0.7), rgba(161, 0, 255, 0.7)), /* Gradiente roxo com transparência */
    url('/telemedicina.jpg') no-repeat center center/cover; /* Substitua pelo caminho correto da imagem */
  color: white;
  text-align: center;
  padding: 50px;
  min-height: 70vh; /* Define uma altura mínima maior */

  display: flex;
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Centraliza o conteúdo verticalmente */

  @media (max-width: 768px) {
    padding: 30px;
    min-height: 50vh; /* Altura menor em telas pequenas */
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5); /* Adiciona um overlay escuro */
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
          <Button>Veja Planos</Button>
          <Button>Saiba Mais</Button>
        </ButtonGroup>
      </Overlay>
    </Banner>
  );
}

export default Home;
