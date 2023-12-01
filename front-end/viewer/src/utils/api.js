import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const fetchCountryDetails = async (query) => {
  try {
    const apiPath = Object.keys(query)[0];
    const apiParam = query[apiPath];
    const response = await axios.get(`${baseURL}/api/countries/${apiPath}/${apiParam}`);

    return response.data;
  } catch (error) {
        if (error.response) {
        console.error("Error response:", error.response.data);
        throw new Error(error.response.data.message || 'Error retrieving data');
        } else if (error.request) {
        console.error("Error request:", error.request);
        throw new Error('No response from server. Try it later!');
        } else {
        console.error("Error message:", error.message);
        throw new Error('Something Wrong. Try it later!');
        }
  }
};
