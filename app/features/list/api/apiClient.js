import axios from 'axios';

const options = { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiIsImxvZ2dlZF9jb21wYW55IjoiMSIsImNvbXBhbnlfZG9tYWluIjoicXVhbHl0ZWFtIiwiZXhwIjoxNTIxNjgxMTQ3LCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xLyIsImF1ZCI6Imh0dHA6Ly8xMjcuMC4wLjEvIn0.tLajRDPu4ISdDCIZzex0r-PeCGfKuIFxN5u31OefXkc' } };

const fetch = (params) => {
  return axios.get(`https://qualyteamdoc.azurewebsites.net/api/documents/?page=${params.page}&status=1`, options)
    .then(response => response.data)
    .catch(() => alert('api error'));
};

export default fetch;

