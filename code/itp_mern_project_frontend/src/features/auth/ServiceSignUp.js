import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {

    return (
        <div className='container text-center'>
            <h1 className='display-4'>Sign Up</h1>

            <form onSubmit={e => e.preventDefault()}>
                <input type='text' placeholder='Username' className='form-control'/> <br />
                <input type='password' placeholder='Password' className='form-control'/> <br />
                <br />
                <input type='submit' className='btn'/>
            </form>

            <p>Want to host your services? <Link to={'/auth/services-sign-up'}>sign up for services</Link> here</p>
        </div>
    )
}

export default SignUp