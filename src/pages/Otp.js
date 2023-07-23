import React, { useState } from 'react';
import '../styles/mix.css';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from '../services/Apis';

export default function Otp() {

  const [otp, setOtp] = useState("");

  console.log(otp);

  const location = useLocation();

  console.log(location);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Enter your OTP");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter valid OTP");
    } else if (otp.length < 6) {
      toast.error("Incorrect OTP");
    } else {
      const data = {
        otp, email: location.state
      }

      const data2 = location.state;
      const response = await userVerify(data);
      // console.log(response);
      if(response.status === 200){
        localStorage.setItem("userdbtoken", response.data.userToken);
        toast.success(response.data.message); 
        setTimeout(() => {                         // if timeout is not set then the succes msg would not be shown before redirecting the page to the dashboard.
          navigate("/dashboard", {state: data2});
        },4000);
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
            <h1>Please enter your OTP here</h1>
          </div>
          <form action="">
            <div className="form_input">
              <label htmlFor="otp">OTP</label>
              <input type="text" name='otp' id='' onChange={(e) => setOtp(e.target.value)} placeholder='Enter your OTP' />
            </div>
            <button className="btn" onClick={loginUser}>Submit</button>
          </form>
        </div>
      </section>
    </>
  )
}
