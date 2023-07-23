import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Dashboard() {

  const [name, setName] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state;

  // const getUsers = async () => {
  //   const response = await fetch('server.chaudharyaadii.repl.co', {
  //     method: 'GET',
  //   })
  //   const data = await response.json()
  //   // console.log(form);
  //   console.log(data);
  //   setName(data);
  // }

  const getUsers = async () => {
    try {
      const response = await fetch(`https://backend-2-rx7b.onrender.com?email=${email}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data);
      setName(data.fname);
      console.log(name);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [email])

  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if (token) {
      console.log("User valid");
    } else {
      navigate("*")
    }
  }

  useEffect(() => {
    userValid();
  }, [])
  return (
    <>
    <h1 style={{ "text-align": "center", "margin-top": "20px"}}>Hello {name}</h1> <br />
      <h2 style={{ "text-align": "center" }} className='mt-5'>Congrats !! You have successfully logged in as <br />
        {email} with username as {name}</h2>
    </>
  )
}
