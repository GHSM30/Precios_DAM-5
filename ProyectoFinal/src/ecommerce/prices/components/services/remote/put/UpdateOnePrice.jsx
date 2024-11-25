import axios from "axios";

export function UpdateOnePrice(productId, updatedPrice) {
  return new Promise((resolve, reject) => {
    if (!productId) {
      console.error("Error: El ID del producto es obligatorio.");
      return reject(new Error("El ID del producto no puede estar vacío."));
    }

    const apiUrl = `${import.meta.env.VITE_REST_API_SECURITY_ECOMMERCE}precios/${productId}`;

    console.log("URL de la solicitud:", apiUrl);
    console.log("Datos enviados para actualizar:", updatedPrice);

    axios
      .put(apiUrl, { updatedPrice }) // Enviar los datos en el cuerpo
      .then((response) => {
        if (!response.data.success) {
          console.error("Error en la actualización:", response.data);
          return reject(response.data);
        }
        resolve(response.data.data);
      })
      .catch((error) => {
        console.error("Error en UpdateOnePrice:", error.response?.data || error.message);
        reject(error.response?.data || new Error("Error al comunicar con el servidor."));
      });
  });
}
