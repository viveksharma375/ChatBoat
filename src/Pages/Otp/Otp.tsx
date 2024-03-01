import "./Otp.scss";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CommonButton from '../../Components/CommonComponents/CommonButton/CommonButton';
import CommonInput from '../../Components/CommonComponents/CommonInput/CommonInput';
import CommonLabel from '../../Components/CommonComponents/CommonLabel/CommonLabel';
import CommonHeading from '../../Components/CommonComponents/CommonHeading/CommonHeading';
import logo from "../../Assets/images/logo.png";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';

const Otp = () => {
    const initialValues = {
        otp: '',
    };

    const validationSchema = Yup.object({
        otp: Yup.string()
            .matches(/^[0-9]{4}$/, 'Invalid OTP')
            .required('Required'),
    });

    const onSubmit = async (values: any) => {
        console.log(values);
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
                            <CommonHeading>OTP</CommonHeading>
                            <CommonLabel>Enter Otp</CommonLabel>
                            <CommonInput
                                type="number"
                                id="otp"
                                placeholder='Your phone number'
                                value={formik.values.otp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.otp && formik.errors.otp ? (
                                <div className="error">{formik.errors.otp}</div>
                            ) : null}
                            <CommonButton type="submit">Send OTP</CommonButton>
                        </form>
                    </div>

                </div>

                <div className="register_link">
                    <span>Some how remembered?</span><Link to="/">Login</Link>
                </div>
            </div>
        </>
    )
}


export default Otp;