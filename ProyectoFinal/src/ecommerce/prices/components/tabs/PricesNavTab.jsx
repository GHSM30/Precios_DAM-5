import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

// Definir las pestañas relacionadas con precios
const PricesTabs = ["Mayoreo", "Menudeo"];

const PricesNavTab = ({ setCurrentTabInPrices }) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e) => {
        const selectedTab = e.target.innerText.toUpperCase();
        console.log("Pestaña seleccionada:", selectedTab);

        // Actualizar la pestaña seleccionada en el estado principal
        setCurrentTabInPrices(selectedTab);

        // Cambiar el índice de la pestaña actual según la selección
        switch (selectedTab) {
            case "MAYOREO":
                setCurrentTabIndex(0);
                break;
            case "MENUDEO":
                setCurrentTabIndex(1);
                break;
            default:
                break;
        }
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currentTabIndex}
                variant="fullWidth"
                onChange={handleChange}
                aria-label="Tabs de precios"
                textColor="primary"
            >
                {PricesTabs.map((tab) => (
                    <Tab key={tab} label={tab} />
                ))}
            </Tabs>
        </Box>
    );
};

export default PricesNavTab;
