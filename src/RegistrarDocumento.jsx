import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bs0Square } from "react-icons/bs";
import {
    RiNumber1, RiNumber2, RiNumber3, RiNumber4,RiNumber0,
    RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9
} from "react-icons/ri";

function RegistrarDocumento() {
    const [numero, setNumero] = useState("");
    const navigate = useNavigate();
    const [tipoDocumento, setTipoDocumento] = useState("");

    const handleButtonClick = (valor) => {
        setNumero((prev) => prev + valor);
    };

    const handleTipoDocumentoChange = (event) => {
        setTipoDocumento(event.target.value);
    };

    const handleBorrar = () => {
        setNumero("");
    };

    const handleEnviar = () => {
        navigate("/seleccion", { state: { numero, tipoDocumento } });
    };

    function activarPantallaCompleta() {
        const elemento = document.documentElement;
        if (elemento.requestFullscreen) {
            elemento.requestFullscreen();
        } else if (elemento.webkitRequestFullscreen) {
            elemento.webkitRequestFullscreen(); // Safari
        } else if (elemento.msRequestFullscreen) {
            elemento.msRequestFullscreen(); // IE11
        }
    }


    return (
        <>
            <div className="container mt-1 text-center">
                <h1 className="text" style={{ color: "#29aaac" }}>Ingresa tu documento de identidad</h1>
                <div className="my-2 text-center">
                    <p className="mb-1 fw-bold">Escoge tu tipo de documento:</p>

                    <div className="btn-group mb-1" role="group" aria-label="Tipo de documento">
                        {["C.C", "T.I", "R.C", "Otro"].map((tipo) => (
                            <button
                                key={tipo}
                                type="button"
                                className={`btn btn-outline-success ${tipoDocumento === tipo ? "active" : ""}`}
                                onClick={() => handleTipoDocumentoChange({ target: { value: tipo } })}
                            >
                                {tipo === "C.C" && "Cédula de Ciudadanía"}
                                {tipo === "T.I" && "Tarjeta de Identidad"}
                                {tipo === "R.C" && "Registro Civil"}
                                {tipo === "Otro" && "Otro"}
                            </button>
                        ))}
                    </div>

                </div>
                <div>
                    <input
                        type="number"
                        className="form-control form-control-lg w-75 mx-auto"
                        placeholder="Número de documento"
                        value={numero}
                        readOnly
                    />
                </div>

                <div className="container mt-2 text-center p-2 w-50 border border-1 shadow p-3 mb-5  rounded"
                    style={{backgroundColor: "#E8E8E8"}}
                >
                    <div>
                        <button className="btn m-2 btn-lg shadow"
                            style={{ backgroundColor: "#29aaac", color: "white" }}
                            onClick={() => handleButtonClick("1")}
                        ><RiNumber1 /></button>
                        <button className="btn  m-2 btn-lg shadow"
                            style={{ backgroundColor: "#29aaac", color: "white" }}
                            onClick={() => handleButtonClick("2")}
                        ><RiNumber2 /></button>
                        <button className="btn  m-2 btn-lg"
                            style={{ backgroundColor: "#29aaac", color: "white" }}
                            onClick={() => handleButtonClick("3")}
                        ><RiNumber3 /></button>
                    </div>
                    <div>
                        <button className="btn  m-2 btn-lg"
                            style={{ backgroundColor: "#29aaac", color: "white" }}
                            onClick={() => handleButtonClick("4")}
                        ><RiNumber4 /></button>
                        <button className="btn  m-2 btn-lg"
                            style={{ backgroundColor: "#29aaac", color: "white" }}
                            onClick={() => handleButtonClick("5")}
                        ><RiNumber5 /></button>
                        <button className="btn  m-2 btn-lg"
                            style={{ backgroundColor: "#29aaac", color: "white" }}
                            onClick={() => handleButtonClick("6")}
                        ><RiNumber6 /></button>
                    </div>
                    <div>
                        <button className="btn  m-2 btn-lg"
                            style={{ backgroundColor: "#29aaac", color: "white" }}
                            onClick={() => handleButtonClick("7")}
                        ><RiNumber7 /></button>
                        <button className="btn  m-2 btn-lg"
                            style={{ backgroundColor: "#29aaac", color: "white" }}
                            onClick={() => handleButtonClick("8")}
                        ><RiNumber8 /></button>
                        <button className="btn  m-2 btn-lg"
                            style={{ backgroundColor: "#29aaac", color: "white" }}
                            onClick={() => handleButtonClick("9")}
                        ><RiNumber9 /></button>
                    </div>
                    <div>
                        <button className="btn  m-2 btn-lg"
                            style={{ backgroundColor: "#29aaac", color: "white" }}
                            onClick={() => handleButtonClick("0")}
                        ><RiNumber0 /></button>
                    </div>
                    <div>
                        <button className=" btn m-2 btn-lg"
                            onClick={handleBorrar}><img src="/close.svg"
                                style={{ width: '85px', height: '85px' }} alt="cerrar" /></button>
                        <button className="btn  m-2 btn-lg"
                            onClick={handleEnviar}><img src="/ok.svg"
                                style={{ width: 'px', height: '80px' }} alt="aceptar" /></button>
                    </div>
                </div>
                <div><p className="text text-secondary">Departamento de desarrollo CLA</p></div>
            </div>
            <button className="btn btn-light" onClick={activarPantallaCompleta}>[ ]</button>
        </>
    );
};

export default RegistrarDocumento;