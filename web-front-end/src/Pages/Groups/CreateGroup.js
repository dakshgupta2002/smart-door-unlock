import React, {useState} from 'react'
import { createGroupApi } from '../../Api/Groups';
import "./CreateGroup.css";

export default function CreateGroup(props) {
  const [gname, setGName] = useState("");
  const [serverID, setServerID] = useState("");
  
  const createGroup = async () => {
    await createGroupApi(props.user.email, gname, serverID)
  }

  return (
    <div id='Body'>
    <div className="card" id='appCard'>
      <div className="card-body">
        <h5 className="card-title" id='title'>Create Group</h5>
        <h6 className="card-subtitle mb-2 text-muted" id='subTitle'>Enter Group Name, Server-ID & Password</h6>
        <div class="input-group flex-nowrap" id="userName">
          <input type="text" class="form-control" placeholder="Group Name" aria-label="groupname" aria-describedby="addon-wrapping" value={gname} onChange={(e) => {setGName(e.target.value)}} />
        </div>
        <div class="input-group flex-nowrap" id="serverID">
          <input type="text" class="form-control" placeholder="Server-ID" aria-label="serverId" aria-describedby="addon-wrapping" value={serverID} onChange={(e) => {setServerID(e.target.value)}} />
        </div>

        <button type="button" class="btn btn-primary btn-lg btn-block" id='create-btn' onClick={createGroup}>Create</button>
      </div>
    </div>
    </div>
  )
}
