import axios from 'axios';

const listarTareas = () => {
  return axios.get(`http://localhost:8080/api/tasks`);
};

const crearTareas = (data: {}) => {
  return axios.post(`http://localhost:8080/api/tasks`, data);
};


export const taskService = {
  listarTareas,
  crearTareas,
};
