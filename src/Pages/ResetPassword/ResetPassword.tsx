import "./ResetPassword.scss";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CommonButton from '../../Components/CommonComponents/CommonButton/CommonButton';
import CommonInput from '../../Components/CommonComponents/CommonInput/CommonInput';
import CommonLabel from '../../Components/CommonComponents/CommonLabel/CommonLabel';
import CommonHeading from '../../Components/CommonComponents/CommonHeading/CommonHeading';
import logo from "../../Assets/images/logo.png";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';


const ResetPassword = () => {
    // const navigate = useNavigate()
    const initialValues = {
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
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
                            <CommonHeading>Create New Password</CommonHeading>
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
                            <CommonButton type="submit">Submitt</CommonButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
