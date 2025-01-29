/**
 * Obtém ou cria um cliente na plataforma ASAAS
 */
export const getOrCreateCustomer = async ({
  baseUrl,
  accessToken,
  name,
  cpfCnpj,
  email,
  phone,
  address,
  onSuccess,
  onError,
}) => {
  const sanitizedCpfCnpj = cpfCnpj.replace(/\D/g, '');

  if (![11, 14].includes(sanitizedCpfCnpj.length)) {
    onError('CPF ou CNPJ inválido.');
    return;
  }

  try {
    // Tenta buscar o cliente
    const searchResponse = await fetch(
      `${baseUrl}/customers?cpfCnpj=${sanitizedCpfCnpj}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: accessToken,
        },
      }
    );

    const searchData = await searchResponse.json();

    if (searchData.data && searchData.data.length > 0) {
      onSuccess('Cliente já existe. Retornando customerId existente.', searchData.data[0].id);
      return searchData.data[0].id;
    }

    // Se não encontrou, cria o cliente
    const createResponse = await fetch(`${baseUrl}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
      body: JSON.stringify({
        name,
        cpfCnpj: sanitizedCpfCnpj,
        email: email || '',
        phone: phone || '',
        address: address || '',
      }),
    });

    const createData = await createResponse.json();

    if (createResponse.ok) {
      onSuccess('Cliente criado com sucesso.', createData.id);
      return createData.id;
    } else {
      onError('Erro ao criar cliente:', createData.message);
      return null;
    }
  } catch (error) {
    onError('Erro ao gerenciar cliente:', error.message);
  }
};

/**
 * Processa o pagamento
 */
export const processPayment = async ({
  baseUrl,
  accessToken,
  paymentData,
  onSuccess,
  onError,
}) => {
  try {
    const paymentResponse = await fetch(`${baseUrl}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
      body: JSON.stringify(paymentData),
    });

    const paymentResult = await paymentResponse.json();

    if (paymentResponse.ok) {
      onSuccess('Pagamento processado com sucesso.', paymentResult);
      return paymentResult;
    } else {
      onError('Erro ao processar pagamento:', paymentResult.message);
      return null;
    }
  } catch (error) {
    onError('Erro ao processar pagamento:', error.message);
  }
};

/**
 * Recupera a linha digitável do pagamento
 */
export const getIdentificationField = async ({
  baseUrl,
  accessToken,
  paymentId,
  onSuccess,
  onError,
}) => {
  try {
    const response = await fetch(`${baseUrl}/payments/${paymentId}/identificationField`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    });

    const data = await response.json();

    if (response.ok) {
      onSuccess('Linha digitável recuperada com sucesso.', data.identificationField);
      return data.identificationField;
    } else {
      onError('Erro ao recuperar a linha digitável:', data.message);
      return null;
    }
  } catch (error) {
    onError('Erro ao recuperar a linha digitável:', error.message);
  }
};
