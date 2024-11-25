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
  Snackbar,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllPrices } from "../services/remote/get/GetAllPrices";
import { UpdateOnePrice } from "../services/remote/put/UpdateOnePrice";
import { DeleteOnePrice } from "../services/remote/delete/DeleteOnePrice";
import { AddOnePrice } from "../services/remote/post/AddOnePrice";
import EditPriceModal from "../modals/EditPriceModal";


const PricesTable = ({ jsonData }) => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [PricesData, setPricesData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editedPrice, setEditedPrice] = useState(null);
  const [newPrice, setNewPrice] = useState({
    IdProdServOK: "",
    IdPresentaOK: "",
    CostoIni: 0,
    CostoFin: 0,
    Precio: 0,
    UsuarioReg: "TEST_USER",
    FechaReg: new Date().toISOString(),
  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Mover handleEdit y handleDelete aquí dentro
  const handleEdit = (row) => {
    console.log("Editando fila", row);
    setEditedPrice(row.original); // Esto ahora funcionará
    setEditModalOpen(true); // Abre el modal de edición
  };

  const handleDelete = (row) => {
    setSelectedRow(row.original); // Esto ahora funcionará
    setDeleteModalOpen(true); // Abre el modal de eliminación
  };

  const PricesColumns = [
    { accessorKey: "IdProdServOK", header: "ID Producto", size: 150 },
    { accessorKey: "IdPresentaOK", header: "ID Presentación", size: 150 },
    { accessorKey: "CostoIni", header: "Costo Inicial", size: 100 },
    { accessorKey: "CostoFin", header: "Costo Final", size: 100 },
    { accessorKey: "Precio", header: "Precio", size: 100 },
    { accessorKey: "Activo", header: "Activo", size: 50 },
    { accessorKey: "UsuarioReg", header: "Registrado Por", size: 100 },
    { accessorKey: "FechaReg", header: "Fecha de Registro", size: 150 },
    {
      id: "actions",
      header: "Acciones",
      size: 150,
      Cell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Editar Precio">
            <IconButton
              color="primary"
              onClick={() => handleEdit(row)} // Usa handleEdit definido dentro del componente
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar Precio">
            <IconButton
              color="error"
              onClick={() => handleDelete(row)} // Usa handleDelete definido dentro del componente
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const pricesResponse = await getAllPrices(jsonData);
  
        if (Array.isArray(pricesResponse) && pricesResponse.length > 0) {
          const allPrices = pricesResponse.reduce((acc, current) => {
            if (current.precios && Array.isArray(current.precios)) {
              const formattedPrices = current.precios.map((price) => ({
                IdProdServOK: price.IdProdServOK || "No disponible",
                IdPresentaOK: price.IdPresentaOK || "No disponible",
                CostoIni: price.CostoIni || 0,
                CostoFin: price.CostoFin || 0,
                Precio: price.Precio || 0,
                Activo: price.detail_row?.Activo === "S" ? "Sí" : "No",
                UsuarioReg: price.detail_row?.detail_row_reg[0]?.UsuarioReg || "Desconocido",
                FechaReg: price.detail_row?.detail_row_reg[0]?.FechaReg
                  ? new Date(price.detail_row.detail_row_reg[0]?.FechaReg).toLocaleDateString()
                  : "No disponible",
              }));
  
              acc.push(...formattedPrices);
            }
            return acc;
          }, []);
  
          setPricesData(allPrices);
        }
      } catch (error) {
        console.error("Error al cargar los precios:", error);
        setNotification({
          open: true,
          message: "Error al cargar los datos. Por favor, intente nuevamente.",
          type: "error",
        });
      } finally {
        setLoadingTable(false);
      }
    };
  
    fetchPrices();
  }, [jsonData]);
  
  

  const validateNewPrice = () => {
    return Object.entries(newPrice).every(([key, value]) =>
      typeof value === "string" ? value.trim() !== "" : value !== null && value !== undefined
    );
  };

  function handleSaveEdit(row) {
    if (!row || !row.original) {
      console.error("Error: Datos de la fila no están definidos o son inválidos.", row);
      return;
    }
  
    console.log("Datos de la fila recibidos:", row.original);
  
    const priceId = row.original.IdProdServOK;
    if (!priceId) {
      console.error("Error: El ID del producto (IdProdServOK) no está definido.");
      return;
    }
  
    const updatedPrice = {
      Precio: row.values.Precio,
      CostoIni: row.values.CostoIni,
      CostoFin: row.values.CostoFin,
    };
  
    // Llamar a la API
    UpdateOnePrice(priceId, updatedPrice)
      .then((response) => {
        console.log("Precio actualizado con éxito:", response);
      })
      .catch((error) => {
        console.error("Error al actualizar el precio:", error);
      });
  }
  
  
  

  const handleConfirmDelete = async () => {
    try {
      const priceId = selectedRow?.IdProdServOK;

      if (!priceId) {
        console.error("No se seleccionó un precio válido para eliminar.");
        return;
      }

      const response = await DeleteOnePrice(priceId);

      if (response.success) {
        const updatedData = PricesData.filter(
          (price) => price.IdProdServOK !== priceId
        );
        setPricesData(updatedData);
        setDeleteModalOpen(false);
        setNotification({ open: true, message: "Precio eliminado con éxito", type: "success" });
      } else {
        console.error("Error al eliminar el precio.");
        setNotification({ open: true, message: "Error al eliminar el precio", type: "error" });
      }
    } catch (error) {
      console.error("Error al eliminar el precio:", error);
      setNotification({ open: true, message: "Error al eliminar el precio", type: "error" });
    }
  };

  const handleSaveAdd = async () => {
    if (!validateNewPrice()) {
      console.error("Por favor, completa todos los campos.");
      setNotification({ open: true, message: "Por favor, completa todos los campos", type: "error" });
      return;
    }
  
    try {
      const priceToAdd = {
        ...newPrice,
        IdInstitutoOK: "9001",
        IdListaOK: "9001-000000000001",
        IdListaBK: "PUBLICO-GENERAL",
        DesLista: "Publico en General",
        FechaExpiraFin: "2024-12-31T07:00:00.000Z",
        FechaExpiraIni: "2023-01-01T07:00:00.000Z",
        IdTipoFormulaOK: "",
        IdTipoGeneraListaOK: "IdTipoGeneraLista-IdManual", // Este campo es obligatorio
        IdTipoListaOK: "IdTipoListaPrecios-IdGeneral",
        precios: [
          {
            IdProdServOK: newPrice.IdProdServOK,
            IdPresentaOK: newPrice.IdPresentaOK,
            CostoIni: newPrice.CostoIni || 0, // Asegurarse de que `CostoIni` tenga un valor
            CostoFin: newPrice.CostoFin || 0,
            Precio: newPrice.Precio || 0,
            detail_row: {
              Activo: "S",
              Borrado: "N",
              detail_row_reg: [
                {
                  FechaReg: new Date().toISOString(),
                  UsuarioReg: newPrice.UsuarioReg || "Desconocido",
                },
              ],
            },
          },
        ],
      };
      
  
      const addedPrice = await AddOnePrice(priceToAdd); // Cambiado a AddOnePrice
  
      if (addedPrice) {
        setPricesData([...PricesData, addedPrice]);
        setAddModalOpen(false);
        setNotification({ open: true, message: "Precio agregado con éxito", type: "success" });
      } else {
        console.error("La adición del precio no fue exitosa.");
        setNotification({ open: true, message: "Error al agregar el precio", type: "error" });
      }
    } catch (error) {
      console.error("Error al agregar el precio:", error);
      setNotification({ open: true, message: "Error al agregar el precio", type: "error" });
    }
  };

  return (
    <>
      <Box>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Agregar Precio">
            <IconButton color="primary" onClick={() => setAddModalOpen(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <MaterialReactTable
          columns={PricesColumns}
          data={PricesData}
          initialState={{
            showGlobalFilter: true,
            density: "compact",
            columnVisibility: { id: false },
          }}
          enableColumnOrdering
          enableRowSelection
          enablePagination
          enableSorting
          onRowSelectionChange={(newRowSelection) => setSelectedRow(newRowSelection)}
        />
      </Box>

      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <DialogTitle>Agregar Precio</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="ID Producto"
            value={newPrice.IdProdServOK}
            onChange={(e) => setNewPrice({ ...newPrice, IdProdServOK: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="ID Presentación"
            value={newPrice.IdPresentaOK}
            onChange={(e) => setNewPrice({ ...newPrice, IdPresentaOK: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Costo Inicial"
            value={newPrice.CostoIni}
            onChange={(e) => setNewPrice({ ...newPrice, CostoIni: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Costo Final"
            value={newPrice.CostoFin}
            onChange={(e) => setNewPrice({ ...newPrice, CostoFin: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Precio"
            value={newPrice.Precio}
            onChange={(e) => setNewPrice({ ...newPrice, Precio: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Usuario"
            value={newPrice.UsuarioReg}
            onChange={(e) => setNewPrice({ ...newPrice, UsuarioReg: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveAdd} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
  <DialogTitle>Editar Precio</DialogTitle>
  <DialogContent>
    <TextField
      fullWidth
      label="ID Producto"
      value={editedPrice?.IdProdServOK || ""}
      onChange={(e) => setEditedPrice({ ...editedPrice, IdProdServOK: e.target.value })}
      margin="normal"
    />
    <TextField
      fullWidth
      label="ID Presentación"
      value={editedPrice?.IdPresentaOK || ""}
      onChange={(e) => setEditedPrice({ ...editedPrice, IdPresentaOK: e.target.value })}
      margin="normal"
    />
    <TextField
      fullWidth
      label="Costo Inicial"
      value={editedPrice?.CostoIni || ""}
      onChange={(e) => setEditedPrice({ ...editedPrice, CostoIni: e.target.value })}
      margin="normal"
    />
    <TextField
      fullWidth
      label="Costo Final"
      value={editedPrice?.CostoFin || ""}
      onChange={(e) => setEditedPrice({ ...editedPrice, CostoFin: e.target.value })}
      margin="normal"
    />
    <TextField
      fullWidth
      label="Precio"
      value={editedPrice?.Precio || ""}
      onChange={(e) => setEditedPrice({ ...editedPrice, Precio: e.target.value })}
      margin="normal"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
    <Button onClick={() => handleSaveEdit(row)}>Guardar</Button>
  </DialogActions>
</Dialog>


      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
        severity={notification.type}
      />
    </>
  );
};

export default PricesTable;
