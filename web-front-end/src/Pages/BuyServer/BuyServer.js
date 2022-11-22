import React, { useState } from 'react';
import './BuyServer.css'
import { buyServerApi } from '../../Api/Server';
import Clipboard from '../../assets/clipboard.svg';

function BuyServer() {

  const [owner, setOwner] = useState('')
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serverId, setServerId] = useState("");

  const handleBuy = async () => {
    const serverId = await buyServerApi(owner, phone, address);
    setServerId(serverId);
  }
  const DataForm = () => {
    return (<>
      <h5 className="card-title" id='title'>Buy Server</h5>
      <h6 className="card-subtitle mb-2 text-muted" id='subTitle'>You will be sent OTP on this number.</h6>
      {/* Name */}
      <div className="input-group flex-nowrap" id="ownerName">
        <input type="text" className="form-control" placeholder="Owner Name" aria-label="Owner Name" aria-describedby="addon-wrapping" value={owner} onChange={(e) => setOwner(e.target.value)} />
      </div>
      {/* Phone */}
      <div className="input-group flex-nowrap" id="phone">
        <input required type="number" className="form-control" placeholder="Phone number" aria-label="Phone number" aria-describedby="addon-wrapping" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      {/* Address */}
      <div className="input-group flex-nowrap" id="address">
        <input type="text" className="form-control" placeholder="Delivery Address" aria-label="Delivery Address" aria-describedby="addon-wrapping" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>

      {/* SUBMIT */}
      <button type="button" className="btn btn-primary btn-lg btn-block" id='login-btn' data-bs-toggle="modal" data-bs-target="#successModal" onClick={handleBuy} disabled={!phone || !address}>Pay $100</button>

    </>)
  }
  const SuccessInfo = () => {
    return (<>
      <button title="Copy to clipboard" class="badge rounded-pill btn btn-warning mt-40" onClick={() => {
        navigator.clipboard.writeText(serverId);
      }}>
        {serverId} &nbsp;
        <img src={Clipboard} alt="clip" />
      </button>
      <p>This is the server ID generated.</p>
      <p>Your product will be delivered within 3-4 days.</p>
      <p>Proceed to create a group of trusted members who should access the device.</p>
    </>)
  }

  return (
    <div id='Body'>
      <div className="card" id='appCard'>
        <div className="card-body">

          {serverId? <SuccessInfo/>: <DataForm/>}
        </div>
      </div>
    </div>
  );
}
export default BuyServer;
