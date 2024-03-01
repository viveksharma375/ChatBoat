import "./Login.scss";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CommonButton from '../../Components/CommonComponents/CommonButton/CommonButton';
import CommonInput from '../../Components/CommonComponents/CommonInput/CommonInput';
import CommonLabel from '../../Components/CommonComponents/CommonLabel/CommonLabel';
import CommonHeading from '../../Components/CommonComponents/CommonHeading/CommonHeading';
import logo from "../../Assets/images/logo.png";
import { GoogleLogin } from '@react-oauth/google';
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";
import { LoginApi,userDetail } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { loginUser,userData} from "../../Redux/slices/userslice"


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const initialValues = {
    phoneNumberOrEmail: '',
    password: '',
  };

  const validationSchema = Yup.object({
    phoneNumberOrEmail: Yup.string().required('Username or Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      values = { email: values.phoneNumberOrEmail, password: values.password }
      const response = await LoginApi(values);
    
      console.log("response>>>> ",response);

      if (response.status === 200 && response.data.result.token ) {
        dispatch(loginUser({ token: response.data.result.token }));
        const response2= await userDetail(response.data.result.token);
        console.log("this isuseridddddddd", response2.data.data.result.data.id)
        dispatch(userData({
          userId: response2.data.data.result.data.id,
          name: response2.data.data.result.data.firstName + " " + response2.data.data.result.data.lastName,
          email: response2.data.data.result.data.email,
        }));
        console.log("this is token ceckinj", response.data.result.token)
        toast.success("Login Successfully", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "colored"
        });
        navigate("/auth");
      }
      else {
        if (response.error && response.error.response && response.error.response.data.errors.message === "Email or Phone Number does not exist" && response.error.response.status === 400) {
          formik.setErrors({ ...formik.errors, phoneNumberOrEmail: response.error.response.data.errors.message });
        }
        if (response.error && response.error.response && response.error.response.data.errors.message === "Invalid password" && response.error.response.status === 400) {
          formik.setErrors({ ...formik.errors, password: response.error.response.data.errors.message });
        }

      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored"
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <div><img src={logo} alt="Logo" /></div>
          <h5>ConnectMe</h5>
        </div>

        <div className="wrapper_inner">
          <div className='modal_wrapper'>
            <form onSubmit={formik.handleSubmit}>
              <CommonHeading>Login</CommonHeading>
              <CommonLabel>Email Address or Phone number</CommonLabel>
              <CommonInput
                placeholder='youremail@example.com'
                type="text"
                id="phoneNumberOrEmail"
                value={formik.values.phoneNumberOrEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumberOrEmail && formik.errors.phoneNumberOrEmail ? (
                <div className="error">{formik.errors.phoneNumberOrEmail}</div>
              ) : null}
              <CommonLabel className="forget_password_link">Password <Link to="/forgetPassword">Forgot ?</Link></CommonLabel>
              <CommonInput
                type='password'
                placeholder="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
              <CommonButton type="submit">Account Login</CommonButton>
            </form>
          </div>

          <div className='auth_options'>
            <p>OR USE WITH</p>
            <div className='buttons'>
              <GoogleLogin
                type="standard"
                theme="outline"
                size="large"
                text="signin_with"
                onSuccess={(response) => {
                  console.log(response);
                }}
                onError={() => {
                  console.log("Login Error")
                }} />

              <LoginSocialFacebook
                appId="234129913022604"
                onResolve={(response) => {
                  console.log(response)
                }}
                onReject={(error) => {
                  console.log(error, "error")
                }}
              >
                <FacebookLoginButton style={{ color: "white", borderRadius: "5px", padding: "10px", maxWidth: "300px", height: "44px", fontSize: "16px", margin: "20px 0px 0px 0px", width: "100%" }}>
                  Login with Facebook
                </FacebookLoginButton>
              </LoginSocialFacebook>
            </div>
          </div>
        </div>

        <div className="register_link">
          <span>Don't have an account?</span><Link to="/signup">Register</Link>
        </div>
      </div>
    </>
  )
}

export default Login;
