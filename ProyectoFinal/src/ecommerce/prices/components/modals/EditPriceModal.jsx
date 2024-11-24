import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from "@mui/material";

const EditPriceModal = ({ open, editedPrice, setEditedPrice, handleSave, handleClose }) => {
  // Este componente de modal recibirá el estado de apertura del modal (open), el precio editado (editedPrice),
  // la función para cambiar el precio (setEditedPrice), y las funciones para guardar o cerrar el modal.

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Precio</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {Object.keys(editedPrice || {}).map((key) => (
            <TextField
              key={key}
              label={key}
              name={key}
              value={editedPrice?.[key] || ""}
              onChange={(e) =>
                setEditedPrice({ ...editedPrice, [e.target.name]: e.target.value })
              }
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPriceModal;
