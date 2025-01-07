const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Verifica se a chave de API do Asaas está configurada
if (!process.env.ASAAS_API_KEY) {
  console.error('Erro: ASAAS_API_KEY não configurado no arquivo .env');
  process.exit(1); // Finaliza o servidor se a chave estiver ausente
}

// Configuração do Axios para o Asaas
const asaasClient = axios.create({
  baseURL: 'https://www.asaas.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
    access_token: process.env.ASAAS_API_KEY,
  },
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
  res.send('Backend do Racca Saúde está rodando com Asaas...');
});

// Rota para criar cliente no Asaas
app.post('/create_customer', async (req, res) => {
  const { name, email, cpfCnpj, phone } = req.body;

  if (!name || !email || !cpfCnpj || !phone) {
    return res.status(400).json({ error: 'Parâmetros ausentes ou inválidos' });
  }

  try {
    const response = await asaasClient.post('/customers', {
      name,
      email,
      cpfCnpj,
      phone,
    });

    logInfo(`Cliente criado com sucesso: ${JSON.stringify(response.data)}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao criar cliente:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Erro ao criar cliente',
    });
  }
});

// Rota para processar pagamento (Criação de cliente e cobrança)
app.post('/process_payment', async (req, res) => {
  const { payer, paymentMethod, paymentInfo, plan } = req.body;

  if (!payer || !paymentMethod || !plan) {
    return res.status(400).json({ error: 'Parâmetros ausentes ou inválidos' });
  }

  try {
    logInfo('Dados recebidos para processamento:', req.body);

    // Criação do cliente
    const customerResponse = await asaasClient.post('/customers', {
      name: payer.name,
      email: payer.email,
      cpfCnpj: payer.cpfCnpj,
      phone: payer.phone,
    });

    const customerId = customerResponse.data.id;

    // Configuração do tipo de cobrança
    let billingType;
    switch (paymentMethod) {
      case 'creditCard':
        billingType = 'CREDIT_CARD';
        break;
      case 'pix':
        billingType = 'PIX';
        break;
      case 'boleto':
        billingType = 'BOLETO';
        break;
      default:
        return res.status(400).json({ error: 'Método de pagamento inválido' });
    }

    // Configuração dos dados do pagamento
    const paymentData = {
      customer: customerId,
      billingType,
      value: plan.amount,
      dueDate: new Date().toISOString().split('T')[0],
      description: `Assinatura do plano ${plan.title}`,
    };

    if (paymentMethod === 'creditCard') {
      paymentData.creditCard = {
        holderName: paymentInfo.holderName,
        number: paymentInfo.cardNumber,
        expiryMonth: paymentInfo.expiryMonth,
        expiryYear: paymentInfo.expiryYear,
        ccv: paymentInfo.ccv,
      };
    }

    // Criação da cobrança
    const paymentResponse = await asaasClient.post('/payments', paymentData);

    logInfo(`Pagamento processado com sucesso: ${JSON.stringify(paymentResponse.data)}`);
    res.json(paymentResponse.data);
  } catch (error) {
    console.error('Erro ao processar pagamento:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Erro ao processar pagamento',
    });
  }
});

// Rota para estornos totais
app.post('/refund', async (req, res) => {
  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: 'O campo "paymentId" é obrigatório.' });
  }

  try {
    const response = await asaasClient.post(`/payments/${paymentId}/refund`);
    logInfo(`Estorno realizado com sucesso: ${JSON.stringify(response.data)}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao processar estorno:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Erro ao processar estorno',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
