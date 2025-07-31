function RegistrarDocumento() {
    return (
        <>
        <div className="container mt-5 text-center">
            <h1>Seleccione su documento de identidad</h1>
            <select className="form-select" aria-label="Default select example">
                <option selected>Escoge tu Documento</option>
                <option value="1">Cédula de Ciudadanía</option>
                <option value="2">Tarjeta de Identidad</option>
                <option value="3">Cédula de Extrangería</option>
            </select>
        </div>
            
        </>
    );
};

export default RegistrarDocumento;