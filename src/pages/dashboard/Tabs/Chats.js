import React, { Component, useEffect, useState } from "react";
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//simplebar
import SimpleBar from "simplebar-react";

//actions
import {
  setconversationNameInOpenChat,
  activeUser,
} from "../../../redux/actions";

//components
import OnlineUsers from "./OnlineUsers";
import ChatItem from "../../../components/chatItem";

const Chats = ({ recentChatList, active_user, setconversationNameInOpenChat, activeUser }) => {
  const [searchChat, setSearchChat] = useState("");
  const [filteredChatList, setFilteredChatList] = useState(recentChatList);

  useEffect(() => {
    var li = document.getElementById("conversation" + active_user);
    if (li) {
      li.classList.add("active");
    }
  }, [active_user]);

  useEffect(() => {
    setFilteredChatList(recentChatList);
  }, [recentChatList]);

  const handleChange = (e) => {
    setSearchChat(e.target.value);
    const search = e.target.value.toLowerCase();
    const filteredArray = recentChatList.filter((element) =>
      element.name.toLowerCase().includes(search) ||
      element.name.toUpperCase().includes(search)
    );
    setFilteredChatList(filteredArray);
    if (search === "") {
      setFilteredChatList(recentChatList);
    }
  };

  const openUserChat = (e, chat) => {
    e.preventDefault();
    const index = recentChatList.indexOf(chat);
    activeUser(index);
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
            {recentChatList.map((chat, key) => (

              <ChatItem key={key} chat={chat} active_user={active_user} openUserChat={openUserChat} />

            ))}
          </ul>
        </SimpleBar>
      </div>
      {/* End chat-message-list */}
    </div>
  );

}

const mapStateToProps = (state) => {
  const { active_user } = state.Chat;
  return { active_user };
};

export default connect(mapStateToProps, {
  setconversationNameInOpenChat,
  activeUser,
})(Chats);
