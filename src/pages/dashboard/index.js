import React, { Component, useEffect } from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat/";

import { connect } from "react-redux";
import API from '../../helpers/api';
import { socket } from '../../helpers/socket';

const  Index=({users}) => {
     console.log("userownefosborf",users)
        return (
            <React.Fragment>
                {/* chat left sidebar */}
                <ChatLeftSidebar recentChatList={users} />

                {/* user chat */}
                <UserChat recentChatList={users} />

            </React.Fragment>
        );
    
}

const mapStateToProps = (state) => {
    const { users } = state.Chat;
    return { users };
};

export default connect(mapStateToProps, {})(Index);