import React, { useState } from "react";
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField,
    DialogActions, Alert, Box, Checkbox, FormControlLabel
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
// Services
import { AddOnePrice } from "../services/remote/post/AddOnePrice.jsx"; // Servicio para agregar precio

const AddPriceModal = ({ AddPriceShowModal, setAddPriceShowModal, onPriceAdded, fetchData }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            IdProdServOK: "",
            IdPresentaOK: "",
            CostoIni: "",
            CostoFin: "",
            Precio: "",
            Activo: false,
        },
        validationSchema: Yup.object({
            IdProdServOK: Yup.string().required("Campo requerido"),
            IdPresentaOK: Yup.string().required("Campo requerido"),
            CostoIni: Yup.number().required("Campo requerido").positive("Debe ser un número positivo"),
            CostoFin: Yup.number().required("Campo requerido").positive("Debe ser un número positivo"),
            Precio: Yup.number().required("Campo requerido").positive("Debe ser un número positivo"),
            Activo: Yup.bool().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            setLoading(true);
            try {
                const price = {
                    IdProdServOK: values.IdProdServOK,
                    IdPresentaOK: values.IdPresentaOK,
                    CostoIni: parseFloat(values.CostoIni),
                    CostoFin: parseFloat(values.CostoFin),
                    Precio: parseFloat(values.Precio),
                    detail_row: {
                        Activo: values.Activo ? "S" : "N",
                        Borrado: "N",
                        detail_row_reg: [
                            {
                                FechaReg: new Date().toISOString(),
                                UsuarioReg: "Admin", // Cambiar por el usuario actual
                            },
                        ],
                    },
                };

                await AddOnePrice(price); // Llamar al servicio para agregar el precio
                setMensajeExitoAlert("Precio fue creado y guardado correctamente");

                // Notificar al componente padre que se agregó un precio
                if (onPriceAdded) {
                    onPriceAdded(); // Llamar la función para actualizar la lista
                }
                fetchData();
            } catch (e) {
                setMensajeErrorAlert("No se pudo crear el precio");
            }
            setLoading(false);
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return (
        <Dialog open={AddPriceShowModal} onClose={() => setAddPriceShowModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Agregar Nuevo Precio</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }} dividers>
                    <TextField id="IdProdServOK" label="IdProdServOK*" value={formik.values.IdProdServOK} {...commonTextFieldProps}
                        error={formik.touched.IdProdServOK && Boolean(formik.errors.IdProdServOK)}
                        helperText={formik.touched.IdProdServOK && formik.errors.IdProdServOK}
                    />
                    <TextField id="IdPresentaOK" label="IdPresentaOK*" value={formik.values.IdPresentaOK} {...commonTextFieldProps}
                        error={formik.touched.IdPresentaOK && Boolean(formik.errors.IdPresentaOK)}
                        helperText={formik.touched.IdPresentaOK && formik.errors.IdPresentaOK}
                    />
                    <TextField id="CostoIni" label="Costo Inicial*" type="number" value={formik.values.CostoIni} {...commonTextFieldProps}
                        error={formik.touched.CostoIni && Boolean(formik.errors.CostoIni)}
                        helperText={formik.touched.CostoIni && formik.errors.CostoIni}
                    />
                    <TextField id="CostoFin" label="Costo Final*" type="number" value={formik.values.CostoFin} {...commonTextFieldProps}
                        error={formik.touched.CostoFin && Boolean(formik.errors.CostoFin)}
                        helperText={formik.touched.CostoFin && formik.errors.CostoFin}
                    />
                    <TextField id="Precio" label="Precio*" type="number" value={formik.values.Precio} {...commonTextFieldProps}
                        error={formik.touched.Precio && Boolean(formik.errors.Precio)}
                        helperText={formik.touched.Precio && formik.errors.Precio}
                    />
                    <FormControlLabel control={<Checkbox id="Activo" checked={formik.values.Activo} onChange={formik.handleChange} name="Activo" color="primary" />}
                        label="Activo*" />
                </DialogContent>
                <DialogActions sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box m="auto">
                        {mensajeErrorAlert && <Alert severity="error"><b>¡ERROR!</b> ─ {mensajeErrorAlert}</Alert>}
                        {mensajeExitoAlert && <Alert severity="success"><b>¡ÉXITO!</b> ─ {mensajeExitoAlert}</Alert>}
                    </Box>
                    <LoadingButton color="secondary" startIcon={<CloseIcon />} variant="outlined" onClick={() => setAddPriceShowModal(false)}>CERRAR</LoadingButton>
                    <LoadingButton color="primary" startIcon={<SaveIcon />} variant="contained" type="submit" disabled={!!mensajeExitoAlert} loading={Loading}>GUARDAR</LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddPriceModal;