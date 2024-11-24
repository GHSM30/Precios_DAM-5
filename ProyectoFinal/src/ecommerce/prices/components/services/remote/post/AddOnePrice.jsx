import axios from "axios";

export async function AddOnePrice(price) {
  const apiUrl = `${import.meta.env.VITE_REST_API_SECURITY_ECOMMERCE}precios`;

  // Verificación de la URL
  if (!apiUrl || apiUrl === "undefinedprecios") {
    console.error("Error: La URL de la API no está configurada correctamente.");
    throw new Error("La URL de la API no está configurada.");
  }

  try {
    // Realizar la solicitud POST
    const response = await axios.post(apiUrl, price);
    const data = response.data;

    // Validación de respuesta del servidor
    if (!data.success) {
      console.error("Error en la creación del precio:", data.message || "Error desconocido.");
      throw new Error(data.message || "No se pudo crear el precio.");
    }

    // Retorna los datos si todo es correcto
    return data.data;
  } catch (error) {
    // Manejo de errores de axios o del backend
    console.error("Error en AddOnePrice:", error.response?.data || error.message);
    throw error.response?.data || new Error("Error en la comunicación con el servidor.");
  }
}
