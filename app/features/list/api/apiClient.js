import axios from 'axios';

const options = { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiIsImxvZ2dlZF9jb21wYW55IjoiMSIsImNvbXBhbnlfZG9tYWluIjoicXVhbHl0ZWFtIiwiZXhwIjoxNTIyMzc0NjUzLCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xLyIsImF1ZCI6Imh0dHA6Ly8xMjcuMC4wLjEvIn0.YUJ5w2Kh07hQJZb_r0XPBsIXEisDMwm0nk8KD0tKZMs' } };

const fetch = params => axios.get(`https://qualyteamdoc-dev-1.azurewebsites.net/api/documents/?page=${params.page}&status=1`, options)
  .then((response) => {
    return response.data;
  })
  .catch((err) => console.log(err));

export default fetch;

