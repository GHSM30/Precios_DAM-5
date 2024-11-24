import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from "@mui/material";

const EditPriceModal = ({ open, editedPrice, setEditedPrice, handleSave, handleClose }) => {
  // Mapeo de etiquetas amigables para cada campo
  const fieldLabels = {
    IdProdServOK: "ID Producto/Servicio",
    IdPresentaOK: "ID Presentación",
    CostoIni: "Costo Inicial",
    CostoFin: "Costo Final",
    Precio: "Precio",
    Activo: "Activo"
  };

  // Función para manejar la actualización del campo en el modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPrice({ ...editedPrice, [name]: value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Precio</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {Object.keys(editedPrice || {}).map((key) => (
            <TextField
              key={key}
              label={fieldLabels[key] || key} // Usar etiquetas amigables o la clave si no existe
              name={key}
              value={editedPrice[key] || ""}
              onChange={handleChange}
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancelar
        </Button>
        <Button
          onClick={() => {
            handleSave(editedPrice);  // Pasar editedPrice a handleSave
            handleClose();  // Cerrar modal después de guardar
          }}
          color="primary"
          variant="contained"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPriceModal;
