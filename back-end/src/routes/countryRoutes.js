import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/api/countries/code/:code', async (req, res) => {
    const code = req.params.code;
  if (!code) {
    return res.status(404).json({ status: 404, message: "Country Not Found" });
  }

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    res.json(response.data);
  } catch (error) {
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      res.status(404).json({ status: 404, message: "Country Not Found" });
    } else {
      res.status(500).json({ status: 500, message: "Server Error. Couldn't retrieve data now." });
    }
  }
});

router.get('/api/countries/name/:name', async (req, res) => {
    const name = req.params.name;
  if (!name) {
    return res.status(404).json({ status: 404, message: "Country Not Found" });
  }

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    res.json(response.data);
  } catch (error) {
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      res.status(404).json({ status: 404, message: "Country Not Found" });
    } else {
      res.status(500).json({ status: 500, message: "Server Error. Couldn't retrieve data now." });
    }
  }
});

export default router;
