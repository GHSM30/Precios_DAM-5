import { Outlet, useLocation } from "react-router-dom";
import AppBar from "../../../share/bars/components/CommerceAppBar";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const location = useLocation();

  return (
    <Box
      id="div-home"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Esto asegura que el contenido se estire al 100% de la altura de la pantalla
      }}
    >
      {/* Barra de navegación */}
      <AppBar />

      {/* Mostrar el contenido solo si estamos en la ruta raíz */}
      {location.pathname === "/" && (
        <Box
          sx={{
            textAlign: "center",
            padding: 4,
            marginTop: 8,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Bienvenido al eCommerce
          </Typography>
          <Typography variant="h6" gutterBottom>
            Explora nuestra amplia gama de productos y servicios diseñados para satisfacer todas tus necesidades.
          </Typography>
        </Box>
      )}

      {/* Espacio para subcomponentes cargados dinámicamente */}
      <Box
        id="detail"
        sx={{
          mt: 4,
          flex: 1, // Esto asegura que el contenido dentro de "detail" crezca y ocupe el espacio disponible
        }}
      >
        <Outlet />
      </Box>

    </Box>
  );
}
