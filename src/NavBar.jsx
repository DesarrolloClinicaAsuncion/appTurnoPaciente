import './NavBar.css';
function Navbar(){
    return(
<>
       
<nav className="navbar" id='navbar'>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src="/logo.png" 
      alt="" 
      width="150" 
      height="50" 
      className="d-inline-block align-text-top text-light" />
      
    </a>
  </div>
</nav>
</>
    
)}

export default Navbar;