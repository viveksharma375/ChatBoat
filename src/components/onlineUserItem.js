import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import avatar2 from "../assets/images/users/avatar-2.jpg"
import API from '../helpers/api';


const OnlineUserItem=({key,id}) =>{
   const token = localStorage.getItem("api-access-token")?localStorage.getItem("api-access-token"):null
   const [profile,setProfile] = useState(null);
    const apiInstance  = new API();
    console.log(`${id} value is `)
const fetchDetails=async ()=>{
    const response = await apiInstance.getWithToken(`/user/${id}`, token)
        if (response.status) {
            
            
            const profileData = response.message.data;;
            console.log("profile dats ",profileData)
            setProfile(profileData)
        }
}
  useEffect(()=>{
    fetchDetails();
  },[])
  return (
    (profile && 
        <div key={key} className="item">
            <Link to="#" className="user-status-box">
              <div className="avatar-xs mx-auto d-block chat-user-img online">
                <img
                  src={avatar2}
                  alt="user-img"
                  className="img-fluid rounded-circle"
                />
                <span className="user-status"></span>
              </div>

              <h5 className="font-size-13 text-truncate mt-3 mb-1">{profile.firstName} {profile.lastName}</h5>
            </Link>
            </div>
         
    )
  )
}

export default OnlineUserItem
