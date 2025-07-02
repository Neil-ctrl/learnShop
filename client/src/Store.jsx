import React, { useState, useEffect } from 'react'
import TableComponent from './TableComponent'

function Store() {

    const [fruitsData, setFruitsData] = useState([])
    const [dataReady, setDataReady] = useState(false)

    const RefreshList = () => {
    setDataReady(false)
    fetch("/get_fruitsDB")
    .then(res => res.json())
    .then(data => {
          setFruitsData(data)
          console.log(data)
          setDataReady(true)
        })
    }


    const formSubmit = (event) => {
    const choice = document.getElementById("enteredChoice").value
    const amount = document.getElementById("enteredAmount").value
    console.log(choice, amount)
    fetch("/get_qty", {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({"frtName": choice, "qty": amount})
    }
    ).then(RefreshList)
    
  }


  

  useEffect(() => {
    fetch("/get_fruitsDB").then(
      res => res.json()
    ).then(
      data => {
        setFruitsData(data)
        console.log(data)
        setDataReady(true)
      }
    )
  }, [])

  const arrLen = fruitsData.length



    return (
    <>
    <div>
      <p>Available fruits and their quantities :</p>
    </div>
    <div>
      {dataReady ? <TableComponent data={fruitsData} /> : <p>Loading...</p>}

    </div>
    <div>
      <label>Enter desired fruit :</label>
      <input type = "text" placeholder = "Enter choice of fruit" id='enteredChoice' />
      {
        
      }
    </div>
    <div>
      <label>Enter ammount :</label>
      <input type='number' placeholder='0' id='enteredAmount' defaultValue={0} onEmptied />
      {
        //console.log("FINAL AMOUNT ENTERED : ", amount)
      }
    </div>
    <div>
      <button onClick={formSubmit}>SUBMIT</button>
      <button onClick={RefreshList}>Refresh</button>
    </div>
    </>
    )
}


export default Store