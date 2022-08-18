import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { setAuthToken } from '../../utils/helpers/helpers';
import './Login.css';
import { Link } from 'react-router-dom';
import Lock from './lock.png';
import Lock1 from './lock1.png';
import Man from './man.png';
import Axios from 'axios';
import Prompt from '../../components/prompt';
// import { useJwt } from "react-jwt";
// const token = "Your JWT";

function Login() {
  let navigate = useNavigate()
  // const { decodedToken, isExpired } = useJwt(token);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg,setErrMsg] = useState("")

  const remErr = ()=>{
    setErrMsg("");
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3001/voter/signinVoter',
      {
        userid: username,
        passcode: password
      }).then((response) => {
        const data = response.data
        console.log(response)
        const msg = data.msg
        const token = data.token
        setErrMsg(msg)
       
        if (data.Status) {
          // set token to local storage
          localStorage.setItem('token', token)
          setAuthToken(token)
          console.log('msg',msg)
          navigate('/voting-page', { state: { voter: data } },{ replace: true }) 
        }
        else {
          console.log(msg)
          navigate('/login')

        }


      });
  }

  return (
    <div>

      <div className="login__container d-flex flex-column justify-content-center align-items-center text-white w-100">
        <form onSubmit={handleSubmit} className="login__content d-flex flex-column justify-content-start align-items-center">

          <img className="login__img mb-4" src={Lock} alt='logo' />
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="">
                <img src={Man} alt='logo' />
              </div>
            </div>

            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" name="username" placeholder="username" />
          </div>

          <div className="input-group">
            <div className="input-group-prepend">
              <div className="">
                <img src={Lock1} alt='logo' />

              </div>
            </div>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" name="password" placeholder="Password" />
          </div>

          <button onClick={handleSubmit} className={"btn login__btn"} >
            Login
          </button>
        </form>
        {errMsg !== '' ? <Prompt err={errMsg} removeErr={remErr} /> : null}


      </div>
    </div>
  )
}

export default Login
