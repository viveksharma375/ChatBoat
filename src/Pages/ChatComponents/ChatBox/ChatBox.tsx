import React, { useEffect, useState } from 'react'
import "./ChatBox.scss";
import { ChatHead }  from './ChatHead/ChatHead';
import { ChatBody } from './ChatBody/ChatBody';
import { useSelector } from 'react-redux';
import { IdDetails } from '../../../Api/Api';
import { socket } from '../../../helpers/socket.io';
import { useDispatch } from 'react-redux';
import { userList } from '../../../Redux/slices/userslice';

interface ChatBoxProps {
  selectedId: any;
}
interface ChatterId {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
}
const ChatBox: React.FC<ChatBoxProps> = ({ selectedId }) => {
  const dispatch = useDispatch();
  const userOnline = useSelector((state: any) => state.user.userOnline);
  console.log("this is userOnline", userOnline);
  console.log("socket sid fsoidhf ihsdg ", selectedId)
  const [details, setDetails] = useState<ChatterId | null>(null);
  const token = useSelector((state: any) => state.user.token);
  
  useEffect(() => {
    socket.on("userStatusUpdate", (data) => {
      console.log("data is ", data)
      dispatch(userList({ userOnline: data }));
    })
    const idDetails = async () => {
      try {
        const response = await IdDetails(selectedId, token);
        if (response.status === 200) {
          let user: ChatterId = response.data.result.data;
          console.log(" user si ",user)
          setDetails(user);
        }
      } catch (error) {
        console.error("Error fetching id details:", error);
      }
    };

    idDetails();
  }, [selectedId,dispatch,token])
  return (
    <div className='chat_cox_wrapper'>
        {details &&
          <div>
            <div><ChatHead id={details.id} firstName={details.firstName} lastName={details.lastName} phoneNumber={details.phoneNumber} email={details.email} /></div>
            <div ><ChatBody id={details.id} firstName={details.firstName} lastName={details.lastName} phoneNumber={details.phoneNumber} email={details.email} /></div>
          </div>
        }
      </div>
  )
}
export default ChatBox;