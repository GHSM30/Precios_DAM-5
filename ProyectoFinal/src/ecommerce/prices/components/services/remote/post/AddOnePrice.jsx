import axios from "axios";

export async function AddOnePrice(price) {
  const apiUrl = `${import.meta.env.VITE_REST_API_SECURITY_ECOMMERCE}precios`;

  // Verificación de la URL
  if (!apiUrl || apiUrl === "undefinedprecios") {
    console.error("Error: La URL de la API no está configurada correctamente.");
    throw new Error("La URL de la API no está configurada.");
  }

  try {
    // Construcción del cuerpo de la solicitud con los campos adicionales requeridos
    const newPrice = {
      IdInstitutoOK: price.IdInstitutoOK || "9001",
      IdListaOK: price.IdListaOK || "9001-000000000001",
      IdListaBK: price.IdListaBK || "PUBLICO-GENERAL",
      DesLista: price.DesLista || "Publico en General",
      FechaExpiraIni: price.FechaExpiraIni || "2023-01-01T07:00:00.000Z",
      FechaExpiraFin: price.FechaExpiraFin || "2024-12-31T07:00:00.000Z",
      precios: price.precios || [
        {
          IdProdServOK: price.IdProdServOK || "9001-000000000001",
          IdPresentaOK: price.IdPresentaOK || "9001-000000000001-000000001",
          Precio: price.Precio || 0,
          detail_row: {
            Activo: "S",
            Borrado: "N",
            detail_row_reg: [
              {
                FechaReg: new Date().toISOString(),
                UsuarioReg: "TEST_USER",
              },
            ],
          },
        },
      ],
      detail_row: {
        Activo: "S",
        Borrado: "N",
        detail_row_reg: [
          {
            FechaReg: new Date().toISOString(),
            UsuarioReg: "TEST_USER",
          },
        ],
      },
      // Asegurándote de pasar los campos faltantes
      IdTipoGeneraListaOK: price.IdTipoGeneraListaOK || "DEFAULT_ID_TIPO_GENERA_LISTA_OK", // Añadir un valor predeterminado
      IdTipoListaOK: price.IdTipoListaOK || "DEFAULT_ID_TIPO_LISTA_OK", // Añadir un valor predeterminado
    };

    // Solicitud POST al servidor
    const response = await axios.post(apiUrl, newPrice);
    const data = response.data;

    // Validación de la respuesta
    if (!data.success) {
      console.error("Error en la creación del precio:", data.message || "Error desconocido.");
      throw new Error(data.message || "No se pudo crear el precio.");
    }

    // Retorna los datos si todo es correcto
    return data.data;
  } catch (error) {
    console.error("Error en AddOnePrice:", error.response?.data || error.message);
    throw error.response?.data || new Error("Error en la comunicación con el servidor.");
  }
}
