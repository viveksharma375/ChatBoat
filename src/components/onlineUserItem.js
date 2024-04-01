import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import avatar2 from "../assets/images/users/avatar-2.jpg"
import API from '../helpers/api';
import { useSelector } from 'react-redux';


const OnlineUserItem=({id}) =>{
  const token = useSelector((state)=>state.user.token)
  const [profile,setProfile] = useState(null);
    const apiInstance  = new API();
const fetchDetails=async ()=>{
    const response = await apiInstance.getWithToken(`/user/${id}`, token)
        if (response.status) {
            
            
            const profileData = response.message.data;;
            setProfile(profileData)
        }
}
  useEffect(()=>{
    fetchDetails();
  },[])
  return (
    (profile && 
        <div key={id} className="item">
            <Link to="#"  className="user-status-box">
              {/* <div className="avatar-xs mx-auto d-block chat-user-img online">
                <img
                  src={avatar2}
                  alt="user-img"
                  className="img-fluid rounded-circle"
                />
                <span className="user-status"></span>
              </div> */}
              {profile.profilePath ? (
             <div className="avatar-xs mx-auto d-block chat-user-img online">
              <img
                src={profile.profilePath}
                  className="rounded-circle avatar-xs"
                  
                alt="pic"
              />
               <span className="user-status"></span>
            </div>
          ) : (
            // <div className="avatar-xs mx-auto d-block chat-user-img online">
            <div className={"chat-user-img online avatar-xs mx-auto d-block align-self-center"}>
            
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </span>
                <span className="user-status"></span>
              </div>
            </div>
          )}

              <h5 className="font-size-13 text-truncate mt-3 mb-1">{profile.firstName} {profile.lastName}</h5>
            </Link>
            </div>
         
    )
  )
}

export default OnlineUserItem
