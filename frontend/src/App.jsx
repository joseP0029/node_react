import { useEffect } from 'react';
import { useState } from 'react'

// Componente principal de la aplicación
function App() {
  // Estado para guardar el mensaje que viene del backend
  const [mensaje, setMensaje] = useState("");

  // Estado del juego (Adivina el Número)
  const [mensajeJuego, setMensajeJuego] = useState("Haz clic en Reiniciar para comenzar");
  const [numero, setNumero] = useState("");

  // Hook que se ejecuta una sola vez al cargar el componente
  useEffect(() => {
    // Hace una petición GET al backend
    fetch("/api/mensaje").then(res => res.json()).then(data => setMensaje(data.texto));
  }, []);
  
  // Función para reiniciar el juego (Adivina el Número)
  const reiniciarJuego = async () => {
    const res = await fetch("/api/start");
    const data = await res.json();

    // Console.log("Número secreto (solo consola frontend):", data.numeroSecreto);
    setMensajeJuego(data.mensaje);
    setNumero("");
  };

  // Función para enviar intento (Adivina el Número)
  const enviarIntento = async () => {
    const res = await fetch("/api/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ numero: Number(numero)})
    });
    const data = await res.json();
    setMensajeJuego(data.mensaje);
  };

  // Renderiza el contenido en pantalla
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center"}}>
      {/* ------------------- SECCIÓN ADIVINA EL NÚMERO ------------------- */}
      {/* Mensaje backend */}
      <h1 style={{color: "#2d3436"}}>Frontend conectado</h1>
      <p style={{ fontSize: "1.2rem", color: "#0984e3"}}>{mensaje}</p>
      <hr style={{ margin: "20px 0"}} />
      {/* Sección de juego */}
      <h1>🎲 Juego: Adivina el Número</h1>
      <p style={{ fontSize: "1.2rem", color: "#d63031"}}>{mensajeJuego}</p>
      
      {/* Input y botones con estilo */}
      <input
        type="number"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder='Escribe un número'
        style={{
          padding: "10px 15px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "2px solid #0984e3",
          width: "150px",
          textAlign: "center",
          marginBottom: "15px"
        }}
      />
      <br/>

      <button
        onClick={enviarIntento}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#00b894",
          color: "#fff",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
        onMouseOver={e => e.target.style.backgroundColor = "#019875"}
        onMouseOut={e => e.target.style.backgroundColor = "#00b894"}
        >
        Intentar
      </button>

      <button
        onClick={reiniciarJuego}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#0984e3",
          color: "#fff",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
        onMouseOver={e => e.target.style.backgroundColor = "#0652dd"}
        onMouseOut={e => e.target.style.backgroundColor = "#0984e3"}
        >
        Reiniciar Juego
      </button>
    </div>
  )
}

export default App
