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

    // Convertir valores a los tipos apropiados (números para ciertos campos)
    const parsedValue =
      ["CostoIni", "CostoFin", "Precio"].includes(name) ? parseFloat(value) : value;

    setEditedPrice({ ...editedPrice, [name]: parsedValue });
  };

  // Guardar los cambios y cerrar el modal solo si fue exitoso
  const handleSaveClick = async () => {
    console.log("Datos enviados para guardar:", editedPrice);

    try {
      const success = await handleSave(editedPrice); // Suponemos que `handleSave` devuelve un booleano o lanza un error
      if (success) {
        handleClose();
      } else {
        console.error("Error al guardar los cambios");
      }
    } catch (error) {
      console.error("Error en handleSave:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Precio</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {/* Generar un campo de entrada para cada propiedad del precio */}
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
          onClick={handleSaveClick} // Usar la nueva función que maneja el guardado y cierre
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
