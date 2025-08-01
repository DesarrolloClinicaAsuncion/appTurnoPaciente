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
                <h1 className="text-info">Seleccione su documento de identidad</h1>
                <div className="my-4 ">
                    <select
                        className="form-select mb-3 w-auto mx-auto"
                        value={tipoDocumento}
                        onChange={handleTipoDocumentoChange}
                        aria-label="Selecciona tipo de documento"
                    >
                        <option value="">Escoge tu tipo de Documento</option>
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
                <div className="container mt-5 text-center p-4 w-50 border border-1 shadow p-3 mb-5 bg-body rounded">
                    <div>
                        <button className="btn btn-info m-2 btn-lg" onClick={() => handleButtonClick("9")}>9</button>
                        <button className="btn btn-info m-2 btn-lg" onClick={() => handleButtonClick("8")}>8</button>
                        <button className="btn btn-info m-2 btn-lg" onClick={() => handleButtonClick("7")}>7</button>
                    </div>
                    <div>
                        <button className="btn btn-info m-2 btn-lg" onClick={() => handleButtonClick("6")}>6</button>
                        <button className="btn btn-info m-2 btn-lg" onClick={() => handleButtonClick("5")}>5</button>
                        <button className="btn btn-info m-2 btn-lg" onClick={() => handleButtonClick("4")}>4</button>
                    </div>
                    <div>
                        <button className="btn btn-info m-2 btn-lg" onClick={() => handleButtonClick("3")}>3</button>
                        <button className="btn btn-info m-2 btn-lg" onClick={() => handleButtonClick("2")}>2</button>
                        <button className="btn btn-info m-2 btn-lg" onClick={() => handleButtonClick("1")}>1</button>
                    </div>
                    <div>
                        <button className="btn btn-info m-2 btn-lg" onClick={() => handleButtonClick("0")}>0</button>
                    </div>
                    <div>
                        <button className=" btn m-2 btn-lg" onClick={handleBorrar}><img src="/close.svg" style={{ width: '85px', height: '85px'}} alt="cerrar" /></button>
                        <button className="btn  m-2 btn-lg" onClick={handleEnviar}><img src="/ok.svg" style={{ width: 'px', height: '80px'}} alt="aceptar" /></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegistrarDocumento;