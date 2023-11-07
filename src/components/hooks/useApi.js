import axios from "axios";
import { parseErrors } from "../../utils/parseErrors";

const BACKEND_URL = "http://localhost:1337/api";

console.log("checking", import.meta.env);

export const useApi = () => {
  const request = async (endpoint, options = {}) => {
    try {
      const res = await axios({
        method: options.method || "GET",
        url: `${BACKEND_URL}/${endpoint}`,
        data: options.data || {},
        params: options.params || {},
      });
      if (options.onSuccess) {
        options.onSuccess(res); //this "if statement" can be written in 1 line as "options.onSuccess && options.onSuccess(res)"
      }
    } catch (err) {
      options.onFailure && options.onFailure(parseErrors(err));
    }
  };

  return {
    post: (endpoint, options) =>
      request(endpoint, { ...options, method: "POST" }),
    get: (endpoint, options) =>
      request(endpoint, { ...options, method: "GET" }),
    put: (endpoint, options) =>
      request(endpoint, { ...options, method: "PUT" }),
    delete: (endpoint, options) =>
      request(endpoint, { ...options, method: "DELETE" }),
  };
};
