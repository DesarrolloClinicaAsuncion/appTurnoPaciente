import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function SeleccionarPrioridad() {
    const location = useLocation();
    const navigate = useNavigate();
    const { numero, tipoDocumento } = location.state || { numero: "", tipoDocumento: "" };
    const [showModal, setShowModal] = useState(false);
    const [turno, setTurno] = useState("");

    const handleTurno = (tipoTurno) => {
        setTurno(tipoTurno);
        setShowModal(true);
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
                                <h5 className="modal-title">Su Turno es:</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCerrar}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <strong>Turno:</strong> {turno}
                                    <br />
                                    <strong>Documento:</strong> {tipoDocumento} {numero}
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCerrar}
                                >
                                    Cerrar
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