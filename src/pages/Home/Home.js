import './Home.css';
import { useState, useEffect } from 'react';

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

    // Atualiza dinamicamente a classe do banner com a imagem atual
    const bannerElement = document.querySelector('.banner');
    if (bannerElement) {
      bannerElement.style.backgroundImage = `url(${images[currentImageIndex]})`;
    }

    return () => clearInterval(interval);
  }, [images.length, currentImageIndex]);

  return (
    <section className={`banner dynamic-bg`}>
      {/* Overlay com conteúdo */}

 
    </section>
  );
}

export default Home;