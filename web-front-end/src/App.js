import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home'
import Groups from './Pages/Groups/Groups';
import GroupInfo from './Pages/GroupInfo/GroupInfo';
import Profile from './Pages/Profile/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute'
import CreateGroup from './Pages/Groups/CreateGroup';
import JoinGroup from './Pages/Groups/JoinGroup';
import { auth } from './firebase';
import BuyServer from './Pages/BuyServer/BuyServer';

function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user.email)
      if (user) {
        setUser(user);
      } else setUser(null);
    })
  })

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/buy" element={<BuyServer user={user}/>} />
        <Route path="/groups" element={<ProtectedRoute user={user}> <Groups user={user}/> </ProtectedRoute>} />
        <Route path="/groups/:groupId" element={<ProtectedRoute user={user}> <GroupInfo user={user}/> </ProtectedRoute>} />
        <Route path="/createGroup" element={<ProtectedRoute user={user}> <CreateGroup user={user}/> </ProtectedRoute>} />
        <Route path="/joinGroup" element={<ProtectedRoute user={user}> <JoinGroup user={user}/> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute user={user}> <Profile user={user}/> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
