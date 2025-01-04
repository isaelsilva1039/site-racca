const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { MercadoPagoConfig, Payment, Preferences, Refund } = require('mercadopago');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Verifica se o token de acesso está configurado
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  console.error('Erro: MERCADOPAGO_ACCESS_TOKEN não configurado no arquivo .env');
  process.exit(1); // Finaliza o servidor se o token estiver ausente
}

// Configuração do cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' })); // Permite apenas o frontend local
app.use(bodyParser.json());

// Função para logar informações
const logInfo = (message) => {
  console.log(`${new Date().toISOString()} - ${message}`);
};

// Rota padrão
app.get('/', (req, res) => {
  res.send('Backend do Racca Saúde está rodando...');
});

// Rota para criar preferência de pagamento
app.post('/create_preference', async (req, res) => {
  const { title, quantity, unit_price, description, category_id } = req.body;

  if (!title || !quantity || !unit_price) {
    return res.status(400).json({ error: 'Parâmetros ausentes ou inválidos' });
  }

  const preference = {
    items: [
      {
        id: `item_${Date.now()}`,
        title,
        description,
        quantity,
        unit_price,
        currency_id: 'BRL',
        category_id,
      },
    ],
    external_reference: `order_${Date.now()}`, // Identificador único
    notification_url: `${process.env.NOTIFICATION_URL}/webhook`, // URL para Webhook
  };

  try {
    const preferences = new Preferences(client);
    const response = await preferences.create(preference);

    logInfo(`Preferência criada com sucesso: ${response.body.id}`);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(error.status || 500).json({ error: error.message || 'Erro ao criar preferência de pagamento' });
  }
});

// Rota para processar pagamento
app.post('/process_payment', async (req, res) => {
  const payment = new Payment(client);

  try {
    const { transaction_amount, payment_method_id, payer, items } = req.body;

    // Validações
    if (!transaction_amount || !payment_method_id || !payer || !items) {
      return res.status(400).json({ error: 'Parâmetros ausentes ou inválidos' });
    }
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'O campo "items" deve ser um array válido.' });
    }

    items.forEach((item, index) => {
      if (!item.title || typeof item.title !== 'string') {
        throw new Error(`O item na posição ${index} deve conter o campo "title" válido.`);
      }
      if (!item.unit_price || typeof item.unit_price !== 'number') {
        throw new Error(`O item na posição ${index} deve conter o campo "unit_price" válido.`);
      }
    });

    const response = await payment.create({
      body: {
        transaction_amount,
        payment_method_id,
        payer: {
          email: payer.email,
          first_name: payer.first_name,
          last_name: payer.last_name,
          identification: payer.identification,
          address: payer.address,
        },
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          category_id: item.category_id,
        })),
        external_reference: `order_${Date.now()}`,
        binary_mode: true, // Aprovação binária
        statement_descriptor: "RACCA SAUDE", // Descrição na fatura do cartão
      },
    });

    logInfo(`Pagamento processado com sucesso: ${JSON.stringify(response.body)}`);
    res.json({
      id: response.body.id,
      status: response.body.status,
      detail: response.body.status_detail,
    });
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);

    res.status(error.status || 500).json({
      error: error.message || 'Erro ao processar pagamento',
      details: error.cause || [],
    });
  }
});

// Rota para Webhook
app.post('/webhook', async (req, res) => {
  try {
    logInfo(`Webhook recebido: ${JSON.stringify(req.body)}`);

    const { id, type } = req.body;

    switch (type) {
      case 'payment':
        const payment = new Payment(client);
        const response = await payment.get(id);
        logInfo(`Pagamento recebido no Webhook: ${JSON.stringify(response.body)}`);

        if (response.body.status === 'approved' && response.body.status_detail === 'accredited') {
          logInfo('Pagamento aprovado com sucesso. Atualizar status no sistema interno.');
        }

        break;

      case 'merchant_order':
        logInfo(`Merchant order recebida: ${id}`);
        break;

      default:
        logInfo(`Tipo de notificação não tratado: ${type}`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Erro no Webhook:', error);
    res.status(500).send('Erro no Webhook');
  }
});

// Rota para estornos totais
app.post('/refund', async (req, res) => {
  try {
    const { payment_id } = req.body;
    if (!payment_id) {
      return res.status(400).json({ error: 'O campo "payment_id" é obrigatório.' });
    }

    const refund = new Refund(client);
    const response = await refund.create(payment_id);

    logInfo(`Estorno realizado com sucesso: ${JSON.stringify(response.body)}`);
    res.json(response.body);
  } catch (error) {
    console.error('Erro ao processar estorno:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Erro ao processar estorno',
      details: error.cause || [],
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
