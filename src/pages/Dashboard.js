import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

  const navigate = useNavigate();

  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if(token){
      console.log("User valid");
    } else{
      navigate("*")
    }
  }

  useEffect(() => {
    userValid();
  },[])
  return (
    <>
    <h1 style={{"text-align": "center"}} className='mt-5'>Congrats !! You have successfully logged in</h1>
    </>
  )
}
