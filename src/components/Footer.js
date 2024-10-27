import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #a100ff;
  color: white;
  padding: 20px;
  text-align: center;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>Racca Saúde © 2024 - Todos os direitos reservados</p>
    </FooterContainer>
  );
}

export default Footer;
