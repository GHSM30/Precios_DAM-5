import axios from "axios";

export function UpdateOnePrice(priceId, updatedPrice) {
  return new Promise((resolve, reject) => {
    let apiUrl = `${import.meta.env.VITE_REST_API_SECURITY_ECOMMERCE}precios/`;

    // Si priceId está presente, se va a realizar una actualización, de lo contrario, es un POST para crear un nuevo precio
    if (priceId) {
      if (typeof priceId !== 'string' && typeof priceId !== 'number') {
        console.error('Error: El priceId debe ser un valor primitivo (string o number).');
        return reject(new Error('El priceId debe ser un valor válido'));
      }
      // Usamos PUT para actualizar un precio existente
      apiUrl += priceId;
    }

    // Verificación de la URL
    if (!apiUrl || apiUrl.includes("undefined")) {
      console.error("Error: La URL de la API no está configurada correctamente.");
      return reject(new Error("La URL de la API no está configurada."));
    }

    // Imprimir la URL para depuración
    console.log('URL de la solicitud:', apiUrl);

    // Determina si usar PUT (actualización) o POST (creación) según si priceId está presente
    const axiosMethod = priceId ? axios.put : axios.post;

    // Realizar la solicitud con el método adecuado
    axiosMethod(apiUrl, updatedPrice)
      .then((response) => {
        const data = response.data;

        // Verificar si la respuesta es exitosa
        if (!data.success) {
          console.error("No se pudo procesar la solicitud <<UpdateOnePrice>>", data);
          return reject(data);
        }
        
        // Si la respuesta es exitosa, devolvemos los datos
        resolve(data.data); // Retorna la respuesta procesada
      })
      .catch((error) => {
        // Manejo de errores en la solicitud
        console.error("Error en UpdateOnePrice:", error.response?.data || error.message);
        reject(error.response?.data || new Error("Error en la comunicación con el servidor."));
      });
  });
}
