import { Box } from "@mui/material";
import PricesTable from "../tables/PricesTable"; // Asegúrate de tener este componente

export default function WholesaleTab() {
    return (
        <Box>
            <h2>Tabla de precios al mayoreo</h2>
            {/* Renderiza la tabla con datos de precios al mayoreo */}
            <PricesTable type="WHOLESALE" /> {/* Propiedad 'type' para diferenciar los datos */}
        </Box>
    );
}
