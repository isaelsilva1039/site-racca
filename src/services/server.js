
import { API_PROD } from "./urls";
export const getOrCreateCustomer = async ({
  cpfCnpj,
  onSuccess,
  onError = () => {},
}) => {
  const sanitizedCpfCnpj = cpfCnpj.replace(/\D/g, '');
  let url = `${API_PROD}/payments/customers?cpfCnpj=${sanitizedCpfCnpj}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
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
 
  let url = `${API_PROD}/payments/customers`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {

        "Content-Type": "application/json",
        "Accept": "application/json",
  
      },
  
      body: JSON.stringify({
        name,
        cpfCnpj,
        email,
        phone,
        address,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

      onSuccess(data?.original?.data || data);


  } catch (error) {
    onError(error);
  }
};





export const createPayment = async ({
  externalReference,
  customer,    // Ex: "cus_000108793807"
  billingType, // Ex: "UNDEFINED" (ou outro valor conforme a sua regra)
  dueDate,    
  value,      
  description,
  cpfCnpj,
  name,
  email,
  phone,
  address,
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
        externalReference,
        customer,
        billingType,
        dueDate,
        value,
        description,
        cpfCnpj,
        name,
        email,
        phone,
        address,
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
