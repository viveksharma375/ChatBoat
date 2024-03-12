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
    seen?: boolean,
}

export const ChatBody: React.FC<ChatBoxProps> = ({ id, firstName, lastName, email, phoneNumber }) => {
    const userId = useSelector((state: any) => state.user.userId);
    const sender = useSelector((state: any) => state.user.name);
    console.log("chat body id", id);
    console.log('this is useeeeeee', sender)
    console.log('this is useeeeeee', userId)

    const [currentMsg, setCurrentmsg] = useState("");
    const [msgDataMap, setMsgDataMap] = useState<{ [userId: string]: MsgData[] }>({});

    const updateMsgList = (userId: string, newMsg: MsgData) => {
        setMsgDataMap(prevMsgDataMap => {

            const updatedMsgList = [...(prevMsgDataMap[userId] || []), newMsg];
            console.log("this is updated msg list", updatedMsgList)

            return {
                ...prevMsgDataMap,
                [userId]: updatedMsgList
            };
        });

    };

    const sendMessage = async () => {
        if (currentMsg !== "") {
            const msgData = {
                author: userId,
                message: currentMsg,
                timestamp: new Date().toISOString()

            };
            socket.emit("message_send", msgData, id);
            updateMsgList(id, msgData)
            // setMsgList((list) => [...list, msgData]);
            setCurrentmsg("");
        }
    };
    // function testing() {
    //     console.log("Id sfidgh sdigh ", msgDataMap[id]);
    //     // Object.keys(msgDataMap).map((userId:any)=>{
    //     //     console.log("Teasrghas rg",userId)
    //     // } )
    // }
    // testing()
    // Function to update message list for a specific user
    var i = 0;

    console.log("Msgdata af sdn", i++, msgDataMap)

    useEffect(() => {
        socket.emit("login", userId);
        socket.emit("fetch_message");
        socket.on("user_message_data", (data: { [userId: string]: MsgData[] }) => {
            console.log("MESGAGE D ", data);
            console.log("this is messae iddd", userId)
            setMsgDataMap(data)
        })
    }, [userId])

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
                {msgDataMap[id]?.map((msgg) => (
                    <div className='container' key={msgg.timestamp}>
                        <div
                            // ref={msg}
                            className="message"
                            id={msgg.author === userId ? "you" : "other"}
                            key={msgg.timestamp} // Make sure to assign a unique key to each message
                        >
                            <div className="message-content">

                                <p>{msgg.message}</p>
                                <p>{msgg.seen === true ? "seen" : "unseen"}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time"><span>
                                    {new Date(msgg.timestamp).toLocaleTimeString()}</span>
                                    <span id="author">{(msgg.author === id) ? firstName : "You"}</span></p>
                            </div>
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
                    <CommonButton className='send_btn' onClick={sendMessage}><IoSendSharp /></CommonButton>
                </div>
            </div>
        </div>
    );
}



