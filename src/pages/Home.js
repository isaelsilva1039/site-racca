import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Banner = styled.section`
  background: url(${props => props.bgImage}) no-repeat center center/contain;
  color: white;
  text-align: center;
  padding: 4rem;
  width: 100%; /* Full width of parent (App) */
  height: 100vh; /* Full height on desktop */
  margin: 0;
  position: relative;
  box-sizing: border-box; /* Include padding in dimensions */
  
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevent any overflow */

  @media (max-width: 1024px) {
    padding: 3rem;
    height: 80vh;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    height: 100%; /* Adjust height to image on mobile */
    min-height: 40vh;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    height: auto;
    min-height: 40vh;
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 3rem;
  border-radius: 10px;
  display: inline-block;
  width: auto;
  max-width: 90%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }
`;

const Button = styled.button`
  background-color: white;
  color: #a100ff;
  border: 2px solid #a100ff;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: #a100ff;
    color: white;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

function Home() {
  const images = [
    '/telemedicina1.png',
    '/telemedicina2.png',
    '/telemedicina3.png'
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Banner bgImage={images[currentImageIndex]}>
      {/* Uncomment and add content if needed */}
      {/* <Overlay>
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      </Overlay> */}
    </Banner>
  );
}

export default Home;