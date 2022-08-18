import React,{useState} from 'react'
import './home.css'
import {Link} from 'react-router-dom'
import {electionStatus,startElection} from '../../utils/helpers/check-election'


function Home() {
// const [timer,setTimer] = useState("")
 
  // startElection()
 

  return (
    <div className='landing__page d-flex'>
      <div className="land__left">
        <center><h3>admin</h3></center>
        <ul className='list-unstyle'>
          <Link to='admin-home'>Login as user</Link>
        </ul>

      </div>
      <div className="land__right">
        <center><h3>voter</h3></center>
        <ul className='list-unstyle'>
          <Link to='login'>Login as voter</Link><br />
        </ul>
      </div>
      

        
    </div>

  )
}

export default Home