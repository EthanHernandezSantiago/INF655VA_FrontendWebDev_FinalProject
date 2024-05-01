import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {

  const { username, password, comfimPassword, setUsername, setPassword, setComfimPassword, signUp } = useContext(UserContext);
  const naviagor = useNavigate();

  async function handleSubmit() {
    try {
      if (password !== comfimPassword) {
        alert("Error: Passwords do not match")
        return;
      }
      if (password.length < 6) {
        alert("Error: Passwords must be 6 letters or longer")
        return;
      }
      await signUp(username, password);
      naviagor('/')
    } catch (error) {
      console.log(error)
    }
    console.table(username, password, comfimPassword); 
  }

  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-r from-red-400 to-purple-400 '>
    <div className="border-4 border-black p-8 rounded-lg bg-white">
        <h1 className='mb-3 text-2xl text-center border-b border-black'>Sign up</h1>
        <form onSubmit={e => {e.preventDefault(); handleSubmit()}}>
           <fieldset>
              <label htmlFor="username">Username: </label>
              <input name="username" type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>
              <br />
              <label htmlFor='password'>Password: </label>
              <input className="mt-5" name="password" type='text' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
              <br />
              <label htmlFor='cpassword'>Cofrim Password: </label>
              <input className='mt-5' name="cpassword" type="text" placeholder='Comfrim Password' value={comfimPassword} onChange={e => setComfimPassword(e.target.value)} />
              <br /> 
              <input className='mt-5 border-2 border-black p-1 rounded-md' type="submit" />
            </fieldset>
        </form>
    </div>
  </div>
  )
}
