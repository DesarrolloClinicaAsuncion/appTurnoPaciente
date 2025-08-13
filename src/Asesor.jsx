import { useEffect, useState } from "react";

export default function Asesor() {
  const [turnos, setTurnos] = useState([]);
  const [turnoActual, setTurnoActual] = useState(null);
  const [llamadosAP, setLlamadosAP] = useState(0);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
  const [asesor, setAsesor] = useState("");
  const [llamados, setLlamados] = useState([]);

  const obtenerTurnos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/turnos/todos");
      const data = await res.json();
      setTurnos(data);
    } catch (error) {
      console.error("Error al obtener turnos:", error);
    }
  };

  const handleClick = () => {
    setBotonDeshabilitado(true);
    setTimeout(() => setBotonDeshabilitado(false), 30000);
  };

  useEffect(() => {
    obtenerTurnos();
    const intervalo = setInterval(obtenerTurnos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const obtenerSiguiente = async () => {
    if (turnos.length === 0) return;

    let siguiente = null;

    if (llamadosAP < 3) {
      siguiente = turnos.find((t) => t.tipo_turmo === "AP" && !t.estado);
      if (siguiente) setLlamadosAP(llamadosAP + 1);
    }

    if (!siguiente) {
      siguiente = turnos.find((t) => t.tipo_turmo === "AN" && !t.estado);
      if (siguiente) setLlamadosAP(0);
    }

    if (siguiente) {
      // 1️⃣ Actualizar estado a true en la base de datos
      const updateRes = await fetch(`http://localhost:3000/api/turnos/${siguiente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: true })
      });

      if (updateRes.ok) {
        await fetch("http://localhost:3000/api/llamados", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            documento: siguiente.documento,
            tipo_turno: siguiente.tipo_turmo,
            numero_turno: siguiente.numero_turno,
            asesor: asesor
          })
        });
      
        await obtenerTurnos();
        setTurnoActual({ ...siguiente, estado: true });
      }
    } else {
      setTurnoActual(null);
      setBotonDeshabilitado(true);
    }
  };

  useEffect(() => {
    const obtenerLlamados = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/llamados/todos");
        const data = await res.json();
        setLlamados(data);
      } catch (error) {
        console.error("Error al obtener llamados:", error);
      }
    };

    obtenerLlamados();
    const intervalo = setInterval(obtenerLlamados, 2000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">

        {/* Selector de asesor */}
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <label className="form-label fw-bold">Selecciona un asesor</label>
              <select
                className="form-select"
                value={asesor}
                onChange={(e) => setAsesor(e.target.value)}
              >
                <option value="">-- Seleccionar --</option>
                <option value="Asesor 1">Asesor 1</option>
                <option value="Asesor 2">Asesor 2</option>
                <option value="Asesor 3">Asesor 3</option>
                <option value="Asesor 4">Asesor 4</option>
                <option value="Asesor 5">Asesor 5</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de turnos actuales */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-primary text-white fw-bold">
              Turnos actuales
            </div>
            <div className="card-body p-0" style={{ maxHeight: "50vh", overflowY: "auto" }}>
              <table className="table table-hover table-sm mb-0">
                <thead className="table-light" style={{ position: "sticky", top: 0 }}>
                  <tr>
                    <th>Tipo DI</th>
                    <th>DI</th>
                    <th>Prioridad</th>
                    <th>Turno</th>
                    <th>Fecha/Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {turnos.map((t, i) => (
                    <tr
                      key={i}
                      style={{
                        backgroundColor: t.estado ? "#ffecb3" : "transparent" // Naranja suave
                      }}
                    >
                      <td>{t.tipo_documento}</td>
                      <td>{t.documento}</td>
                      <td>{t.tipo_turmo}</td>
                      <td>{t.numero_turno}</td>
                      <td>{t.fecha_hora.replace("T", " ").substring(0, 19)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Botón y turno actual */}
        <div className="col-lg-3">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body text-center">
              <button
                className={`btn btn-lg ${botonDeshabilitado ? "btn-secondary" : "btn-success"} w-100`}
                disabled={botonDeshabilitado}
                onClick={() => { obtenerSiguiente(); handleClick(); }}
              >
                Siguiente
              </button>
            </div>
          </div>
          <div className="card shadow-sm border-0">
            <div className="card-header bg-info text-white fw-bold">
              Turno actual
            </div>
            <div className="card-body text-center">
              {turnoActual ? (
                <>
                  <h2 className="mb-1">{turnoActual.tipo_turmo} - {turnoActual.numero_turno}</h2>
                  <p className="text-muted">{turnoActual.documento}</p>
                </>
              ) : (
                <span className="text-muted">Sin turno llamado</span>
              )}
            </div>
          </div>
        </div>

        {/* Últimos llamados */}
        <div className="col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-warning fw-bold">
              Últimos llamados
            </div>
            <div className="card-body p-0">
              <table className="table table-striped table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Asesor</th>
                    <th>Tipo</th>
                    <th>Turno</th>
                  </tr>
                </thead>
                <tbody>
                  {llamados.slice(-10).reverse().map((l, i) => (
                    <tr key={i}>
                      <td>{l.asesor}</td>
                      <td>{l.tipo_turno}</td>
                      <td>{l.numero_turno}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
