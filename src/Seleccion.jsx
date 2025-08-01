import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { crearTurno } from "./services/turnoServices"; // importa tu servicio

function SeleccionarPrioridad() {
    const location = useLocation();
    const navigate = useNavigate();
    const { numero, tipoDocumento } = location.state || { numero: "", tipoDocumento: "" };


    const [showModal, setShowModal] = useState(false);
    const [numeroTurno, setNumeroTurno] = useState("");
    const [turno, setTurno] = useState("");
    const [fechaHora, setFechaHora] = useState("");
    const [tipoDoc, setTipoDoc] = useState("");


    const handleTurno = async (tipoTurno) => {
        try {
            const res = await crearTurno(numero, tipoTurno, tipoDocumento); 
            const data = res.data;

            setNumeroTurno(data.numero_turno);
            setTurno(data.tipo_turno);
            setTipoDoc(data.tipo_documento);
            //setFechaHora(new Date(data.fecha_hora).toLocaleString());
            setFechaHora(data.fecha_hora);
            setShowModal(true);
        } catch (error) {
            alert("Error al asignar el turno");
            console.error(error);
        }
    };


    const handleCerrar = () => {
        setShowModal(false);
        navigate("/");
    };

    return (
        <>
            <div className="container w-75 mt-5 text-center">
                <h1 className="text text-primary">Seleccione una opcion para su turno</h1>
                <button
                    className="btn btn-primary m-5 btn-lg"
                    onClick={() => handleTurno("AN")}
                >
                    Normal
                </button>
                <button
                    className="btn btn-primary m-5 btn-lg"
                    onClick={() => handleTurno("AP")}
                >
                    Prioritario
                </button>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"></h5><h1 className="text-center"><strong>Turno:</strong> {turno}{numeroTurno}</h1>
                                <button type="button" className="btn-close" onClick={handleCerrar}></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <strong>Documento:</strong> {tipoDocumento} {numero} <br />
                                    <strong>Fecha y hora:</strong> {fechaHora}
                                </p>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn" onClick={handleCerrar}>
                                    <img src="/close.svg" style={{ width: '85px', height: '85px'}} alt="cerrar" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SeleccionarPrioridad;
