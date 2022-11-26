import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import { fetchGroupApi } from "../../Api/Groups";
import Clipboard from "../../assets/clipboard.svg";
import { toast } from "react-toastify";
import "./GroupInfo.scss";

export default function GroupInfo(props) {
  const { groupId } = useParams();
  const [isToggledOn, handleToggleButton] = useState(true);
  const [group, setGroup] = useState();

  useEffect(() => {
    const fetchGroupInfo = async () => {
      const res = await fetchGroupApi(props.user.email, groupId);
      console.log(res);
      setGroup(res);
    };
    fetchGroupInfo();
  }, []);

  const ShareKey = () => {
    return (
      <>
        <button
          title="Copy to clipboard"
          class="badge rounded-pill btn btn-success"
          onClick={() => {
            navigator.clipboard.writeText(group?.key);
            toast.success("Group key was copied to clipboard");
          }}
        >
          {group?.key} &nbsp;
          <img src={Clipboard} alt="clip" />
        </button>
        {/* <h6>Share this key with others to invite them to this group</h6> */}
      </>
    );
  };

  function toggle() {
    handleToggleButton(!isToggledOn);
  }

  return (
    <div id="bdy">
      <Header />

      {/* 
      <h4 className="mb-3">Status: {group?.status === true ? "Open" : "Closed"} | Freezed: {group?.freeze}</h4>
       */}
      <div style={{display:"flex", justifyContent:"space-around", alignItems:"center", marginTop:"10px"}}>
        <ShareKey />
        <button className="bn62"><span>Freeze  <i class="fa-solid fa-lock"></i></span></button>
      </div>
      <h1 className="mb-3" style={{textAlign:"center", marginTop:"40px", color:"white"}}>{group?.name}</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
          height: "200px",
        }}
      >
        <button
          className={"power_button " + (isToggledOn ? "is-active" : "")}
          onClick={toggle}
        >
          <div className="power_button__icon">
            <span className="power_button__icon__arrow"></span>
          </div>
          <p className="power_status">{isToggledOn ? "Locked" : "Unlocked"}</p>
        </button>
      </div>
      {/* Controls */}
      {/* History */}
    </div>
  );
}
