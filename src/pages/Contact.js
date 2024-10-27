import styled from 'styled-components';
import { useState } from 'react';

const ContactContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #a100ff;
  padding: 20px;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #9f00ff;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  height: 100px;
  font-size: 16px;

  &:focus {
    border-color: #9f00ff;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #dfff00;
  border: none;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #bfff00;
  }
`;

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <ContactContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Entre em Contato</h2>
        <Input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
        <TextArea name="message" placeholder="Mensagem" value={formData.message} onChange={handleChange} required />
        <Button type="submit">Enviar</Button>
      </Form>
    </ContactContainer>
  );
}

export default Contact;
