import React, { useState, useEffect } from "react";
import PricesNavTab from "../components/tabs/PricesNavTab.jsx";
import WholesaleTab from "../components/tabs/WholesaleTab.jsx";
import RetailTab from "../components/tabs/RetailTab.jsx";
import { getAllPrices } from "../components/services/remote/get/GetAllPrices.jsx";
import AddPriceModal from "../components/modals/AddPriceModal";
import { Box } from "@mui/material";

const Prices = () => {
  const [currentTabInPrices, setCurrentTabInPrices] = useState("WHOLESALE");
  const [prices, setPrices] = useState([]);
  const [addPriceShowModal, setAddPriceShowModal] = useState(false);

  const fetchPrices = async () => {
    try {
      const data = await getAllPrices();
      console.log("Precios obtenidos en Prices.jsx:", data);
      if (data && data.length > 0) {
        const validatedPrices = data.filter(price => /^[a-fA-F0-9]{24}$/.test(price._id));
        setPrices(validatedPrices);
        console.log("Precios validados y actualizados:", validatedPrices);
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

  const handlePriceAdded = (newPrice) => {
    fetchPrices();
    setAddPriceShowModal(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '50px' }}>
      <PricesNavTab setCurrentTabInPrices={setCurrentTabInPrices} />
      <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
        {currentTabInPrices === "WHOLESALE" && <WholesaleTab prices={prices} />}
        {currentTabInPrices === "RETAIL" && <RetailTab prices={prices} />}
      </Box>
      <AddPriceModal
        open={addPriceShowModal}
        onClose={() => setAddPriceShowModal(false)}
        onPriceAdded={handlePriceAdded}
      />
      <Box sx={{ height: '50px', backgroundColor: '#f5f5f5', textAlign: 'center', padding: 1 }}>
        <p>Footer contenido aquí</p>
      </Box>
    </Box>
  );
};

export default Prices;
