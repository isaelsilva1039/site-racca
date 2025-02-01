// import { API_DEV } from "./urls";

// /**
//  * Obtém ou cria um cliente na plataforma ASAAS
//  */
// export const getOrCreateCustomer = async ({
//   baseUrl,
//   accessToken,
//   name,
//   cpfCnpj,
//   email,
//   phone,
//   address,
//   onSuccess = () => {},
//   onError = () => {},
// }) => {
//   const sanitizedCpfCnpj = cpfCnpj.replace(/\D/g, '');

//   if (![11, 14].includes(sanitizedCpfCnpj.length)) {
//     onError('CPF ou CNPJ inválido.');
//     return;
//   }

//   try {
//     // Tenta buscar o cliente
//     const searchResponse = await fetch(
//       `${API_DEV}/customers?cpfCnpj=${sanitizedCpfCnpj}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           access_token: accessToken,
//         },
//       }
//     );

//     const searchData = await searchResponse.json();

//     if (searchData.data && searchData.data.length > 0) {
//       onSuccess('Cliente já existe. Retornando customerId existente.', searchData.data[0].id);
//       return searchData.data[0].id;
//     }

//     // Se não encontrou, cria o cliente
//     const createResponse = await fetch(`${baseUrl}/customers`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         access_token: accessToken,
//       },
//       body: JSON.stringify({
//         name,
//         cpfCnpj: sanitizedCpfCnpj,
//         email: email || '',
//         phone: phone || '',
//         address: address || '',
//       }),
//     });

//     const createData = await createResponse.json();

//     if (createResponse.ok) {
//       onSuccess('Cliente criado com sucesso.', createData.id);
//       return createData.id;
//     } else {
//       onError('Erro ao criar cliente:', createData.message);
//       return null;
//     }
//   } catch (error) {
//     onError('Erro ao gerenciar cliente:', error.message);
//   }
// };

// /**
//  * Processa o pagamento
//  */
// export const processPayment = async ({
//   baseUrl,
//   accessToken,
//   paymentData,
//   onSuccess,
//   onError,
// }) => {
//   try {
//     const paymentResponse = await fetch(`${baseUrl}/payments`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         access_token: accessToken,
//       },
//       body: JSON.stringify(paymentData),
//     });

//     const paymentResult = await paymentResponse.json();

//     if (paymentResponse.ok) {
//       onSuccess('Pagamento processado com sucesso.', paymentResult);
//       return paymentResult;
//     } else {
//       onError('Erro ao processar pagamento:', paymentResult.message);
//       return null;
//     }
//   } catch (error) {
//     onError('Erro ao processar pagamento:', error.message);
//   }
// };

// /**
//  * Recupera a linha digitável do pagamento
//  */
// export const getIdentificationField = async ({
//   baseUrl,
//   accessToken,
//   paymentId,
//   onSuccess,
//   onError,
// }) => {
//   try {
//     const response = await fetch(`${baseUrl}/payments/${paymentId}/identificationField`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         access_token: accessToken,
//       },
//     });

//     const data = await response.json();

//     if (response.ok) {
//       onSuccess('Linha digitável recuperada com sucesso.', data.identificationField);
//       return data.identificationField;
//     } else {
//       onError('Erro ao recuperar a linha digitável:', data.message);
//       return null;
//     }
//   } catch (error) {
//     onError('Erro ao recuperar a linha digitável:', error.message);
//   }
// };

import { API_DEV } from "./urls";
export const getOrCreateCustomer = async ({
  cpfCnpj,
  onSuccess,
  onError = () => {},
}) => {
  // Para testes, fixando o CPF/CNPJ
  let url = `${API_DEV}/payments/customers?cpfCnpj=${cpfCnpj}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        // Se necessário, inclua "access_token": accessToken
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    onSuccess(data?.original?.data);
  } catch (error) {
    onError(error);
  }
};


export const createCustomer = async ({
  name,
  cpfCnpj,
  email,
  phone,
  address,
  onSuccess,
  onError = () => {},
}) => {
  // Define a URL do endpoint para criação do cliente (sem query string)
  let url = `${API_DEV}/payments/customers`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {

        "Content-Type": "application/json",
        "Accept": "application/json",
   
      },
  
      body: JSON.stringify({
        name,       // Ex: "cleinte"
        cpfCnpj,    // Ex: "07761854386"
        email,      // Ex: "cleinte1@gmail.com"
        phone,      // Ex: "9999999"
        address,    // Ex: "rua"
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    // Caso a estrutura da resposta seja diferente, ajuste aqui:
    onSuccess(data?.original?.data || data);
  } catch (error) {
    onError(error);
  }
};





export const createPayment = async ({
  customer,    // Ex: "cus_000108793807"
  billingType, // Ex: "UNDEFINED" (ou outro valor conforme a sua regra)
  dueDate,     // Ex: "2025-02-10"
  value,       // Ex: 150.00
  description, // Ex: "Pagamento via PIX"
  cpfCnpj,     // Ex: "07761854386"
  onSuccess,
  onError = () => {},
}) => {

  let url = `${API_DEV}/payments`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        customer,
        billingType,
        dueDate,
        value,
        description,
        cpfCnpj,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    // Caso a resposta possua uma estrutura aninhada, ajuste conforme necessário
    onSuccess(data?.original?.data || data);
  } catch (error) {
    onError(error);
  }
};
