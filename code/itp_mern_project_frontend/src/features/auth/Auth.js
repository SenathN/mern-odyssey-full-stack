import { AuthDataProvider } from './AuthDataContext'
import { useEffect, useRef, useState } from 'react'
import Login from './Login'
import ServiceLogin from './ServiceLogin'

const Auth = () => {
    const login = { freelancer: 'freelancer', user: 'user' }
    const [loginMode, setLoginMode] = useState(login.user)

    return (
        <AuthDataProvider>
            <div className='container '>
                <div className='row my-2'>
                    <div className='col-sm-6 '>
                        <input type='radio' name='login-mode' className='btn-check' id='customer-log'
                            checked={loginMode === login.user}
                            onChange={() => setLoginMode(login.user)}
                        />
                        <label className="btn btn-outline-primary w-100 m-1" htmlFor='customer-log'>Customer</label>
                    </div>
                    <div className='col-sm-6'>
                        <input type='radio' name='login-mode' className='btn-check' id='service-log'
                            checked={loginMode === login.freelancer}
                            onChange={() => setLoginMode(login.freelancer)}
                        />
                        <label className="btn btn-outline-success w-100 m-1" htmlFor='service-log'>Freelancer</label>
                    </div>
                </div>
            </div >
            <div className={`container-fluid p-3 text-dark 
                ${loginMode === login.user ?
                    'border-top border-bottom border-5 border-primary' :
                    'border-top border-bottom border-5 border-success'}`
            }>
                {loginMode === login.user && <Login />}
                {loginMode === login.freelancer && <ServiceLogin />}
            </div>
        </AuthDataProvider>
    )
}

export default Auth