import { useEffect } from 'react';
import styled from 'styled-components';

const SealContainer = styled.div`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  #ra-verified-seal > div {
    transform: scale(1.3);
    transform-origin: center;
  }
`;

const RaVerifiedSeal = () => {
  useEffect(() => {
    if (!document.getElementById('ra-embed-verified-seal')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'ra-embed-verified-seal';
      script.src = 'https://s3.amazonaws.com/raichu-beta/ra-verified/bundle.js';
      script.setAttribute('data-id', 'RmxUQWxXTF9kbG9yX1ZPYjpyYWNjYS1zYXVkZQ==');
      script.setAttribute('data-target', 'ra-verified-seal');
      script.setAttribute('data-model', '2');
      document.getElementById('ra-verified-seal')?.appendChild(script);
    }
  }, []);

  return (
    <SealContainer>
      <div id="ra-verified-seal" />
    </SealContainer>
  );
};

export default RaVerifiedSeal;
