import { useEffect, useRef, useState } from "react";
import { Carousel } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function CarouselAutoplay() {
  const carouselRef = useRef(null);
  const [llamados, setLlamados] = useState([]);

  useEffect(() => {
    if (carouselRef.current) {
      new Carousel(carouselRef.current, {
        interval: 5000, 
        ride: "carousel" 
      });
    }
  }, []);

 useEffect(() => {
  const obtenerLlamados = async () => {
    try {
      const res = await fetch("http://192.168.10.51:3000/api/llamados/todos");
      const data = await res.json();
      setLlamados(data);
    } catch (error) {
      console.error("Error al obtener llamados:", error);
    }
  };

  obtenerLlamados(); // primera carga
  const intervalo = setInterval(obtenerLlamados, 5000); // cada 5 seg
  return () => clearInterval(intervalo); // limpiar al desmontar
}, []);

  
  return (
    <>
  <div className="container-fluid">
    <div className="row g-0"> 
      <div className="col-9">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide carousel-fade"
          ref={carouselRef}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/img1.jpg"
                className="d-block w-100 carousel-img"
                alt="Imagen 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/img2.jpg"
                className="d-block w-100 carousel-img"
                alt="Imagen 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/img3.jpg"
                className="d-block w-100 carousel-img"
                alt="Imagen 3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 bg-light p-3">
        <h1>Turno</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Asesor</th>
              <th>Turno</th>
            </tr>
          </thead>
          <tbody>
              {llamados
              .slice(-10)
              .reverse()
              .map((llamados, index) =>(
                <tr key={index}>
                    <td>{llamados.asesor}</td>
                    <td>{llamados.tipo_turno}</td>
                    <td>{llamados.numero_turno}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <style jsx>{`
    .carousel-img {
      height: 100vh;
      object-fit: cover;
    }
  `}</style>
</>
  )}