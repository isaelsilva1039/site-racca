import React from 'react';
import './WhatsAppButton.css';
import { WhatsApp } from '@mui/icons-material'; // Ícone do WhatsApp

function WhatsAppButton() {
  const handleClick = () => {
    // Redireciona para o WhatsApp (adicione o número desejado)
    window.open('https://wa.me/5537999137500', '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <WhatsApp className="whatsapp-icon" />
    </div>
  );
}

export default WhatsAppButton;
