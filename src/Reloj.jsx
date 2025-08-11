import { useState, useEffect } from 'react';

export default function RelojEnVivo() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const temporizador = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(temporizador);
  }, []);

  return <div>{hora.toLocaleTimeString()}</div>;
}
