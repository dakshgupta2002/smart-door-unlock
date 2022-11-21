import React, { useState, useEffect } from "react";
import "./Groups.css";
import Header from '../../Components/Header';
import { fetchMyGroupsApi } from '../../Api/Groups'
import { joinGroupApi, createGroupApi } from "../../Api/Groups";

function Groups(props) {

  const [myGroups, setMyGroups] = useState([])

  useEffect(() => {
    const getGroups = async () => {
      const res = await fetchMyGroupsApi(props.user.email);
      // console.log({ res })
      setMyGroups(res);
    }
    getGroups();
  }, [])

  return (
    <div id="grpBody">
      <Header />

      {myGroups?.map((group, index) => {
        return <div key={index} className="p-5 text-center" id="jumboTron">
          <h1 className="mb-3">{group.name}</h1>
          <h4 className="mb-3">Status: {group.status === true ? "Open" : "Closed"} | Freezed: {group.freeze}</h4>
          <a className="btn btn-primary" href={`/groups/${group.id}`} role="button">Open</a>
          <h6 className="mt-3">Admin: {group.admin}</h6>
        </div>
      })}
    </div>
  );
}

export default Groups;
