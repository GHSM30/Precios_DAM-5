import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export default function RetailTab({ prices }) {
  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" gutterBottom>
        Tab con la tabla de la colección de Lista de Precios
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          flex: 1,         // Hace que el contenedor de la tabla ocupe el espacio restante
          overflowY: 'auto', // Permite el desplazamiento vertical si la tabla es muy grande
          maxHeight: 'calc(100vh - 200px)', // Asegura que la tabla no crezca más allá de un límite
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Producto/Servicio</TableCell>
              <TableCell>ID Presentación</TableCell>
              <TableCell>Costo Inicial</TableCell>
              <TableCell>Costo Final</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Activo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prices && prices.length > 0 ? (
              prices.map((price, index) => (
                <TableRow key={index}>
                  <TableCell>{price.IdProdServOK}</TableCell>
                  <TableCell>{price.IdPresentaOK}</TableCell>
                  <TableCell>{price.CostoIni}</TableCell>
                  <TableCell>{price.CostoFin}</TableCell>
                  <TableCell>{price.Precio}</TableCell>
                  <TableCell>{price.detail_row.Activo === "S" ? "Sí" : "No"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay datos de precios disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
