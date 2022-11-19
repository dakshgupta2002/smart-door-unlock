import React from 'react'
import "./CreateGroup.css";
import {Link} from "react-router-dom";
export default function CreateGroup() {
  return (
    <div id='Body'>
    <div className="card" id='appCard'>
      <div className="card-body">
        <h5 className="card-title" id='title'>Create Group</h5>
        <h6 className="card-subtitle mb-2 text-muted" id='subTitle'>Enter Group Name, Server-ID & Password</h6>
        <div class="input-group flex-nowrap" id="userName">
          <input type="text" class="form-control" placeholder="Groupname" aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>
        <div class="input-group flex-nowrap" id="serverID">
          <input type="password" class="form-control" placeholder="Server-ID" aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>
        <div class="input-group flex-nowrap" id="passWord">
          <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>
        <Link to="/groups"><button type="button" class="btn btn-primary btn-lg btn-block" id='create-btn'>Create</button></Link>
      </div>
    </div>
    </div>
  )
}
