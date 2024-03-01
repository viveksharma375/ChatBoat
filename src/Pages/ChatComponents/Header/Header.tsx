import "./Header.scss";
import logo from "../../../Assets/images/logo.png";
import userImage from "../../../Assets/images/3.jpg";
import { ChatIcon, ContactsIcon, FilesIcon, NotificationIcon } from "../../../Assets/svg/svg";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logoutUser} from "../../../Redux/slices/userslice";


export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
  
    const handlelogout = () => {
        dispatch(logoutUser())
        navigate("/")
    }
    return (
        <>
            <header>
                <div className='header_inner_left'>
                    <div className='comp_logo'><img src={logo} alt="Logo" /></div>
                    <div>
                        <a href="/"><ChatIcon /></a>
                        <a href="/"><ContactsIcon /></a>
                        <a href="/"><FilesIcon /></a>
                    </div>
                </div>
                <div className='header_inner_right'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <div className='notification_icon'>
                                <NotificationIcon />
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <div className='userImage'><img src={userImage} alt="" /></div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Settings </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Change Password</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handlelogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
        </>
    )
}
