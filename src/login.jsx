import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (usuario === "admin" && contrasena === "admin") {
      navigate("/RegistrarDocumento");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container w-50 border text-center mt-5 border border-1 shadow p-3 mb-5 bg-body rounded">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="form-control m-2"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          className="form-control m-2"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button type="submit" className="btn btn-info m-2">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
