import axios from 'axios';

const createApi = (endpoint: string) => {
  const baseURL = `https://pokeapi.co/api/v2/${endpoint}`;
  return axios.create({ baseURL });
};

export default createApi;
