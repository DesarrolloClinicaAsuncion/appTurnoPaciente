import { BrowserRouter, Routes,Route } from 'react-router-dom'  
import './App.css'
import Seleccion from './Seleccion.jsx'
import Navbar from './NavBar.jsx'
import Registro from './RegistrarDocumento.jsx'   
function App() {

  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="/Seleccion" element={<Seleccion />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
