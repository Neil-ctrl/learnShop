import React, { useState, useEffect } from 'react'

function Register() {

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confPwd, setConfPwd] = useState("")
    const [phoneNo, setPhoneNo] = useState()
    const [message, setMessage] = useState("")
    const [dataReady, setDataReady] = useState(false)
    const [submitMsg, setSubmitMsg] = useState("")


    const registerUser = async () => {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"fname": fname, "lname": lname, "username": username, "password": password, "phone": phoneNo})
            })
            const responseData = await response.json()
            const responseMessage = responseData.message
            setSubmitMsg(responseMessage)
            setMessage("")
            console.log('Login Server Response : ', responseData, responseMessage)
        } catch (error) {
            console.error('Error submitting data : ', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await checkPass()
        if (dataReady)
        {
            console.log(fname, lname, username, password, confPwd, phoneNo)
            registerUser()
        }
    }

    const checkPass = async () => {
        if (password === confPwd)
        {
            setDataReady(true)
        }
        else {
            setMessage("Please re-enter correct password")
            setSubmitMsg("")
        }
    }
    

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name : </label>
                <input type='text' pattern='^[A-Za-z]{2,15}$' required onChange={e => setFname(e.target.value)} />
            </div>
            <div>
                <label>Last Name : </label>
                <input type='text' pattern='^[A-Za-z]{2,15}$' required onChange={e => setLname(e.target.value)} />
            </div>
            <div>
                <label>Username : </label>
                <input type='text' required onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Phone Number : </label>
                <input type='tel' pattern='[0-9]{10}' required onChange={e => setPhoneNo(e.target.value)} />
            </div>
            <div>
                <label>Password : </label>
                <input type='password' required onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
                <label>Confirm Password : </label>
                <input type='password' required onChange={e => setConfPwd(e.target.value)} />
            </div>
            <div
                ><p color='red'>{message}{submitMsg}</p>
            </div>
            <div>
                <button>Register</button>
            </div>
        </form>
        </>
    )
}

export default Register