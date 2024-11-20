import axios from "axios";

export function AddOnePrice(price) {
  return new Promise((resolve, reject) => {
    const apiUrl = `${import.meta.env.VITE_REST_API_SECURITY_ECOMMERCE + 'precios'}`;

    axios.post(apiUrl, price)
      .then((response) => {
        const data = response.data;

        if (!data.success) {
          console.error("No se pudo crear el precio <<AddOnePrice>>", data);
          reject(data);
        } else {
          resolve(data.data);
        }
      })
      .catch((error) => {
        console.error("Error en AddOnePrice:", error);
        reject(error);
      });
  });
}
