import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const getStockValue = async (ticker) => {
  const value = await axios
    .get(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${API_KEY}`
    )
    .then((item) => item.data.results[0].c);

  return value;
};

export default getStockValue;
