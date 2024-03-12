import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../constants";

// interface SignupResponse {
//     message: string;
//     status: number;
// }

// export const SignupApi = async (values: any): Promise<SignupResponse> => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/v1/user/register`, values, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         console.log('API response:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error in SignupApi:', error);
//         if (axios.isAxiosError(error)) {
//             const axiosError: AxiosError = error;
//             if (axiosError.response) {
//                 const data: any = axiosError.response.data;
//                 console.log(data, "data>>>>>>>>>");
//                 if (data.errors) {
//                     console.error('Server response error:', data.errors);
//                     return { message: data.errors.message, status: axiosError.response.status };
//                 }
//                 else {
//                     console.error('Server response:', data);
//                     return { message: data.message, status: axiosError.response.status };
//                 }
//             } else if (axiosError.request) {
//                 console.error('No response received from the server');
//                 return { message: 'No response from the server', status: 400 };
//             } else {
//                 console.error('Error in request setup:', axiosError.message);
//                 return { message: 'Request setup error', status: 400 };
//             }
//         } else {
//             console.error('Unknown error:', error);
//             return { message: 'Unknown error', status: 400 };
//         }
//     }
// };

// export const LoginApi = async (values: any) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/v1/user/login`, values, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log('API response:', response.data);
//       return response.data; 
//     } catch (error) {
//       console.log(error, "eeeeeeeeeeeeeeeeee");
//       return{ error }; 
//     }
// };

export const ForgetPasswordApi = async (values: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/v1/otp/send-otp`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.log(error, "getting error from Forgetpassword");
        return { error };
    }
};

// import axios, { AxiosError } from "axios";
// import { API_BASE_URL } from "../constants";

interface SignupResponse {
    message: string;
    status: number;
}

interface Contact {
    data?: any,
}

export const SignupApi = async (values: any): Promise<SignupResponse> => {
    try {
        const response = await axios.post(`http://10.10.1.75:3004/v1/user/register
`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in SignupApi:', error);
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            if (axiosError.response) {
                const data: any = axiosError.response.data;
                if (data.errors && data.errors.length > 0) {
                    const firstError = data.errors[0];
                    console.error('Server response error:', firstError);
                    return { message: firstError.msg, status: 400 };
                } else {
                    console.error('Server response:', data);
                    return { message: data.message || 'Server error', status: 400 };
                }
            } else if (axiosError.request) {
                console.error('No response received from the server');
                return { message: 'No response from the server', status: 400 };
            } else {
                console.error('Error in request setup:', axiosError.message);
                return { message: 'Request setup error', status: 400 };
            }
        } else {
            console.error('Unknown error:', error);
            return { message: 'Unknown error', status: 400 };
        }
    }
};
export const ContactDetails = async (token: any): Promise<Contact> => {
    try {
        const response = await axios.get(
            `http://10.10.1.75:3004/v1/contact/find`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-access-token": token
                },
            }
        );
        console.log("API responseee:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in Contact Details:", error);
        return { data: "Error in Contact Details" };
    }
};
export const userDetail = async (token: any): Promise<Contact> => {
    try {
        const response = await axios.get(
            `http://10.10.1.75:3004/v1/user/email`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-access-token": token
                },
            }
        );
        console.log("API response:", response);
        return response;
    } catch (error) {
        console.error("Error in Contact Details:", error);
        return { data: "Error in Contact Details" };
    }
};

export const LoginApi = async (values: any) => {
    try {
        const response = await axios.post(`http://10.10.1.75:3004/v1/user/login`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.log(error, "eeeeeeeeeeeeeeeeee");
        return { error };
    }
}
export const IdDetails = async (values: any, token: any) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/v1/user/${values}`, {
            headers: {
                'Content-Type': 'application/json',
                "api-access-token": token
            },
        });
        console.log('Id Details API response:', response.data);
        return response.data;
    } catch (error) {
        console.log(error, "eeeeeeeeeeeeeeeeee");
        return { error };
    }
}