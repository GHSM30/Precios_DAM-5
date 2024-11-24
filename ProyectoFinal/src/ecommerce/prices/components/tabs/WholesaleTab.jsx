import { Box, Typography } from "@mui/material";
import PricesTable from "../tables/PricesTable"; // Asegúrate de tener este componente

export default function WholesaleTab() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Tabla de precios al mayoreo
            </Typography>
            
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                {/* Renderiza la tabla con datos de precios al mayoreo */}
                <PricesTable type="WHOLESALE" /> {/* Propiedad 'type' para diferenciar los datos */}
            </Box>
        </Box>
    );
}
