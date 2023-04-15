import React, { createContext, useReducer } from 'react'

const AuthDataContext = createContext({})

export const AuthDataProvider = ({ children }) => {

    const credentialsReducer = (state, action) => {
        switch (action.type) {
            case 'upd_username':
                return { ...state, username: action.payload }
            case 'upd_password':
                return { ...state, password: action.payload }
            case 'inc_attemptCount':
                return { ...state, attemptCount: state.attemptCount+1 }
            default:
                throw new Error('useReducer Error')
        }
    }

    const [credentials, credentialAction] = useReducer(credentialsReducer, {
        username: '',
        password: '',
        attemptCount: 0
    })

    const handleLogin = (e) => {
        e.preventDefault()
        credentialAction({ type: 'inc_attemptCount' })
    }

    return (
        <AuthDataContext.Provider value={{
            credentials, credentialAction,
            handleLogin
        }}>
            {children}
        </AuthDataContext.Provider>
    )
}

export default AuthDataContext