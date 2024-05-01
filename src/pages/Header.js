import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import GroupContext from '../context/GroupContext';

export default function Header({ text }) {

  const { setUser, logOut } = useContext(UserContext);
  const { setGroups } = useContext(GroupContext);
  const naviagor = useNavigate();

  async function handleLogOut() {
    try {
      await logOut();
      naviagor("/")
      setUser({"username": "NOT_LOGGED_IN", "password": "NOT_LOGGED_IN"})
      setGroups([])
      alert("You have been logged out"); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex justify-between border-b-4 border-black'>
        <h1 className='text-5xl p-3'>{text}</h1>
        <nav className='text-3xl flex items-center'>
            <NavLink to='/mainDashboard'>Home</NavLink>
            <NavLink to='/' className={"ml-5 mr-5"}><button onClick={handleLogOut}>Log Out</button></NavLink>
        </nav>
    </div>
  )
}
