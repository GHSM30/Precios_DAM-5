import React, { useState, useEffect } from "react";
import PricesNavTab from "../components/tabs/PricesNavTab.jsx";
import WholesaleTab from "../components/tabs/WholesaleTab.jsx";
import RetailTab from "../components/tabs/RetailTab.jsx";
import { getAllPrices } from "../components/services/remote/get/GetAllPrices.jsx";
import AddPriceModal from "../components/modals/AddPriceModal";
import { Box } from "@mui/material"; // Importar Box para el layout

const Prices = () => {
  const [currentTabInPrices, setCurrentTabInPrices] = useState("WHOLESALE");
  const [prices, setPrices] = useState([]);
  const [addPriceShowModal, setAddPriceShowModal] = useState(false);

  const fetchPrices = async () => {
    try {
      const data = await getAllPrices();
      console.log("Precios obtenidos en Prices.jsx:", data);
      if (data && data.length > 0) {
        setPrices(data);
        console.log("Precios actualizados:", data);
      } else {
        console.error("No se encontraron precios en la respuesta");
      }
    } catch (error) {
      console.error("Error al obtener los precios:", error);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handlePriceAdded = () => {
    fetchPrices();
    setAddPriceShowModal(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Aseguramos que ocupe toda la altura de la pantalla
        paddingBottom: '50px', // Agregar espacio para que el pie de página no quede pegado
      }}
    >
      {/* Barra de navegación */}
      <PricesNavTab setCurrentTabInPrices={setCurrentTabInPrices} />

      {/* Contenido principal */}
      <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
        {currentTabInPrices === "WHOLESALE" && (
          <WholesaleTab prices={prices} />
        )}
        {currentTabInPrices === "RETAIL" && (
          <RetailTab prices={prices} />
        )}
      </Box>

      {/* Modal para agregar un nuevo precio */}
      <AddPriceModal
        open={addPriceShowModal}
        onClose={() => setAddPriceShowModal(false)}
        onPriceAdded={handlePriceAdded}
        fetchData={fetchPrices}
      />

      {/* Pie de página */}
      <Box sx={{ height: '50px', backgroundColor: '#f5f5f5', textAlign: 'center', padding: 1 }}>
        <p>Footer contenido aquí</p>
      </Box>
    </Box>
  );
};

export default Prices;
