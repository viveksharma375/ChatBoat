import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//carousel
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

//Import Images
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import { socket } from "../../../helpers/socket";
import OnlineUserItem from "../../../components/onlineUserItem";

const OnlineUsers = () => {
  const responsive = {
    0: { items: 4 },
    1024: { items: 4 },
  };
  const [onlineUser,setOnlineUsers] = useState(null);
  const userID = JSON.parse(localStorage.getItem("authUser"));
  
  useEffect(()=>{
    console.log("sfoisrepfsrhfposir")
    function broadCastOnline(data){
      const filteredData = data.filter(user => user !== userID.id);
      setOnlineUsers(filteredData)
    }
    socket.on("userStatusUpdate", broadCastOnline)
    return()=>{
      socket.off("userStatusUpdate",broadCastOnline)
    }
  },[])

  return (
    <React.Fragment>
      {/* Start user status */}
      {onlineUser &&
      <div className="px-4 pb-4 dot_remove" dir="ltr">
        <AliceCarousel
          responsive={responsive}
          disableDotsControls={false}
          disableButtonsControls={false}
          mouseTracking
        >
          {onlineUser?.map((a)=>(
          <OnlineUserItem key={a} id={a} />
       
          )
          )}
          {/* <div className="item">
            <Link to="#" className="user-status-box">
              <div className="avatar-xs mx-auto d-block chat-user-img online">
                <img
                  src={avatar2}
                  alt="user-img"
                  className="img-fluid rounded-circle"
                />
                <span className="user-status"></span>
              </div>

              <h5 className="font-size-13 text-truncate mt-3 mb-1">Patrick</h5>
            </Link>
          </div>
          <div className="item">
            <Link to="#" className="user-status-box">
              <div className="avatar-xs mx-auto d-block chat-user-img online">
                <img
                  src={avatar4}
                  alt="user-img"
                  className="img-fluid rounded-circle"
                />
                <span className="user-status"></span>
              </div>

              <h5 className="font-size-13 text-truncate mt-3 mb-1">Doris</h5>
            </Link>
          </div>

          <div className="item">
            <Link to="#" className="user-status-box">
              <div className="avatar-xs mx-auto d-block chat-user-img online">
                <img
                  src={avatar5}
                  alt="user-img"
                  className="img-fluid rounded-circle"
                />
                <span className="user-status"></span>
              </div>

              <h5 className="font-size-13 text-truncate mt-3 mb-1">Emily</h5>
            </Link>
          </div>

          <div className="item">
            <Link to="#" className="user-status-box">
              <div className="avatar-xs mx-auto d-block chat-user-img online">
                <img
                  src={avatar6}
                  alt="user-img"
                  className="img-fluid rounded-circle"
                />
                <span className="user-status"></span>
              </div>

              <h5 className="font-size-13 text-truncate mt-3 mb-1">Steve</h5>
            </Link>
          </div>

          <div className="item">
            <Link to="#" className="user-status-box">
              <div className="avatar-xs mx-auto d-block chat-user-img online">
                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                  T
                </span>
                <span className="user-status"></span>
              </div>

              <h5 className="font-size-13 text-truncate mt-3 mb-1">Teresa</h5>
            </Link>
          </div> */}
        </AliceCarousel>
        {/* end user status carousel */}
      </div>
      }
      {/* end user status  */}
    </React.Fragment>
  );
};

export default OnlineUsers;
