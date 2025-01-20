const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ASAAS_ACCESS_TOKEN = process.env.ASAAS_ACCESS_TOKEN;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para buscar ou criar cliente
app.post('/api/customers', async (req, res) => {
  const { name, cpfCnpj, email, phone, address } = req.body;

  try {
    const sanitizedCpfCnpj = cpfCnpj.replace(/\D/g, '');
    console.log(`CPF/CNPJ Sanitizado: ${sanitizedCpfCnpj}`);

    if (![11, 14].includes(sanitizedCpfCnpj.length)) {
      return res.status(400).json({ message: 'CPF ou CNPJ inválido.' });
    }

    const searchResponse = await fetch(
      `https://www.asaas.com/api/v3/customers?cpfCnpj=${sanitizedCpfCnpj}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: ASAAS_ACCESS_TOKEN,
        },
      }
    );

    const searchStatus = searchResponse.status;
    const searchText = await searchResponse.text();
    console.log(`GET /customers?cpfCnpj=${sanitizedCpfCnpj} - Status: ${searchStatus} - Body: ${searchText}`);

    let searchData;
    try {
      searchData = searchText ? JSON.parse(searchText) : {};
    } catch (e) {
      console.error('Resposta não é JSON válida:', searchText);
      throw new Error('Resposta inválida do Asaas ao buscar cliente.');
    }

    if (searchData.data && searchData.data.length > 0) {
      console.log('Cliente já existe. Retornando customerId existente.');
      return res.json({ customerId: searchData.data[0].id });
    }

    const createResponse = await fetch('https://www.asaas.com/api/v3/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: ASAAS_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        name,
        cpfCnpj: sanitizedCpfCnpj,
        email: email || '',
        phone: phone || '',
        address: address || '',
      }),
    });

    const createStatus = createResponse.status;
    const createText = await createResponse.text();
    console.log(`POST /customers - Status: ${createStatus} - Body: ${createText}`);

    let createData;
    try {
      createData = createText ? JSON.parse(createText) : {};
    } catch (e) {
      console.error('Resposta não é JSON válida:', createText);
      throw new Error('Resposta inválida do Asaas ao criar cliente.');
    }

    if (createResponse.ok) {
      console.log('Cliente criado com sucesso.');
      return res.json({ customerId: createData.id });
    } else {
      console.error('Erro ao criar cliente:', createData.message);
      return res.status(createResponse.status).json({ message: createData.message || 'Erro ao criar cliente.' });
    }
  } catch (error) {
    console.error('Erro no backend ao gerenciar cliente:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Endpoint para processar pagamento
app.post('/api/payments', async (req, res) => {
  const paymentData = req.body;

  try {
    const paymentResponse = await fetch('https://www.asaas.com/api/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: ASAAS_ACCESS_TOKEN,
      },
      body: JSON.stringify(paymentData),
    });

    const paymentStatus = paymentResponse.status;
    const paymentText = await paymentResponse.text();
    console.log(`POST /payments - Status: ${paymentStatus} - Body: ${paymentText}`);

    let paymentResult;
    try {
      paymentResult = paymentText ? JSON.parse(paymentText) : {};
    } catch (e) {
      console.error('Resposta não é JSON válida:', paymentText);
      throw new Error('Resposta inválida do Asaas ao processar pagamento.');
    }

    if (paymentResponse.ok) {
      console.log('Pagamento processado com sucesso.');
      return res.json(paymentResult);
    } else {
      console.error('Erro ao processar pagamento:', paymentResult.message);
      return res.status(paymentResponse.status).json(paymentResult);
    }
  } catch (error) {
    console.error('Erro no backend ao processar pagamento:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

app.get('/api/payments/:id/identificationField', async (req, res) => {
  const paymentId = req.params.id;

  try {
    const response = await fetch(`https://www.asaas.com/api/v3/payments/${paymentId}/identificationField`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: ASAAS_ACCESS_TOKEN,
      },
    });

    const status = response.status;
    const text = await response.text();
    console.log(`GET /payments/${paymentId}/identificationField - Status: ${status} - Body: ${text}`);

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error('Resposta não é JSON válida:', text);
      throw new Error('Resposta inválida do Asaas ao buscar a linha digitável.');
    }

    if (response.ok) {
      console.log('Linha digitável recuperada com sucesso.');
      return res.json({ identificationField: data.identificationField });
    } else {
      console.error('Erro ao recuperar a linha digitável:', data.message);
      return res.status(response.status).json({ message: data.message || 'Erro ao recuperar a linha digitável.' });
    }
  } catch (error) {
    console.error('Erro no backend ao recuperar a linha digitável:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
