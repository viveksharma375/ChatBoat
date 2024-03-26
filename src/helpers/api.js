// api.js

class API {
    constructor(baseURL) {
      this.baseURL = "http://10.10.1.75:3004/v1";
    }
  
    // Function to handle errors
    handleErrors(response) {
        
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  
    // Function to make a GET request
    async get(endpoint) {
      try {
        const response = await fetch(this.baseURL + endpoint, {  method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
     });
        this.handleErrors(response);
        return response.json();
      } catch (error) {
        console.error("Error during GET request:", error);
        throw error;
      }
    }

    async getWithToken(endpoint,token=null) {
        try {
            console.log("nsodifs v",this.baseURL+endpoint)
          const response = await fetch(this.baseURL + endpoint, {  method: "GET",
          headers: {
            "Content-Type": "application/json",
            "api-access-token":token,
          }, });
          this.handleErrors(response);
          const data = await response.json()
          return {message: data.data.result,status :true};
        } catch (error) {
          console.error("Error during GET request:", error);
          return {message:error,status:false}
        }
      }
  
    // Function to make a POST request
    async post(endpoint, data) {
      try {
        const response = await fetch(this.baseURL + endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        this.handleErrors(response);
        return response.json();
      } catch (error) {
        console.error("Error during POST request:", error);
        throw error;
      }
    }
  
    // Function to make a PUT request
    async put(endpoint, data) {
      try {
        const response = await fetch(this.baseURL + endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        this.handleErrors(response);
        return response.json();
      } catch (error) {
        console.error("Error during PUT request:", error);
        throw error;
      }
    }
  
    // Function to make a DELETE request
    async remove(endpoint) {
      try {
        const response = await fetch(this.baseURL + endpoint, {
          method: "DELETE",
        });
        this.handleErrors(response);
        return response.json();
      } catch (error) {
        console.error("Error during DELETE request:", error);
        throw error;
      }
    }
  }
  
  export default API;
  

// // Function to handle errors
// const handleErrors = (response) => {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   return response;
// };

// // Function to make a GET request
// export const get = async (endpoint) => {
//   try {
//     const response = await fetch(baseURL + endpoint);
//     handleErrors(response);
//     return response.json();
//   } catch (error) {
//     console.error("Error during GET request:", error);
//     throw error;
//   }
// };

// export const getWithToken = async (endpoint, token) => {
//     try {
//       const response = await fetch(baseURL + endpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       handleErrors(response);
//       return response.json();
//     } catch (error) {
//       console.error("Error during GET request with token:", error);
//       throw error;
//     }
//   };

// // Function to make a POST request
// export const post = async (endpoint, data) => {
//   try {
//     const response = await fetch(baseURL + endpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     handleErrors(response);
//     return response.json();
//   } catch (error) {
//     console.error("Error during POST request:", error);
//     throw error;
//   }
// };

// // Function to make a PUT request
// export const put = async (endpoint, data) => {
//   try {
//     const response = await fetch(baseURL + endpoint, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     handleErrors(response);
//     return response.json();
//   } catch (error) {
//     console.error("Error during PUT request:", error);
//     throw error;
//   }
// };

// // Function to make a DELETE request
// export const remove = async (endpoint) => {
//   try {
//     const response = await fetch(baseURL + endpoint, {
//       method: "DELETE",
//     });
//     handleErrors(response);
//     return response.json();
//   } catch (error) {
//     console.error("Error during DELETE request:", error);
//     throw error;
//   }
// };
