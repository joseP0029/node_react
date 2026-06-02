import { useEffect } from 'react';
import { useState } from 'react'

// Componente principal de la aplicación
function App() {
  // Estado para guardar el mensaje que viene del backend
  const [mensaje, setMensaje] = useState("");
  // Hook que se ejecuta una sola vez al cargar el componente
  useEffect(() => {
    // Hace una petición GET al backend
    fetch("/api/mensaje").then(res => res.json()).then(data => setMensaje(data.texto));
  }, []);
  
  // Renderiza el contenido en pantalla
  return (
    <div>
      <h1>Frontend conectado</h1>
      {/* Muestra el mensaje recibido del backend */}
      <p>{mensaje}</p>
    </div>
  )
}

export default App
