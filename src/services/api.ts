import axios from 'axios';

const api = axios.create({
  //baseURL : 'http://localhost:4200/api/',
  baseURL: 'http://apphomologacao.sisvistorias.com.br/apivistoria/api/',
  //'http://appdesenv.sisvistorias.com.br/apivistoria2/api/',
  // baseURL: 'http://appdesenv.sisvistorias.com.br/apivistoria2/api/',
  // baseURL = 'http://appdesenv.allrisksolucoes.com.br/apivistoria/api/',

  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default api;
