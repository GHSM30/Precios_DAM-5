import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Stack,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllPrices } from "../services/remote/get/GetAllPrices"; // Importa la función de extracción

const PricesColumns = [
  { accessorKey: "IdProdServOK", header: "ID Producto", size: 150 },
  { accessorKey: "IdPresentaOK", header: "ID Presentación", size: 150 },
  { accessorKey: "CostoInicial", header: "Costo Inicial", size: 100 },
  { accessorKey: "CostoFinal", header: "Costo Final", size: 100 },
  { accessorKey: "Precio", header: "Precio", size: 100 },
  { accessorKey: "Activo", header: "Activo", size: 50 },
  { accessorKey: "UsuarioRegistro", header: "Registrado Por", size: 100 },
];

const PricesTable = ({ jsonData }) => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [PricesData, setPricesData] = useState([]);
  const [AddPriceShowModal, setAddPriceShowModal] = useState(false);

  // Estado para manejar los campos del formulario del modal
  const [newPrice, setNewPrice] = useState({
    IdProdServOK: "",
    IdPresentaOK: "",
    CostoInicial: "",
    CostoFinal: "",
    Precio: "",
    Activo: true,
    UsuarioRegistro: "Admin",
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const prices = getAllPrices(jsonData); // Usa la función para procesar el JSON
        setPricesData(prices);
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al cargar los precios:", error);
      }
    };

    fetchPrices();
  }, [jsonData]);

  const handleAddPrice = () => {
    setPricesData([...PricesData, newPrice]); // Agrega el nuevo precio a la tabla
    setAddPriceShowModal(false); // Cierra el modal
    setNewPrice({
      IdProdServOK: "",
      IdPresentaOK: "",
      CostoInicial: "",
      CostoFinal: "",
      Precio: "",
      Activo: true,
      UsuarioRegistro: "Admin",
    }); // Limpia los campos del formulario
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPrice((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={PricesColumns}
          data={PricesData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddPriceShowModal(true)}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Detalles">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
            </>
          )}
        />
      </Box>
      {/* Modal para agregar precio */}
      <Dialog
        open={AddPriceShowModal}
        onClose={() => setAddPriceShowModal(false)}
      >
        <DialogTitle>Agregar Nuevo Precio</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="ID Producto"
              name="IdProdServOK"
              value={newPrice.IdProdServOK}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="ID Presentación"
              name="IdPresentaOK"
              value={newPrice.IdPresentaOK}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Costo Inicial"
              name="CostoInicial"
              type="number"
              value={newPrice.CostoInicial}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Costo Final"
              name="CostoFinal"
              type="number"
              value={newPrice.CostoFinal}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Precio"
              name="Precio"
              type="number"
              value={newPrice.Precio}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddPriceShowModal(false)} color="error">
            Cancelar
          </Button>
          <Button onClick={handleAddPrice} color="primary" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PricesTable;
