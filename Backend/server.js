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
    res.send({ texto: "Hola desde el backend "});
});

// =======================================================
// JUEGO: ADIVINA EL NÚMERO
// Número secreto inicial
let numeroSecreto = Math.floor(Math.random()*100) + 1;

// Reiniciar el juego
app.get("/api/start", (req, res) => {
    numeroSecreto = Math.floor(Math.random()*100) + 1;
    // Enviamos el número secreto también al frontend para verlo en la consola del navegador
    res.json({
        mensaje: "Nuevo juego iniciado. Adivina un número entre 1 y 100.",
        numeroSecreto // Solo para depuración
    });
});

// Endpoint para adivinar
app.post("/api/guess", (req, res) => {
    const intento = req.body.numero;

    // Validación básica
    if (!intento && intento !== 0) {
        return res.status(400).json({ mensaje: "Debes enviar un número."});
    }

    // Comparación con número secreto
    if (intento < numeroSecreto) {
        res.json({ mensaje: "El número secreto es mayor ⬆️"});
    } else if (intento > numeroSecreto) {
        res.json({ mensaje: "El número secreto es menor ⬇️"});
    } else {
        res.json({ mensaje: " Correcto! Adivinaste el número."});
    }
});

// Inicia el servidor y escucha en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`)
});