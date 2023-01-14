import axios from "axios";

const baseURL = "http://bioinfo08.mu.edu.tr:8080/api/";

const axiosConf = axios.create({
  baseURL,
});

export default axiosConf;
