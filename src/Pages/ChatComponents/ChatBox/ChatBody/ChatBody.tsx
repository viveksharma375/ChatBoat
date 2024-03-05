import React, { useEffect, useState } from 'react'
import "./ChatBody.scss";
import { useSelector } from 'react-redux';
import { socket } from '../../../../helpers/socket.io';
import { IoSendSharp } from "react-icons/io5";
import { Emoji, Plus, Image } from '../../../../Assets/svg/svg';
import CommonButton from '../../../../Components/CommonComponents/CommonButton/CommonButton';
import CommonInput from '../../../../Components/CommonComponents/CommonInput/CommonInput';

interface ChatBoxProps {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,

}
interface MsgData {
    author: string,
    message: string,
    timestamp: string,
}

export const ChatBody: React.FC<ChatBoxProps> = ({ id, firstName, lastName, email, phoneNumber }) => {
    const userId = useSelector((state: any) => state.user.userId);
    const sender = useSelector((state:any)=>state.user.name);
    console.log(id,"chat body id");
    
    const [currentMsg, setCurrentmsg] = useState("");
    const [msgDataMap, setMsgDataMap] = useState<{ [userId: string]: MsgData[] }>({});
    const sendMessage = async () => {
        if (currentMsg !== "") {
            const msgData = {
                author: sender,
                message: currentMsg,
                timestamp:new Date().toISOString()
                    
            };
            socket.emit("message_send", msgData, id);
            updateMsgList(id,msgData)
            // setMsgList((list) => [...list, msgData]);
            setCurrentmsg("");
        }
    };
    function testing(){
        console.log("Id sfidgh sdigh ",msgDataMap[id]);
        // Object.keys(msgDataMap).map((userId:any)=>{
        //     console.log("Teasrghas rg",userId)
        // } )
    }
    testing()
 // Function to update message list for a specific user
 const updateMsgList = (userId: string, newMsg: MsgData) => {
    setMsgDataMap(prevMsgDataMap => {
        const updatedMsgList = [...(prevMsgDataMap[userId] || []), newMsg];
        return {
            ...prevMsgDataMap,
            [userId]: updatedMsgList
        };
    });
};
console.log("Msgdata af sdn ", msgDataMap)

     useEffect(()=>{
        socket.emit("login", userId);
        socket.emit("fetch_message");
        socket.on("user_message_data",(data:{[userId: string]: MsgData[]})=>{
            console.log("MESGAGE D ",data);
            setMsgDataMap(data)
     })
     },[userId])

     const handleIncomingMessage = (data: MsgData) => {
        
        //TODO
        updateMsgList(id, data);
        //  setMsgList((list) => [...list, data]);
         setCurrentmsg("");
     };
    useEffect(() => {
        socket.on("message", handleIncomingMessage);
        return () => {
            socket.off("message", handleIncomingMessage);
        };
        
    }, [msgDataMap]);

    return (
        <div className="chat-window">
            <div className="chat-body">
            {msgDataMap[id]?.map((msgg)=>(
                 <div
                 className="message"
                 id={userId === msgg.author ? "you" : "other"}
                 key={msgg.timestamp} // Make sure to assign a unique key to each message
             >
                 <div className="message-content">
                     <h5>{msgg.message}</h5>
                 </div>
                 <div className="message-meta">
                     <p id="time">{msgg.timestamp}</p>
                     <h6 id="author">{(msgg.author===id)? firstName:"You"}</h6>
                 </div>
             </div>
            ))}
          

            </div>

            <div className="chat_form">
                <div className='chat_form_icons'>
                    <a href="/"><Plus /></a>
                    <a href="/"><Image /></a>
                    <a href="/"><Emoji /></a>
                </div>
                <div className='msg_send'>
                    <CommonInput
                        type="text"
                        placeholder="message"
                        value={currentMsg}
                        onChange={(event) => {
                            setCurrentmsg(event.target.value);
                        }}
                        onKeyDown={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <CommonButton className='send_btn' onClick={sendMessage}><IoSendSharp/></CommonButton>
                </div>
            </div>
        </div>
    );
}



