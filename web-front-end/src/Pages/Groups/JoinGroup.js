import React from 'react'
import "./JoinGroup.css";
import {Link} from "react-router-dom";
export default function JoinGroup() {
  return (
    <div id='Body'>
    <div className="card" id='appCard'>
      <div className="card-body">
        <h5 className="card-title" id='title'>Join Group</h5>
        <h6 className="card-subtitle mb-2 text-muted" id='subTitle'>Enter Group Name & Password</h6>
        <div class="input-group flex-nowrap" id="userName">
          <input type="text" class="form-control" placeholder="Groupname" aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>
        <div class="input-group flex-nowrap" id="passWord">
          <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>
        <Link to="/groups"><button type="button" class="btn btn-primary btn-lg btn-block" id='join-btn'>Join</button></Link>
      </div>
    </div>
    </div>
  )
}
