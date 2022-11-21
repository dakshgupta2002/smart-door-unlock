import React, { useState } from 'react'
import "./JoinGroup.css";
import { joinGroupApi } from '../../Api/Groups';

export default function JoinGroup(props) {
  const [serverID, setServerID] = useState("")
  const [key, setKey] = useState("");

  // server id and the secret key for joining groups
  return (
    <div id='Body'>
    <div className="card" id='appCard'>
      <div className="card-body">
        <h5 className="card-title" id='title'>Join Group</h5>
        <h6 className="card-subtitle mb-2 text-muted" id='subTitle'>Enter Server ID and secret key</h6>
        <div className="input-group flex-nowrap" id="userName">
          <input type="text" className="form-control" placeholder="Server ID" aria-label="Server ID" aria-describedby="addon-wrapping" value={serverID} onChange={(e) => {setServerID(e.target.value)}}/>
        </div>
        <div className="input-group flex-nowrap" id="passWord">
          <input type="text" className="form-control" placeholder="Secret Key" aria-label="Secret Key" aria-describedby="addon-wrapping" value={key} onChange={(e) => {setKey(e.target.value)}} />
        </div>
        <button onClick={() => joinGroupApi(props.user.email, serverID, key)} type="button" className="btn btn-primary btn-lg btn-block" id='join-btn'>Join</button>
      </div>
    </div>
    </div>
  )
}
