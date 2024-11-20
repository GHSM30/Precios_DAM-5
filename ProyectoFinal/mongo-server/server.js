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
}).then(() => {
  console.log('Conexión exitosa a MongoDB');
}).catch((err) => {
  console.error('Error de conexión a MongoDB:', err);
});

// Definir el esquema para la colección "Institutos" basado en Yup
const instituteSchema = new mongoose.Schema({
  IdInstitutoOK: {
    type: String,
    required: true
  },
  IdInstitutoBK: {
    type: String,
    required: true
  },
  DesInstituto: {
    type: String,
    required: true
  },
  Matriz: {
    type: String,
    required: true,
    maxlength: 1,
    enum: ['N', 'S'] // Solo se permiten 'N' o 'S'
  },
  IdTipoGiroOK: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9-]+$/ // Solo caracteres alfanuméricos y '-'
  },
  IdInstitutoSupOK: {
    type: String,
    default: null
  }
}, { collection: 'Institutos' });  // Asegúrate de que el nombre de la colección esté configurado

// Crear el modelo basado en el esquema
const Institute = mongoose.model('Institute', instituteSchema);

// Endpoint para consultar todos los institutos
app.get('/institutos', async (req, res) => {
  try {
    const institutos = await Institute.find();
    console.log('Se encontraron institutos');

    if (institutos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron institutos'
      });
    }

    res.json({
      success: true,
      message: 'Institutos encontrados',
      data: institutos
    });
  } catch (error) {
    console.error('Error al obtener los institutos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los institutos',
      error: error.message
    });
  }
});

// Endpoint para insertar un solo instituto
app.post('/api/v1/institutes', async (req, res) => {
  try {
    const nuevoInstituto = new Institute(req.body);
    await nuevoInstituto.save();
    res.status(201).json({
      success: true,
      message: 'Instituto creado con éxito',
      data: nuevoInstituto
    });
  } catch (error) {
    console.error('Error al crear el instituto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el instituto',
      error: error.message
    });
  }
});

//Endpoint de prueba
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