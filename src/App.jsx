import { BrowserRouter, Routes,Route } from 'react-router-dom'  
import './App.css'
import Seleccion from './Seleccion.jsx'
import Navbar from './NavBar.jsx'
import Registro from './RegistrarDocumento.jsx'  
import Login from './login.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
        </Routes>
      </BrowserRouter>
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/RegistrarDocumento" element={<Registro />} />
          <Route path="/Seleccion" element={<Seleccion />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
