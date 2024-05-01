import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { NavLink, useNavigate } from 'react-router-dom';
import GroupContext from '../context/GroupContext';

export default function LoginPage() {

    const { username, password, setUsername, setPassword, setUser, login } = useContext(UserContext);
    const { updateGroups } = useContext(GroupContext);
    const naviagor = useNavigate();

    async function handleSubmit() {
        try {
            await login(username, password)
            setUser({"username": username, "password": password});
            updateGroups(username);
            naviagor('/mainDashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex h-screen items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-400 '>
            <div className="border-4 border-black p-8 rounded-lg bg-white">
                <h1 className='mb-3 text-2xl text-center border-b border-black'>Login</h1>
                <form onSubmit={e => {e.preventDefault(); handleSubmit();}}>
                    <label htmlFor="username">Username: </label>
                    <input name="username" type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>
                    <br />
                    <label htmlFor='password'>Password: </label>
                    <input name="password" type='text' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
                    <br />
                    <input className='mt-5 border-2 border-black p-1 rounded-md' type="submit" />
                </form>
                <p className='mt-5 mb-2 pt-2 border-t border-black'>Don't have an account?</p>
                <NavLink to="/signUp" className="mt-5 border-2 border-black p-1 rounded-md">Create an Account</NavLink>
            </div>
        </div>
  )
}
