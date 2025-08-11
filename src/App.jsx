import { BrowserRouter, Routes,Route } from 'react-router-dom'  
import './App.css'
import Seleccion from './Seleccion.jsx'
import Navbar from './NavBar.jsx'
import Registro from './RegistrarDocumento.jsx'  
import Login from './login.jsx'
import Asesor from './Asesor.jsx'

function App() {

  return (
    <>
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/RegistrarDocumento" element={<Registro />} />
          <Route path="/Seleccion" element={<Seleccion />} />
          <Route path='Asesor' element={<Asesor/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
