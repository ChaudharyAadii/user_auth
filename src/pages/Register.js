import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom'
import { registerfunction } from '../services/Apis';
import '../styles/mix.css'

export default function Register() {

  const [passShow, setpassShow] = useState(false);

  const [inputdata, setInputdata] = useState({
    fname: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate();

  // setInputValue

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value })
  }

  // register user

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password } = inputdata;

    if (fname === "") {
      toast.error("Enter your name.!!");
    } else if (email === "") {
      toast.error("Enter your email.!!");
    } else if (!email.includes("@") && email !== "") {
      toast.error("Enter a valid email.!!");
    } else if (password === "") {
      toast.error("Enter your password.!!");
    } else if (password.length < 6) {
      toast.error("Password length too short.!!");
    } else {
      const res = await registerfunction(inputdata);

      if (res.status === 200) {
        setInputdata({ ...inputdata, fname: "", eamil: "", password: "" })
        navigate("/")
      } else {
        toast.error(res.res.data.error);
      }
    }
  }

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Hey, Welcome to our site</h1>
            <p>Please signup to create your account.</p>
          </div>
          <form action="">
            <div className="form_input">

              <label htmlFor="fname">Name</label>
              <input type="text" name='fname' onChange={handleChange} id='' placeholder='Enter your name' />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name='email' onChange={handleChange} id='' placeholder='Enter your email address' />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input type={!passShow ? "password" : "text"} name='password' onChange={handleChange} id='' placeholder='Enter your password' />
                <div className='showpass' onClick={() => setpassShow(!passShow)}>
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={handleSubmit} >Sign up</button>
            <p>Already have an account <NavLink to='/'>Login</NavLink> </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}
