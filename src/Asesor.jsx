import { useEffect, useState } from "react";

export default function Asesor() {
  const [turnos, setTurnos] = useState([]);
  const [turnoActual, setTurnoActual] = useState(null);
  const [llamadosAP, setLlamadosAP] = useState(0);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);

  const obtenerTurnos = async () => {
    const res = await fetch('http://172.31.2.92:3000/api/turnos/todos');
    const data = await res.json();
    setTurnos(data);

    // Reactivar botón si hay turnos disponibles
    if (data.length > 0) {
      setBotonDeshabilitado(false);
    }
  };

  useEffect(() => {
    obtenerTurnos();
    const intervalo = setInterval(obtenerTurnos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const obtenerSiguiente = async () => {
    if (turnos.length === 0) return;

    let siguiente = null;

    // Lógica: llamar 3 AP, luego 1 AN
    if (llamadosAP < 3) {
      siguiente = turnos.find(t => t.tipo_turmo === 'AP');
      if (siguiente) setLlamadosAP(llamadosAP + 1);
    }

    if (!siguiente) {
      siguiente = turnos.find(t => t.tipo_turmo === 'AN');
      if (siguiente) setLlamadosAP(0);
    }

    if (siguiente) {
      // Registrar en tabla llamados
      await fetch('http://172.31.2.92:3000/api/llamados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documento: siguiente.documento,
          tipo_turno: siguiente.tipo_turmo,
          numero_turno: siguiente.numero_turno
        })
      });

      // Eliminar de la base de datos
      await fetch(`http://172.31.2.92:3000/api/turnos/${siguiente.id}`, {
        method: 'DELETE'
      });

      setTurnoActual(siguiente);
      setTurnos(prev => prev.filter(t => t.id !== siguiente.id));
    } else {
      setTurnoActual(null);
      setBotonDeshabilitado(true);
    }
  };

  return (
    <>
      <div className="mt-4 w-75 align-items-start px-4">
        <h1 className="mb-4">Asesor</h1>
        <input type="number" className="form form-control m-5 w-25" />
        <div className="d-flex gap-4" style={{ height: '80vh' }}>
          {/* Tabla con scroll */}
          <div
            className="flex-grow-1 border rounded shadow-sm p-3 bg-white"
            style={{ overflowY: 'auto' }}
          >
            <h5 className="mb-3">Turnos actuales</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={stickyStyle}>Tipo DI</th>
                  <th style={stickyStyle}>DI</th>
                  <th style={stickyStyle}>Prioridad</th>
                  <th style={stickyStyle}>Turno</th>
                  <th style={stickyStyle}>Hora y Fecha</th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((turno, index) => (
                  <tr key={index}>
                    <td>{turno.tipo_documento}</td>
                    <td>{turno.documento}</td>
                    <td>{turno.tipo_turmo}</td>
                    <td>{turno.numero_turno}</td>
                    <td>{new Date(turno.fecha_hora).toLocaleString('es-ES')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botón y turno actual */}
          <div className="d-flex flex-column align-items-end w-50 gap-3">
            <button
              className={`btn ${botonDeshabilitado ? 'btn-secondary' : 'btn-primary'}`}
              onClick={obtenerSiguiente}
              disabled={botonDeshabilitado}
            >
              Siguiente
            </button>

            <div className="border rounded shadow p-3 bg-light text-center">
              <h5>Turno actual</h5>
              {turnoActual ? (
                <h2>
                  {turnoActual.tipo_turmo} - {turnoActual.numero_turno}
                  <h3>{turnoActual.documento}</h3>
                </h2>
              ) : (
                <span className="text-muted">Sin turno llamado</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const stickyStyle = {
  position: 'sticky',
  top: 0,
  background: '#6deccdff',
  zIndex: 2,
  borderBottom: '2px solid #0d6efd'
};
