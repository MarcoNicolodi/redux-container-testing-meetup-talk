import axios from "axios";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTEyIiwibG9nZ2VkX2NvbXBhbnkiOiI3IiwiY29tcGFueV9kb21haW4iOiJxdWFseXRlYW0tb2ZpY2lhbCIsImV4cCI6MTUyNDI2OTIyOCwiaXNzIjoiaHR0cDovLzEyNy4wLjAuMS8iLCJhdWQiOiJodHRwOi8vMTI3LjAuMC4xLyJ9.-f12beTRtmV4V4Jj1eJpA06Uu9ooX2tV7yEFbItInlg"
  }
};

const fetch = params =>
  axios
    .get(
      `https://qualyteamdoc.azurewebsites.net/api/documents/?page=${
        params.page
      }&status=1`,
      options
    )
    .then(response => response.data);

export default fetch;
