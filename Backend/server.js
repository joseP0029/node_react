import express from "express";
import cors from "cors";

// PRIMERO creas la app
const app = express();

// Define el puerto del servidor
const PORT = 3000;

// Permitir TODOS los origenes (para desarrollo)
app.use(cors({
    origin: "*"
}));

// Middlewares
app.use(cors()); // Habilita CORS para permitir peticiones desde otros dominios
app.use(express.json()); // Parseo del cuerpo de las peticiones en formato JSON

// Ruta de prueba GET
app.get("/api/mensaje", (req, res) => {
    res.send({ texto: "Hola desde el backed "});
});

// Inicia el servidor y escucha en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`)
});