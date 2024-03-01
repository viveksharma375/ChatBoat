import "./Signup.scss";
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
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { SignupApi } from "../../Api/Api"; 


const Signup = () => {
  const navigate = useNavigate()
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().min(3, 'Must be at least 3 characters').required('Required').matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    lastName: Yup.string().min(3, 'Must be at least 3 characters').required('Required').matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    email: Yup.string()
      .email('Invalid email address')
      .test(
        'has-valid-domain',
        'Email must have a .com, .org, .edu, .net, .gov domain',
        (value) => {
          if (!value) return false; 
          const validDomains = ['com', 'org', 'edu', 'net', 'gov', 'in'];
          const domain = value.split('.').pop()?.toLowerCase(); 
          return domain ? validDomains.includes(domain) : false;
        }
      )
      .required('Required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid phone number')
      .required('Required'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'),], 'Passwords must match')
      .required('Required'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the Terms and Privacy Policy')
      .required('You must accept the Terms and Privacy Policy'),
  });

  const onSubmit = async (values: any) => {
    try {
      const response = await SignupApi(values);
      if (response.status === 200) {
        toast.success("User Registered Successfully", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "colored"
        });
        navigate("/");
      }
      else{
        if (response.message === "Email already exists") {
          formik.setErrors({ ...formik.errors, email: response.message });
        } else if (response.message === "Phone Number already exists") {
          formik.setErrors({ ...formik.errors, phoneNumber: response.message });
        }
      }
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error("Signup failed", {
        position: "bottom-right",
        autoClose: 2000,
      })
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
          <div className="logoinner"><img src={logo} alt="Logo" /></div>
          <h5>ConnectMe</h5>
        </div>

        <div className="wrapper_inner_signup wrapper_inner">
          <div className='modal_wrapper'>
            <form onSubmit={formik.handleSubmit}>
              <CommonHeading>Create Account</CommonHeading>
              <div className="signup_field">
                <div className="signup_field_inner">
                  <CommonLabel>First Name</CommonLabel>
                  <CommonInput
                    type="text"
                    id="firstName"
                    placeholder='Your first name'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="error">{formik.errors.firstName}</div>
                  ) : null}
                </div>
                <div className="signup_field_inner">
                  <CommonLabel>Last Name</CommonLabel>
                  <CommonInput
                    type="text"
                    id="lastName"
                    placeholder='Your last name'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="error">{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              <div className="signup_field">
                <div className="signup_field_inner">
                  <CommonLabel>Email</CommonLabel>
                  <CommonInput
                    type="email"
                    id="email"
                    placeholder='Your email address'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="signup_field_inner">
                  <CommonLabel>Phone Number</CommonLabel>
                  <CommonInput
                    type="tel"
                    id="phoneNumber"
                    placeholder='Your phone number'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="error">{formik.errors.phoneNumber}</div>
                  ) : null}
                </div>
              </div>
              <div className="signup_field">
                <div className="signup_field_inner">
                  <CommonLabel>Password</CommonLabel>
                  <CommonInput
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="signup_field_inner">
                  <CommonLabel>Password Repeat</CommonLabel>
                  <CommonInput
                    type="password"
                    id="confirmPassword"
                    placeholder="Repeat password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
              </div>
              <div>
              <div className="checkbox_terms">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  className="check_box"
                  checked={formik.values.acceptTerms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="acceptTerms">I agree with <span>privacy policy & terms</span></label> 
                </div>
                {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
                  <div className="error">{formik.errors.acceptTerms}</div>
                ) : null}
              </div>
              <CommonButton type="submit">Account Register</CommonButton>
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
                  console.log(error)
                }}
              >
                <FacebookLoginButton style={{ color: "white", borderRadius: "5px", padding: "10px", maxWidth: "300px", height: "44px", fontSize: "16px", margin: "20px 0px 0px 0px", width: "100%" }}>
                  Signup in with Facebook
                </FacebookLoginButton>
              </LoginSocialFacebook>
            </div>
          </div>
        </div>

        <div className="register_link">
          <span>Already have an account?</span><Link to="/">Login</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
