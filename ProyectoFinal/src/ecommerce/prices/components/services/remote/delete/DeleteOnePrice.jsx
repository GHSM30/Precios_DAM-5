import axios from "axios";

export function DeleteOnePrice(priceId) {
  return new Promise((resolve, reject) => {
    if (!priceId) {
      console.error("El priceId es inválido o no se proporcionó");
      reject("ID de precio inválido");
      return;
    }

    const apiUrl = `${import.meta.env.VITE_REST_API_SECURITY_ECOMMERCE}precios/${priceId}`;
    
    console.log("Eliminando precio con ID:", priceId); // Verificar ID

    axios.delete(apiUrl)
      .then((response) => {
        const data = response.data;
        
        // Verificar que la respuesta contiene éxito
        if (data && data.success) {
          console.log("Precio eliminado correctamente:", data);
          resolve(data.data); // Solo resolver con los datos si fue exitoso
        } else {
          console.error("No se pudo eliminar el precio:", data);
          reject(data);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el precio:", error);
        reject(error);
      });
  });
}
