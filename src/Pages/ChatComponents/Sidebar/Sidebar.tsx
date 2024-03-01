import React, { useState, useEffect } from 'react'
import CommonHeading from '../../../Components/CommonComponents/CommonHeading/CommonHeading'
import { Filter, Plus } from '../../../Assets/svg/svg'
import CommonInput from '../../../Components/CommonComponents/CommonInput/CommonInput'
import { BsSearch } from "react-icons/bs";
import girlImg from "../../../Assets/images/1.jpg";
import "./Sidebar.scss";
import { ContactDetails } from '../../../Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../helpers/socket.io';
import { userList } from '../../../Redux/slices/userslice';

interface SidebarProps {
  id: any;
  onIdChange: (newId: any) => void;
}

export const Sidebar : React.FC<SidebarProps> = ({ id, onIdChange })  => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);
  const userOnline = useSelector((state:any)=>state.user.userOnline);
  const userId = useSelector((state: any) => state.user.userId);

  const [contact, setContact] = useState([]);
 
  const selected = (uId: any) => {
    onIdChange(uId);
  }

  useEffect(() => {
    const fetchingDetails = async () => {
      const response = await ContactDetails(token);
      setContact(response.data.result.data)
    }
    fetchingDetails();
    socket.on("userStatusUpdate", (data) => {
      dispatch(userList({ userOnline: data }));
      console.log("this is userOnline", data);
    })
  }, [dispatch,token]);

  useEffect(()=>{
    socket.emit("login", userId);
    console.log("this is contact", userId);
  },[userId])

  return (
    <>
      <div className="sidebar_wrapper">

        <div className='sidebar_filters'>
          <CommonHeading>Chats</CommonHeading>
          <div className='sidebar_icons'>
            <a href="/"><Plus /><span>New</span></a>
            <a href="/"><Filter /><span>Filter</span></a>
          </div>
        </div>

        <div className='sidebar_bottem'>
          <div className='sidebar_form'>
            <form action="">
              <CommonInput className='search_input' placeholder='Search content/chat' />
              <BsSearch />
            </form>
          </div>

        <div className="scroll">
        {
              contact?.map((item: any) => (
                <div key={item.id}> 
                  <div className='sidebar_profile' onClick={() => selected(item.id)}>
                  <div className='girl_image'><img src={girlImg} alt="" /></div>
                    <div>
                      <h5>{item.firstName} {item.lastName}</h5>
                      <p>{userOnline.includes(item.id)?"online": "offline"}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          
          <div className='sidebar_profile'>
            <div className='girl_image'><img src={girlImg} alt="" /></div>
            <div>
              <h5>Jasmine Thompson</h5>
              <p>Had they visited Rome before</p>
            </div>
          </div>
          <div className='sidebar_profile'>
            <div className='girl_image'><img src={girlImg} alt="" /></div>
            <div>
              <h5>Jasmine Thompson</h5>
              <p>Had they visited Rome before</p>
            </div>
          </div>
          <div className='sidebar_profile'>
            <div className='girl_image'><img src={girlImg} alt="" /></div>
            <div>
              <h5>Jasmine Thompson</h5>
              <p>Had they visited Rome before</p>
            </div>
          </div>
          <div className='sidebar_profile'>
            <div className='girl_image'><img src={girlImg} alt="" /></div>
            <div>
              <h5>Jasmine Thompson</h5>
              <p>Had they visited Rome before</p>
            </div>
          </div>
          <div className='sidebar_profile'>
            <div className='girl_image'><img src={girlImg} alt="" /></div>
            <div>
              <h5>Jasmine Thompson</h5>
              <p>Had they visited Rome before</p>
            </div>
          </div>
          <div className='sidebar_profile'>
            <div className='girl_image'><img src={girlImg} alt="" /></div>
            <div>
              <h5>Jasmine Thompson</h5>
              <p>Had they visited Rome before</p>
            </div>
          </div>
          <div className='sidebar_profile'>
            <div className='girl_image'><img src={girlImg} alt="" /></div>
            <div>
              <h5>Jasmine Thompson</h5>
              <p>Had they visited Rome before</p>
            </div>
          </div>
          <div className='sidebar_profile'>
            <div className='girl_image'><img src={girlImg} alt="" /></div>
            <div>
              <h5>Jasmine Thompson</h5>
              <p>Had they visited Rome before</p>
            </div>
          </div>
          <div className='sidebar_profile'>
            <div className='girl_image'><img src={girlImg} alt="" /></div>
            <div>
              <h5>Jasmine Thompson</h5>
              <p>Had they visited Rome before</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
