import React, { useState, useEffect } from 'react'
import Login from './Login'
import Store from './Store'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)




  return (
    <>

    <div>
      {console.log(isLoggedIn)}
      {isLoggedIn ? (isAdmin ? <p>Admin page goes here</p> : <Store />) : <Login  setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />}
    </div>
        
    </>
  )
}

export default App