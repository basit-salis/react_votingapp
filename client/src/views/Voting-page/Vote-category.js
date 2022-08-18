import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {DateTime} from 'luxon'
import {useLocation} from  'react-router-dom'
import './Vote-category.css'
import Candidate from './candidate';


const dt = DateTime;

function VoteCategory() {

const location = useLocation();
const dataa = location.state.voter
console.log('dd',dataa)
const electionId = dataa.voterData.electionid
const voterId = dataa.voterData.voterid


        const [voterid,setVoterid] = useState('');
        const [electionData,setElectionData] = useState([]);
        const [data,setData] = useState([]);
        
  // useEffect runs when component mounts and sets the state when request completes
    useEffect(() => {
        Axios.get(`http://localhost:3001/voter/votingPage/${electionId}/${voterId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                // console.log(response)
                let {getElectionData,getCandidate,getVoter} = response.data;
              setVoterid(getVoter[0].voterId)
                setData(getCandidate)
                setElectionData(getElectionData[0])

            })

    }, [])

    return (
  
        <div className='vote__main'>
              <div className='voter__election_data d-flex flex-column justify-content-start align-items-center py-2'>
                <p id='voter__election_status'>election started </p>
                <p>voting type</p>
                <h1 id='voter__election_name'>{electionData.ELECTION_NAME}</h1>
                <p>from {dt.fromISO(`${electionData.Start_time}`).toLocaleString(dt.DATETIME_FULL)} to {dt.fromISO(`${electionData.Stop_time}`).toLocaleString(dt.DATETIME_FULL)} </p>
                <p >organised by: {electionData.Organisers}K</p>
            </div>
           <Candidate result ={data} voterid={voterid}/>
        </div>
    )
}

export default VoteCategory
 