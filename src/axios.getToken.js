import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.spotify.com/api/token",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${
      "d2e5beeda92d42c5a6af76a190847a62" +
      ":" +
      "23469cdad6024acd952176d41c81d970"
    }`,
  },
});
export default instance;
