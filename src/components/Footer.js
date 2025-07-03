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
      <p>Racca Saúde © 2025 - Todos os direitos reservados</p>
      <p>
        Responsável Técnico: Nathan Henrique Bovo dos Reis - CRP: 06/176856
      </p>
      <p>
        Razão Social: Racca Monitoramento e Gestão da Saúde Ltda - CNPJ: 50.633.829/0001-08
      </p>
      <p>Registro Conselho Regional de Psicologia: CRP-04/PJ-04176</p>
    </FooterContainer>
  );
}

export default Footer;