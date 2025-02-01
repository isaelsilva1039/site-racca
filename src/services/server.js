

import { API_PROD } from "./urls";
export const getOrCreateCustomer = async ({
  cpfCnpj,
  onSuccess,
  onError = () => {},
}) => {
  // Para testes, fixando o CPF/CNPJ
  let url = `${API_PROD}/payments/customers?cpfCnpj=${cpfCnpj}`;

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
  let url = `${API_PROD}/payments/customers`;

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

  let url = `${API_PROD}/payments`;

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
