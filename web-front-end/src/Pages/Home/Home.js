import React from 'react'
import Header from '../../Components/Header'
import './Home.css';

export default function Home(props) {
  return (
    <>
      <Header />
      {/* Banner  */}
      {props.user.email}
      <div>
        Welcome Banner
      </div>

      <div>
        About the technologies used
      </div>
    </>
  )
}
