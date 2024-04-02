import React, { Component, useEffect, useState } from "react";
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

//simplebar
import SimpleBar from "simplebar-react";

//actions


//components
import OnlineUsers from "./OnlineUsers";
import ChatItem from "../../../components/chatItem";
import { socket } from "../../../helpers/socket";
import { userActiveChat, userConnected } from "../../../redux/slice.auth";

const Chats = ({ connectedUsers, activeChat }) => {
  const [searchChat, setSearchChat] = useState("");
  const [filteredChatList, setFilteredChatList] = useState(connectedUsers);
  const dispatch = useDispatch();

  //TODO hadnlemesgg
  const setMessageData=(data)=>{
    console.log("MESHSDFJSJDFDF",data)
    
    
  }

  const setContactData=(data)=>{
    dispatch(userConnected({
      connectedUsers:data
    }))
    
  }
  useEffect(() => {
    var li = document.getElementById(activeChat);
    if (li) {
      li.classList.add("active");
    }
  }, [activeChat]);

  useEffect(() => {
   

    setFilteredChatList(connectedUsers);
  }, [connectedUsers]);

  
  useEffect(()=>{
    socket.emit("fetch_message");
    socket.emit("fetchAllConnection");
    socket.on("user_message_data",setMessageData)
    socket.on("user_connect_data",setContactData)
    
    return () => {
      socket.off("user_message_data",setMessageData)
      socket.off("user_connect_data",setContactData)
      socket.off("fetch_message")
      socket.off("fetchAllConnection")

  }
  },[])









  const handleChange = (e) => {
    setSearchChat(e.target.value);
    const search = e.target.value.toLowerCase();
    const filteredArray = connectedUsers.filter((element) =>
      element.firstName.toLowerCase().includes(search) ||
      element.lastName.toUpperCase().includes(search)
    );
    setFilteredChatList(filteredArray);
    if (search === "") {
      setFilteredChatList(connectedUsers);
    }
  };

  const openUserChat = (e, chat) => {
    e.preventDefault();
    const index = connectedUsers.indexOf(chat);
    console.log("indexxxxx",index)
    dispatch(userActiveChat({
      activeChat:chat
    }))
    
    const chatList = document.getElementById("chat-list");
    let currentli = null;

    if (chatList) {
      const li = chatList.getElementsByTagName("li");
      for (const element of li) {
        if (element.classList.contains("active")) {
          element.classList.remove("active");
        }
      }
      for (const element of li) {
        if (element.contains(e.target)) {
          currentli = element;
          break;
        }
      }
    }

    if (currentli) {
      currentli.classList.add("active");
    }

    const userChat = document.getElementsByClassName("user-chat");
    if (userChat) {
      userChat[0].classList.add("user-chat-show");
    }

    const unread = document.getElementById("unRead" + chat.id);
    if (unread) {
      unread.style.display = "none";
    }
  };



  return (

    <div>
      <div className="px-4 pt-4">
        <h4 className="mb-4">Chats</h4>
        <div className="search-box chat-search-box">
          <InputGroup size="lg" className="mb-3 rounded-lg">
            <span
              className="input-group-text text-muted bg-light pe-1 ps-3"
              id="basic-addon1"
            >
              <i className="ri-search-line search-icon font-size-18"></i>
            </span>
            <Input
              type="text"
              value={searchChat}
              onChange={(e) => handleChange(e)}
              className="form-control bg-light"
              placeholder="Search messages or users"
            />
          </InputGroup>
        </div>
        {/* Search Box */}
      </div>

      {/* online users */}
      <OnlineUsers />

      {/* Start chat-message-list  */}
      <div className="px-2">
        <h5 className="mb-3 px-3 font-size-16">Recent</h5>
        <SimpleBar
          style={{ maxHeight: "100%" }}
          className="chat-message-list"
        >

          <ul
            className="list-unstyled chat-list chat-user-list"
            id="chat-list"
          >
            {connectedUsers?.map((chat, key) => (

              <ChatItem key={key} chat={chat} active_user={activeChat} openUserChat={openUserChat} />

            ))}
          </ul>
        </SimpleBar>
      </div>
      {/* End chat-message-list */}
    </div>
  );

}

const mapStateToProps = (state) => {
  const {activeChat ,connectedUsers} = state.user;
  return { activeChat,connectedUsers};
};

export default connect(mapStateToProps)(Chats);
