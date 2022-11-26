import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header'
import './Home.css';

export default function Home(props) {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      {props.user.email}
      <div>
        Welcome Banner
      </div>

      <div>
        <h1>Buy a server for you home today!</h1>
        <button className='btn btn-primary' onClick={() => navigate("/buy")}>Buy Server</button>
      </div>
      <div>
        About the technologies used
      </div>
    </div>
  )
}
