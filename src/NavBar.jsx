import './NavBar.css';
import Reloj from './Reloj';

function Navbar() {
  return (
    <>
  <nav className="navbar" id="navbar">
    <div className="container-fluid">
      <a className="navbar-brand text-light" href="#">
        <img
          src="/logo.png"
          alt=""
          width="100"
          height="50"
          className="d-inline-block align-text-top"
        />
      </a>

      <h3 className="text-white mb-0  m-2 p-2">
        <Reloj/>
      </h3>
    </div>
  </nav>
</>


  )
}

export default Navbar;