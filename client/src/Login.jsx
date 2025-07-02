import React, { useState, useEffect } from 'react'
import "./Login.css"
import Register from './Register'

function Login({ setIsLoggedIn, setIsAdmin }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginMessage, setLoginMessage] = useState("")
    const [registering, setRegistering] = useState(false)


    const checkData = async () => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"username": username, "password": password})
            })
            const responseData = await response.json()
            const responseMessage = responseData.message
            console.log('Login Server Response : ', responseData, responseMessage)
            if (responseMessage == 'success')
            {
                setIsAdmin(responseData.admin)
                setIsLoggedIn(true)
            }
            else if (responseMessage == 'fail')
            {
                setLoginMessage("Incorrect Username or Password")
            }
        } catch (error) {
            console.error('Error submitting data : ', error)
        }
    }

    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        checkData()
        console.log(username, password)
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        setRegistering(true)
    }



    return (
        <>
        {registering ? <Register /> : 
        <div>
        <form onSubmit={handleSubmit} className='form-container'>
        <div className='header'>LOGIN</div>
        <div className='input'>
            <label>Username : </label>
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className='input'>
            <label>Password : </label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className='error-text'>{loginMessage}</div>
        <div>
            <button className='login-button' type='submit'>Login</button>
        </div>
        <div>
            <button className='register-button' onClick={handleRegister}>Register</button>
        </div>
        </form>
        
        </div>}

        </>
        
    )
}

export default Login