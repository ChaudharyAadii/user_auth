import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/mix.css'
import { ToastContainer, toast } from 'react-toastify';
import { sentOtpFunction } from '../services/Apis';
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {

  const [email, setEmail] = useState('');
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  // send OTP

  const sendOtp = async(e) => {
    e.preventDefault();

    if (email === '') {
      toast.error("Enter your email");
    } else if(!email.includes("@")){
      toast.error("Enter valid email");
    } else{
      setSpinner(true);
      toast.success("Otp sent");

      const data = {
        email: email
      }

      const response = await sentOtpFunction(data);
      console.log(response);

      if(response.status === 200){
        setSpinner(false);
        navigate("/user/otp",{state: email});   // state is to get this email id at the otp page
      } else {
        toast.error(response.response.data.error);
      }
    }
  }

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are glad you are back. Please login.</p>
          </div>
          <form action="">
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name='email' id='' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email address' />
            </div>
            <button onClick={sendOtp} className="btn">Login
            {
              spinner ? <span><Spinner animation="border"></Spinner></span>: ""
            }
            </button>
            <p>Don't have an account <NavLink to='/register'>Signup</NavLink> </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}
