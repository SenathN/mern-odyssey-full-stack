import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthDataContext from './AuthDataContext'

const Login = () => {

  const { credentials, credentialAction, handleLogin } = useContext(AuthDataContext)

  return (
    <div className='container text-center w-75'>
      <h1 className='display-4 my-3'>Login</h1>

      {/* <p>{JSON.stringify(credentials)}</p> */}
      <form>
        <input type='text' placeholder='Email or Service name '
          value={credentials.username}
          onChange={(e) => credentialAction({
            type: 'upd_username', payload: e.target.value
          })}
          className='form-control'
        /> <br />
        <input type='password' placeholder='Password'
          value={ credentials.password}
          onChange={(e) => credentialAction({
            type: 'upd_password', payload: e.target.value
          })}
          className='form-control'
        /> <br />
        <br />
        <input type='submit' onClick={(e) => handleLogin(e)} className='btn btn-primary'/>
      </form>
      <p className='mt-4'>or <Link to='/auth/sign-up'> sign up here </Link> if you do not have an account.</p>
    </div>
  )
}

export default Login