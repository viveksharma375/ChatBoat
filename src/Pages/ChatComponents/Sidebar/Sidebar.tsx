import React, { useState, useEffect } from 'react'
import CommonHeading from '../../../Components/CommonComponents/CommonHeading/CommonHeading'
import { Filter, Plus } from '../../../Assets/svg/svg'
import CommonInput from '../../../Components/CommonComponents/CommonInput/CommonInput'
import { BsFillMicMuteFill, BsSearch } from "react-icons/bs";
import girlImg from "../../../Assets/images/1.jpg";
import "./Sidebar.scss";
import { ContactDetails } from '../../../Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../helpers/socket.io';
import { userList } from '../../../Redux/slices/userslice';
import CommonModal from '../../../Components/CommonComponents/CommonModal/CommonModal';


interface SidebarProps {
  id: any;
  onIdChange: (newId: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ id, onIdChange }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);
  const userOnline = useSelector((state: any) => state.user.userOnline);
  const userId = useSelector((state: any) => state.user.userId);
  const [notificaton, setNotification] = useState<{ [userId: string]: number }>({});
  const [contact, setContact] = useState([]);
  const [changeId, setChangeId] = useState(id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  console.log("changeeeeeeid", changeId)



  const selected = (uId: any) => {
    setChangeId(uId);
    onIdChange(uId);
    setNotification(prevNotification => ({
      ...prevNotification,
      [uId]: 0
    }));

  }

  const fetchingDetails = async () => {
    const response = await ContactDetails(token);
    setContact(response.data.result.data)
  }


  const filteredContacts = contact.filter((item: any) =>
    `${item.firstName} ${item.lastName} ${item.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIncomingMessage = (data: any) => {
    // console.log("Selecte di f", id)
    console.log("selecte did sig handle incomimh ", data.author, " === ", changeId)
    if (data.author !== changeId) {
      setNotification(prevNotification => {

        const updatedMsgList = (prevNotification[data.author] || 0) + 1;
        return {
          ...prevNotification,
          [data.author]: updatedMsgList
        };
      });
    } else {
      console.log("No notifiiation for ", data.author, ">>>>>>>", changeId)
    }
  }

  useEffect(() => {
    socket.on("message", handleIncomingMessage);
  }, [])

  useEffect(() => {
    setChangeId(id)
  }, [id])
  useEffect(() => {
    socket.emit("login", userId);
    // console.log("this is contact", userId);
  }, [userId])

  useEffect(() => {
    fetchingDetails();


    socket.on("userStatusUpdate", (data) => {
      dispatch(userList({ userOnline: data }));
      // console.log("this is userOnline", data);
    })
  }, [dispatch, token]);


  // useEffect(() => {
  //   console.log("REdnediejiorjgorsngprdoigjhergj")
  // }, [notificaton])

  // useEffect(() => {

  //   console.log("this is notificatopn", notificaton)
  //   setNotification((prevNotification) => ({
  //     ...prevNotification,
  //     ...notificaton,
  //   }));
  // }, [setNotification])



  return (
    <>
      <div className="sidebar_wrapper">

        <div className='sidebar_filters'>
          <CommonHeading>Chats</CommonHeading>
          <div className='sidebar_icons'>

            <CommonModal
              modalText={
                <div style={{ maxHeight: "200px" }}>


                </div>
              }>
              <div><Plus /><span>New</span></div>
            </CommonModal>

            <a href="/"><Filter /><span>Filter</span></a>
          </div>
        </div>

        <div className='sidebar_bottem'>
          <div className='sidebar_form'>
            <form action="">
              <CommonInput
                className='search_input'
                placeholder='Search content/chat'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <BsSearch />
            </form>
          </div>

          <div className="scroll">
            {
              // Iterate over filteredContacts instead of contact
              filteredContacts.map((item: any) => (
                <div key={item.id}>
                  <div className='sidebar_profile' onClick={() => selected(item.id)}>
                    <div className='girl_image'><img src={girlImg} alt="" /></div>
                    <div className='outer'>


                      <h5>{item.firstName} {item.lastName}</h5>

                      <div className='okkkkk'>

                        <p>{item.email}</p>
                        <div className='chat_info'>

                          <p> {userOnline.includes(item.id) ? "online" : "offline"}</p>
                          {notificaton[item.id] > 0 ?
                            <>
                              {
                                notificaton[item.id] && notificaton[item.id] > 0 && (
                                  <p className="ntn_message">{notificaton[item.id]}</p>
                                )
                              }
                            </>
                            : <>{
                              notificaton[item.id] == 0 && (
                                <p className=""></p>
                              )
                            } </>
                          }

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
