
import { useEffect, useRef, useState } from "react";
import { Carousel } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Howl } from "howler";

export default function CarouselAutoplay() {
  const carouselRef = useRef(null);
  const carouselInstanceRef = useRef(null);
  const [llamados, setLlamados] = useState([]);
  const [overlayActivo, setOverlayActivo] = useState(false);
  const [ultimoLlamado, setUltimoLlamado] = useState(null);
  const ultimoLlamadoIdRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselInstanceRef.current = new Carousel(carouselRef.current, {
        interval: 10000,
        ride: "carousel",
      });
    }
  }, []);

  const reproducirSonido = () => {
    const sonido = new Howl({
      src: ["/sound.mp3"],
      volume: 1.0,
      html5: true,
    });

    let contador = 0;
    const reproducir = () => {
      sonido.play();
      contador++;
      if (contador < 3) {
        setTimeout(reproducir, 3000);
      }
    };
    reproducir();
  };

  useEffect(() => {
    const obtenerLlamados = async () => {
      try {
        const res = await fetch("http://192.168.10.64:3000/api/llamados/todos");
        const data = await res.json();
        setLlamados(data);

        if (data.length > 0) {
          const ultimo = data[data.length - 1];
          if (ultimo.id !== ultimoLlamadoIdRef.current) {
            ultimoLlamadoIdRef.current = ultimo.id;
            setUltimoLlamado(ultimo);

            // Pausar carrusel
            if (carouselInstanceRef.current) {
              carouselInstanceRef.current.pause();
            }

            setOverlayActivo(true);
            reproducirSonido();

            // Después de 10s ocultar overlay y reanudar
            setTimeout(() => {
              setOverlayActivo(false);
              if (carouselInstanceRef.current) {
                carouselInstanceRef.current.cycle();
              }
            }, 10000);
          }
        }
      } catch (error) {
        console.error("Error al obtener llamados:", error);
      }
    };

    obtenerLlamados();
    const intervalo = setInterval(obtenerLlamados, 2000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
        {/* Imágenes con overlay */}
        <div className="col-lg-9 col-md-8 col-sm-12 d-flex justify-content-center align-items-center position-relative">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide carousel-fade custom-carousel"
            ref={carouselRef}
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/img1.jpg" className="d-block carousel-img" alt="Imagen 1" />
              </div>
              <div className="carousel-item">
                <img src="/img2.jpg" className="d-block carousel-img" alt="Imagen 2" />
              </div>
              <div className="carousel-item">
                <img src="/img3.jpg" className="d-block carousel-img" alt="Imagen 3" />
              </div>
            </div>
          </div>

          {/* Overlay */}
          {overlayActivo && ultimoLlamado && (
            <div className="overlay d-flex flex-column justify-content-center align-items-center">
              <h1 className="text-white display-1 fw-bold">
                {ultimoLlamado.tipo_turno} - {ultimoLlamado.numero_turno}
              </h1>
              <h3 className="text-warning fw-bold">{ultimoLlamado.asesor}</h3>
            </div>
          )}

          <style jsx>{`
            .custom-carousel {
              width: 900px;
              height: 700px;
              border-radius: 20px;
              overflow: hidden;
            }
            .carousel-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.6);
              z-index: 10;
              text-align: center;
            }
          `}</style>
        </div>

        {/* Tabla */}
        <div className="col-lg-3 col-md-4 col-sm-12 bg-dark text-white p-4 h-100 d-flex flex-column">
          <h2 className="text-center mb-4 fw-bold text-info">Turnos en Atención</h2>
          <div className="flex-grow-1 overflow-auto">
            <table className="table table-dark table-hover text-center align-middle">
              <thead className="table-info sticky-top">
                <tr>
                  <th>Asesor</th>
                  <th>Tipo</th>
                  <th>Turno</th>
                </tr>
              </thead>
              <tbody>
                {llamados
                  .slice(-10)
                  .reverse()
                  .map((llamado, index) => (
                    <tr key={index}>
                      <td className="fw-bold">{llamado.asesor}</td>
                      <td>{llamado.tipo_turno}</td>
                      <td className="fs-5 text-warning fw-bold">{llamado.numero_turno}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-center small text-muted">
            Actualizado automáticamente cada 2 segundos
          </div>
        </div>
      </div>
    </div>
  );
}
