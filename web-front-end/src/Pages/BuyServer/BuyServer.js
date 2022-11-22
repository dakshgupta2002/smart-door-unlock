import React, { useState } from 'react';
import './BuyServer.css'
import { buyServerApi } from '../../Api/Server';
import Clipboard from '../../assets/clipboard.svg';

function BuyServer() {

  const [owner, setOwner] = useState("")
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [serverId, setServerId] = useState(null);

  const handleBuy = async () => {
    const serverId = await buyServerApi(owner, email, phone, address);
    setServerId(serverId);
  }
  const SuccessInfo = () => {
    return (<>
      <button title="Copy to clipboard" class="badge rounded-pill btn btn-warning my-40" onClick={() => {
        navigator.clipboard.writeText(serverId);
      }}>
        {serverId} &nbsp;
        <img src={Clipboard} alt="clip" />
      </button>
      <div className='alert alert-dark' role="alert">Your product will be delivered within 3-4 days.</div>
      <div className='alert alert-dark' role="alert">Proceed to create a group of trusted members who should access the device.</div>
    </>)
  }

  return (
    <div id='Body'>
      <div className="card" id='appCard'>
        <div className="card-body">
          {!serverId && <>
            <h5 className="card-title" id='title'>Buy Server</h5>
            <h6 className="card-subtitle mb-2 text-muted" id='subTitle'>Protect your loved ones.</h6>
            {/* Name */}
            <div className="input-group flex-nowrap" id="ownerName">
              <input type="text" className="form-control" placeholder="Owner Name" aria-label="Owner Name" aria-describedby="addon-wrapping" value={owner} onChange={(e) => setOwner(e.target.value)} />
            </div>
            {/* Phone */}
            <div className="input-group flex-nowrap" id="phone">
              <input required type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {/* Email */}
            <div className="input-group flex-nowrap" id="email">
              <input required type="text" className="form-control" placeholder="Phone number" aria-label="Phone number" aria-describedby="addon-wrapping" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            {/* Address */}
            <div className="input-group flex-nowrap" id="address">
              <input type="text" className="form-control" placeholder="Delivery Address" aria-label="Delivery Address" aria-describedby="addon-wrapping" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            {/* SUBMIT */}
            <button type="button" className="btn btn-primary btn-lg btn-block" id='login-btn' onClick={handleBuy} disabled={!email || !address}>Pay $100</button>
          </>}
          {serverId && <SuccessInfo />}
        </div>
      </div>
    </div>
  );
}
export default BuyServer;
