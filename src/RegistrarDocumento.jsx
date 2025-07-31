import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    return (
        <>
            <div className="container mt-2 text-center">
                <h1>Seleccione su documento de identidad</h1>
                <div className="my-4">
                    <select
                        className="form-select mb-3 w-auto mx-auto"
                        value={tipoDocumento}
                        onChange={handleTipoDocumentoChange}
                        aria-label="Selecciona tipo de documento"
                    >
                        <option value="">Escoge tu Documento</option>
                        <option value="C.C">Cédula de Ciudadanía</option>
                        <option value="T.I">Tarjeta de Identidad</option>
                        <option value="C.E">Cédula de Extranjería</option>
                    </select>
                    <input
                        type="number"
                        className="form-control w-auto mx-auto"
                        placeholder="Número de documento"
                        value={numero}
                        readOnly
                    />
                </div>
                <div className="container mt-5 text-center p-4 w-100">
                    <div>
                        <button className="btn btn-secondary m-2 btn-lg" onClick={() => handleButtonClick("9")}>9</button>
                        <button className="btn btn-secondary m-2 btn-lg" onClick={() => handleButtonClick("8")}>8</button>
                        <button className="btn btn-secondary m-2 btn-lg" onClick={() => handleButtonClick("7")}>7</button>
                    </div>
                    <div>
                        <button className="btn btn-secondary m-2 btn-lg" onClick={() => handleButtonClick("6")}>6</button>
                        <button className="btn btn-secondary m-2 btn-lg" onClick={() => handleButtonClick("5")}>5</button>
                        <button className="btn btn-secondary m-2 btn-lg" onClick={() => handleButtonClick("4")}>4</button>
                    </div>
                    <div>
                        <button className="btn btn-secondary m-2 btn-lg" onClick={() => handleButtonClick("3")}>3</button>
                        <button className="btn btn-secondary m-2 btn-lg" onClick={() => handleButtonClick("2")}>2</button>
                        <button className="btn btn-secondary m-2 btn-lg" onClick={() => handleButtonClick("1")}>1</button>
                    </div>
                    <div>
                        <button className="btn btn-secondary m-2 btn-lg" onClick={() => handleButtonClick("0")}>0</button>
                    </div>
                    <div>
                        <button className="btn btn-danger m-2 btn-lg" onClick={handleBorrar}>Borrar</button>
                        <button className="btn btn-success m-2 btn-lg" onClick={handleEnviar}>Enviar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegistrarDocumento;