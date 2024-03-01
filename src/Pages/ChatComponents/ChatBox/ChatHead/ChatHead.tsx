import "./ChatHead.scss";
import userImage from "../../../../Assets/images/1.jpg";
import { Phone } from "../../../../Assets/svg/svg";
import { IoIosVideocam } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { PiSquareHalfFill } from "react-icons/pi";
import CommonModal from '../../../../Components/CommonComponents/CommonModal/CommonModal';
import CommonButton from '../../../../Components/CommonComponents/CommonButton/CommonButton';
import dog from "../../../../Assets/images/dog.jpg";
import girl from "../../../../Assets/images/1.jpg";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsFillMicMuteFill } from "react-icons/bs";
import { MdAddIcCall } from "react-icons/md";
import { Link } from 'react-router-dom';
import person_img from "../../../../Assets/images/2.jpg";
// import { IdDetails } from '../../../../Api/Api';
import { useSelector } from 'react-redux';
import { socket } from '../../../../helpers/socket.io';
import { useDispatch } from "react-redux";
import { userList } from '../../../../Redux/slices/userslice';
import { useEffect } from "react";

interface ChatBoxProps {

  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,

}

export const ChatHead: React.FC<ChatBoxProps> = ({ id, firstName, lastName, email, phoneNumber }) => {

  const handleCloseModal = () => {
    console.log("modal closed");
  };
  const token = useSelector((state: any) => state.user.token);
  const userId = useSelector((state: any) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("userStatusUpdate", (data) => {
      dispatch(userList({ userOnline: data }));
    })
  }, [token, dispatch]);

  useEffect(() => {
    socket.emit("login", userId);
  },[userId])

  return (
    <>
      <div className="caht_wrapper">
        <div className='chatbox_profile'>
          <div className='pro_img'><img src={userImage} alt="" /></div>
          <div>
            <h5>{firstName}  {lastName}</h5>
            <p>{email}  {phoneNumber}</p>
          </div>
        </div>
        <div className='communication_icons'>
          <CommonModal modalText={
            <div className='call_modal'>
              <div className='dog_img'><img src={dog} alt="" /></div>
              <div className='girl_img'><img src={girl} alt="" /></div>
              <div className='call_detail'>
                <p>Calling...</p>
                <h6>Konstantin Frank</h6>
              </div>
              <CommonButton className='switch_connections'>
                <span>Switch to</span>
                <IoIosVideocam />
              </CommonButton>
              <div className='call_options'>
                <a href='/'><MdPersonAddAlt1 /></a>
                <a href='/'><BsFillMicMuteFill /></a>
                <Link to="/auth/dashboard" className='hang_call' onClick={handleCloseModal}><MdAddIcCall /></Link>
              </div>
            </div>
          } onClose={handleCloseModal}>
            <Phone />
          </CommonModal>

          <CommonModal modalText={
            <div className='bg_image'>
              <div className='person_img'>
                <img src={person_img} alt="" />
              </div>
              <div className='person_des'>
                <p>Talking With ...</p>
                <h5>Konstantin Frank</h5>
                <h6>02:09 min</h6>
              </div>
              <div className='call_options'>
                <a href='/'><MdPersonAddAlt1 /></a>
                <a href="/"><IoIosVideocam /></a>
                <a href='/'><BsFillMicMuteFill /></a>
                <a href="/" className='hang_call'><MdAddIcCall /></a>
              </div>
            </div>
          }>
            <IoIosVideocam />
          </CommonModal>

          <a href="/"><BsSearch /></a>
          <a href="/"><PiSquareHalfFill /></a>
        </div>
      </div>
    </>
  )
}
// export default ChatHead;