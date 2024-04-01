import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import withRouter from "../../components/withRouter";

//redux store
import { logoutUser } from '../../redux/actions';

/**
 * Logouts the user
 * @param {*} props 
 */
const Logout = (props) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => ({
        token: state.user.token,
      }));

    useEffect(() => {
        dispatch(logoutUser(props.router.navigate));
    }, [dispatch, props.router.navigate]);

    if (token) {
        console.log("isUserLogout",token)
        return <Navigate to="/login" />;
      }

    return (<></>)
}

export default withRouter(connect(null, { logoutUser })(Logout));