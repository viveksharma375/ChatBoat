import axios from "axios";
import config from "./../config";

// default
axios.defaults.baseURL = config.API_URL;

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["api-access-token"] = token;
};

class APIClient {
  /**
   * Fetches data from given url
   */
  get = (url, params) => {
    return axios.get(url, params);
  };

  /**
   * post given data to url
   */
  create = (url, data) => {
    console.log(`in create url ${url} , data ${data}`);
    console.log("THIS IS DARTA  ", data.values);
    // console.log("this is axiosss", axios.post(url, data));
    return axios.post(url, data);
  };

  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };

  /**
   * Delete
   */
  delete = (url) => {
    return axios.put(url);
  };

  loginUser = (username, password) => {
    return axios.post("/v1/user/login", { username, password });
  };
}

export { APIClient, setAuthorization };

// loginUser = (username, password) => {
//   return axios.post("/v1/user/login", { username, password });
// };

//   registerUser = (email, password) => {
//     return axios.post("/v1/user/register", { email, password });
//   };

//   // v1/otp/send-ot
//   forgetPassword = (email) => {
//     return axios.post("/api/forget-password", { email });
//   };
