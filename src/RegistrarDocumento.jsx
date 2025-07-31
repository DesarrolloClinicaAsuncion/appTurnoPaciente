import React, { useState } from "react";

function RegistrarDocumento() {
    const [numero, setNumero] = useState("");

    const handleButtonClick = (valor) => {
        setNumero((prev) => prev + valor);
    };

    const handleBorrar = () => {
        setNumero("");
    };

    return (
        <>
        <div className="container mt-5 text-center">
            <h1>Seleccione su documento de identidad</h1>
            <div className="my-4">
                <select className="form-select mb-3 w-auto mx-auto" aria-label="Default select example">
                    <option defaultValue>Escoge tu Documento</option>
                    <option value="1">Cédula de Ciudadanía</option>
                    <option value="2">Tarjeta de Identidad</option>
                    <option value="3">Cédula de Extrangería</option>
                </select>
                <input
                    type="number"
                    className="form-control w-auto mx-auto"
                    placeholder="Número de documento"
                    value={numero}
                    readOnly
                />
            </div>
            <div className="container mt-5 text-center">
                <div>
                    <button className="btn btn-secondary m-2" onClick={() => handleButtonClick("9")}>9</button>
                    <button className="btn btn-secondary m-2" onClick={() => handleButtonClick("8")}>8</button>
                    <button className="btn btn-secondary m-2" onClick={() => handleButtonClick("7")}>7</button>
                </div>
                <div>
                    <button className="btn btn-secondary m-2" onClick={() => handleButtonClick("6")}>6</button>
                    <button className="btn btn-secondary m-2" onClick={() => handleButtonClick("5")}>5</button>
                    <button className="btn btn-secondary m-2" onClick={() => handleButtonClick("4")}>4</button>
                </div>
                <div>
                    <button className="btn btn-secondary m-2" onClick={() => handleButtonClick("3")}>3</button>
                    <button className="btn btn-secondary m-2" onClick={() => handleButtonClick("2")}>2</button>
                    <button className="btn btn-secondary m-2" onClick={() => handleButtonClick("1")}>1</button>
                </div>
                <div>
                    <button className="btn btn-secondary m-2" onClick={() => handleButtonClick("0")}>0</button>
                </div>
                <div>
                    <button className="btn btn-danger m-2" onClick={handleBorrar}>Borrar</button>
                    <button className="btn btn-success m-2">Enviar</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default RegistrarDocumento;