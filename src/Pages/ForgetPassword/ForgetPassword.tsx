import "./ForgetPassword.scss";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CommonButton from '../../Components/CommonComponents/CommonButton/CommonButton';
import CommonInput from '../../Components/CommonComponents/CommonInput/CommonInput';
import CommonLabel from '../../Components/CommonComponents/CommonLabel/CommonLabel';
import CommonHeading from '../../Components/CommonComponents/CommonHeading/CommonHeading';
import logo from "../../Assets/images/logo.png";
import { ForgetPasswordApi } from "../../Api/Api";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const initialValues = {
        mobile: '',
    };

    const validationSchema = Yup.object({
        mobile: Yup.string()
              .matches(/^[0-9]{10}$/, 'Invalid phone number')
              .required('Required'),
    });

    const onSubmit = async (values: any) => {
        console.log(values);
        try {
            const res = await ForgetPasswordApi(values)
            console.log(res,"response");
            
        } catch (error) {
            
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

                <div className="wrapper_inner">
                    <div className='modal_wrapper'>
                        <form onSubmit={formik.handleSubmit}>
                            <CommonHeading>Recovery Password</CommonHeading>
                            <CommonLabel>Phone Number</CommonLabel>
                            <CommonInput
                                type="number"
                                id="mobile"
                                placeholder='Your phone number'
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.mobile && formik.errors.mobile ? (
                                <div className="error">{formik.errors.mobile}</div>
                            ) : null}
                            <CommonButton type="submit">Reset Password</CommonButton>
                        </form>
                    </div>

                </div>

                <div className="register_link">
                    <span>Some how remembered?</span><Link to="/otp">Login</Link>
                </div>
            </div>
        </>
    )
}


export default ForgetPassword;