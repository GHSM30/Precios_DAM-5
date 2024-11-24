import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

// Definir las pestañas relacionadas con precios
const PricesTabs = ["Mayoreo", "Menudeo"];

const PricesNavTab = ({ setCurrentTabInPrices }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // Manejar el cambio de pestaña
  const handleChange = (event, newValue) => {
    const selectedTab = PricesTabs[newValue].toUpperCase();
    console.log("Pestaña seleccionada:", selectedTab);

    // Actualizar la pestaña seleccionada en el estado principal
    setCurrentTabInPrices(selectedTab);

    // Cambiar el índice de la pestaña actual según la selección
    setCurrentTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
        mx: 1, 
        padding: 0.5,
        backgroundColor: "#fff",  // Fondo blanco para que resalte la barra de pestañas
        boxShadow: 1,             // Agregar sombra para dar un efecto visual de separación
      }}
    >
      <Tabs
        value={currentTabIndex}
        onChange={handleChange}
        aria-label="Tabs de precios"
        textColor="primary"
        variant="fullWidth"
        indicatorColor="primary"
      >
        {PricesTabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
};

export default PricesNavTab;
