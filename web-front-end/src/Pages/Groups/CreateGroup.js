import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createGroupApi } from '../../Api/Groups';
import { verifyAndEmail } from '../../services/GroupOTP';
import "./CreateGroup.css";
import emailjs from "@emailjs/browser";

export default function CreateGroup(props) {
  const [gname, setGName] = useState("");
  const [serverID, setServerID] = useState("");
  const [correctOtp, setCorrectOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const getOtp = async () => {
    const recipient = await verifyAndEmail(serverID);
    if (!recipient) return;

    //generate OTP and send the email to the recipient
    let newOtp = Math.floor(Math.random() * 1000000)
    emailjs.send("service_egno0jj", "template_b9rd4iv", {
      serverID,
      otp: newOtp,
      recipient,
    }, "mlPpuxXj_1m_pqg7m");

    setCorrectOtp(newOtp);
    setOtpSent(true);
  }

  const createGroup = async () => {
    console.log({ otp, correctOtp })
    if (otp.toString() !== correctOtp.toString()) {
      toast.error("Invalid OTP");
      return;
    }
    await createGroupApi(props.user.email, gname, serverID)
  }

  return (
    <div id='Body'>
      <div className="card" id='appCard'>
        <div className="card-body">
          <h5 className="card-title" id='title'>Create Group</h5>
          <h6 className="card-subtitle mb-2 text-muted" id='subTitle'>Enter Group Name, Server-ID & Password</h6>
          <div className="input-group flex-nowrap" id="userName">
            <input type="text" className="form-control" placeholder="Group Name" name="Group Name" value={gname} onChange={(e) => { setGName(e.target.value) }} />
          </div>
          <div className="input-group flex-nowrap" id="serverID">
            <input type="text" className="form-control" placeholder="Server-ID" name="serverID" value={serverID} onChange={(e) => { setServerID(e.target.value) }} />
          </div>

          {!otpSent &&
            <button type="button" className="btn btn-primary btn-lg btn-block" id='get-otp' onClick={getOtp}>
              Get OTP
            </button>
          }

          {otpSent && <>
            <div className="input-group flex-nowrap" id="otp">
              <input type="text" className="form-control" placeholder="OTP" aria-label="OTP" aria-describedby="addon-wrapping" value={otp} onChange={(e) => { setOtp(e.target.value) }} ></input>
            </div>

            <button type="button" className="btn btn-primary btn-lg btn-block" id='create-btn' onClick={createGroup}>Create</button>
          </>}
        </div>


      </div>
    </div>
  )
}
