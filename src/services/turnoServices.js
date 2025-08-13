import axios from "axios";

const API_URL = "http://localhost:3000/api/turnos";

//const API_URL = "http://192.168.10.51:3000/api/turnos";

export const crearTurno = async (documento, tipo_turno,tipo_documento) => {
  return axios.post(API_URL, { documento, tipo_turno,tipo_documento });
};
