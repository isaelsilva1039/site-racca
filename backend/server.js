const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mercadopago = require('mercadopago');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do Mercado Pago
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  console.error('Erro: MERCADOPAGO_ACCESS_TOKEN não configurado no .env');
  process.exit(1); // Finaliza o servidor se o token estiver ausente
}
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' })); // Permite apenas o frontend local
app.use(bodyParser.json());

// Rota padrão
app.get('/', (req, res) => {
  res.send('Backend do Racca Saúde está rodando...');
});

// Rota para criar preferência de pagamento
app.post('/create_preference', async (req, res) => {
  const { title, quantity, unit_price } = req.body;

  if (!title || !quantity || !unit_price) {
    return res.status(400).json({ error: 'Parâmetros ausentes ou inválidos' });
  }

  const preference = {
    items: [
      {
        title,
        quantity,
        unit_price,
        currency_id: 'BRL',
      },
    ],
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
  }
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
