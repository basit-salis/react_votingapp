import React from 'react';
import './AfterVote.css';
import Man from '../Login/Login'
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function AfterVote() {
    const navigate = useNavigate()
    const logout = () =>{
          const tk = localStorage.getItem('token');
          tk ? localStorage.removeItem('token') : console.log(tk);
          
          navigate('/login', {replace:true})
    }

    return (
    <div className='voted__for__container container'>
        <div className='voted__for__content d-flex flex-column align-items-center'>
             {/* <div><img className='voted__img' src={Man} alt='avatar'/></div> */}
        <h4>your vote has been accepted</h4>
        <p className='text-center '>the result will be displayed on the voting screen <br/> when the election is haulted </p>
        <div className="voted__for">
            <ul className='list-unstyled'>
                <li>  display voted candidate</li>
                <li>president: thomas jojo</li>
                <li>asistent crook: sene tom</li>
                <li>pro: rekko juan</li>
            </ul>
            <div><button className='btn text-white finish__btn' onClick={()=>logout()}><span>&larr;</span> logout button</button></div>
        </div>
        </div>
       

    </div>
)
    }

export default AfterVote
