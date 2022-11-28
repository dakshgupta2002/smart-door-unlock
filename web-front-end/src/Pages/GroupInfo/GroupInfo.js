import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import { fetchGroupApi } from "../../Api/Groups";
import Clipboard from "../../assets/clipboard.svg";
import { toast } from "react-toastify";
import "./GroupInfo.scss";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  flexDirection: "column",
  height: "200px",
}
export default function GroupInfo(props) {
  const { groupId } = useParams();
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
          className="badge rounded-pill btn btn-success"
          onClick={() => {
            navigator.clipboard.writeText(group?.key);
            toast.success("Group key was copied to clipboard");
          }}
        >
          {group?.key} &nbsp;
          <img src={Clipboard} alt="clip" />
        </button>
      </>
    );
  };

  const handleDoorStatus = async () => {
  }

  const handleDoorFreeze = async () => {
    if (props.user.email !== group?.admin) {
      toast.warning("You need admin access to perform this operation");
      return;
    }
    // update on the firebase database
    await setDoc(doc(db, "groups", groupId), { freeze: !group.freeze }, { merge: true })
    // update on the current UI
    setGroup({ ...group, freeze: !group.freeze })
  }

  return (
    <div id="bdy">
      <Header />

      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "10px" }}>
        <ShareKey />
        <button className="bn62" onClick={handleDoorFreeze}><span> {group?.freeze === true ? "Unfreeze" : "Freeze"} <i className="fa-solid fa-lock"></i></span></button>
      </div>

      <h1 className="mb-3" style={{ textAlign: "center", marginTop: "40px", color: "white" }}>{group?.name}</h1>
      
      <div style={divStyle}>
        <button
          className={"power_button " + (group?.status === true ? "is-active" : "")}
          onClick={handleDoorStatus}
        >
          <div className="power_button__icon"><span className="power_button__icon__arrow"></span></div>
          <p className="power_status">{group?.status === false ? "Lock" : "Unlock"}</p>
        </button>
      </div>
    </div>
  );
}
