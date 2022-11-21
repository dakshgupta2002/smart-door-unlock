import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../Components/Header';
import { fetchGroupApi } from '../../Api/Groups'
import Clipboard from '../../assets/clipboard.svg';
import { toast } from 'react-toastify';

export default function GroupInfo(props) {
  const { groupId } = useParams();
  const [group, setGroup] = useState();

  useEffect(() => {
    const fetchGroupInfo = async () => {
      const res = await fetchGroupApi(props.user.email, groupId);
      console.log(res);
      setGroup(res);
    }
    fetchGroupInfo();

  }, []);

  const ShareKey = () => {
    return <>
      <button title="Copy to clipboard" class="badge rounded-pill btn btn-success" onClick={() => {
        navigator.clipboard.writeText(group?.key);
        toast.success("Group key was copied to clipboard");
      }}>
        {group?.key} &nbsp;
        <img src={Clipboard} alt="clip" />
      </button>
      <h6>Share this key with others to invite them to this group</h6>
    </>
  };

  return (
    <div>
      <Header />

      <h1 className="mb-3">{group?.name}</h1>
      <h4 className="mb-3">Status: {group?.status === true ? "Open" : "Closed"} | Freezed: {group?.freeze}</h4>
      
      <ShareKey />
      {/* Controls */}
      {/* History */}

    </div>
  )
}
