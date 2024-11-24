// Importar dependencias
require('dotenv').config(); // Cargar las variables de entorno

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000; // Puerto donde escuchará el servidor

// Habilitar CORS (Cross-Origin Resource Sharing) y JSON
app.use(cors());
app.use(express.json()); // Middleware para procesar JSON en el body

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Tiempo de espera para conectarse
}).then(() => {
  console.log('Conexión exitosa a MongoDB');
}).catch((err) => {
  console.error('Error de conexión a MongoDB:', err.message);
});

// Definir los esquemas y modelos de la colección
const detailRowRegSchema = new mongoose.Schema({
  FechaReg: { type: Date, required: true },
  UsuarioReg: { type: String, required: true }
}, { _id: false });

const detailRowSchema = new mongoose.Schema({
  Activo: { type: String, required: true },
  Borrado: { type: String, required: true },
  detail_row_reg: { type: [detailRowRegSchema], required: true }
}, { _id: false });

const preciosSchema = new mongoose.Schema({
  IdProdServOK: { type: String, required: true },
  IdPresentaOK: { type: String, required: true },
  IdTipoFormulaOK: { type: String, default: '' },
  Formula: { type: String, default: '' },
  CostoIni: { type: Number, required: true },
  CostoFin: { type: Number, required: true },
  Precio: { type: Number, required: true },
  detail_row: { type: detailRowSchema, required: true }
}, { _id: false });

// Esquema para la colección 'Precio'
const precioSchema = new mongoose.Schema({
  IdInstitutoOK: { type: String, required: true },
  IdListaOK: { type: String, required: true },
  IdListaBK: { type: String, required: true },
  DesLista: { type: String, required: true },
  FechaExpiraIni: { type: Date, required: true },
  FechaExpiraFin: { type: Date, required: true },
  IdTipoListaOK: { type: String, required: true },
  IdTipoGeneraListaOK: { type: String, required: true },
  IdTipoFormulaOK: { type: String, default: '' },
  precios: { type: [preciosSchema], required: true },
  roles: { type: Array, default: [] },
  detail_row: { type: detailRowSchema, required: true },
  negocios: { type: Array, default: [] },
  promociones: { type: Array, default: [] }
}, { collection: 'Precio' }); // Cambiar el nombre de la colección a 'Precio'

// Crear el modelo basado en el esquema
const Precio = mongoose.model('Precio', precioSchema);

// Endpoint para consultar todos los registros
app.get('/precios', async (req, res) => {
  try {
    const precios = await Precio.find();

    if (precios.length === 0) {
      return res.status(404).json({ success: false, message: 'No se encontraron precios' });
    }

    res.json({ success: true, message: 'Precios encontrados', data: precios });
  } catch (error) {
    console.error('Error al obtener los precios:', error);
    res.status(500).json({ success: false, message: 'Error al obtener los precios', error: error.message });
  }
});

// Endpoint para consultar un registro por IdListaOK
app.get('/precios/:idListaOK', async (req, res) => {
  try {
    const precio = await Precio.findOne({ IdListaOK: req.params.idListaOK });

    if (!precio) {
      return res.status(404).json({ success: false, message: 'Precio no encontrado' });
    }

    res.json({ success: true, message: 'Precio encontrado', data: precio });
  } catch (error) {
    console.error('Error al obtener el precio:', error);
    res.status(500).json({ success: false, message: 'Error al obtener el precio', error: error.message });
  }
});

// Endpoint para insertar un registro
app.post('/precios', async (req, res) => {
  try {
    const nuevoPrecio = new Precio(req.body);
    await nuevoPrecio.save();
    res.status(201).json({ success: true, message: 'Precio creado con éxito', data: nuevoPrecio });
  } catch (error) {
    console.error('Error al crear el precio:', error);
    res.status(500).json({ success: false, message: 'Error al crear el precio', error: error.message });
  }
});

// Endpoint para actualizar un registro por IdListaOK
app.put('/precios/:idListaOK', async (req, res) => {
  try {
    const precioActualizado = await Precio.findOneAndUpdate(
      { IdListaOK: req.params.idListaOK },
      req.body,
      { new: true } // Devuelve el documento actualizado
    );

    if (!precioActualizado) {
      return res.status(404).json({ success: false, message: 'Precio no encontrado' });
    }

    res.json({ success: true, message: 'Precio actualizado con éxito', data: precioActualizado });
  } catch (error) {
    console.error('Error al actualizar el precio:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar el precio', error: error.message });
  }
});

// Endpoint para eliminar un registro por IdListaOK
app.delete('/precios/:idListaOK', async (req, res) => {
  try {
    const precioEliminado = await Precio.findOneAndDelete({ IdListaOK: req.params.idListaOK });

    if (!precioEliminado) {
      return res.status(404).json({ success: false, message: 'Precio no encontrado' });
    }

    res.json({ success: true, message: 'Precio eliminado con éxito', data: precioEliminado });
  } catch (error) {
    console.error('Error al eliminar el precio:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar el precio', error: error.message });
  }
});

// Endpoint de prueba de conexión
app.get('/test-connection', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ success: true, message: 'Conexión a MongoDB Atlas exitosa' });
  } catch (error) {
    console.error('Error en la conexión:', error);
    res.status(500).json({ success: false, message: 'Error en la conexión', error: error.message });
  }
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

//Para registrar solicitudes HTTP
const morgan = require('morgan');
app.use(morgan('dev'));
