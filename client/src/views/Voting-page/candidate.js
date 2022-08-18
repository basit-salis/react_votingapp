
import React, { useState } from 'react';
import man from '../../views/Login/man.png'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Candidate({ result, voterid }) {
    // console.log('re', result)
    const [num, setNum] = useState({})

    const navigate = useNavigate()

    const selectedCandidate = (candidate) => {
        const { position, id: candidateId } = candidate;
        // console.log(position, candidateId)
        num[position] = num[position] ? candidateId : candidateId;
        // console.log(num)
        document.getElementById(`${candidateId}`).style.backgroundColor = 'red';


    }
    const vote = (e) => {
        Axios.post('http://localhost:3001/voter/voted', {
            pollId: '1221',
            voterId: voterid,
            electionId: result[0].ElectionId,
            votedFor: e
        }).then((response) => {
            // console.log(response)
            let res = response.data;
            navigate(`voting-result`)
        })

    }
    let arr = []
    return (
        <div className='position-relative'>
            <div className="vote__category__container d-flex flex-column justify-content-start align-items-start py-5">
                {result.map((item) => {
                    const { id: voterId, position, priority } = item;

                    const filtered = result.filter(fill => (fill.priority === priority && !(arr.includes(priority))))
                    arr.push(priority)

                    if (filtered.length !== 0) {
                        return (
                            <div className="row category__row d-flex justify-content-center " key={voterId}>

                                <div className="col-sm-8 col-md-12 category__head__container py-1" >
                                    <h5 className='category__head'>
                                        {`${position}`}
                                    </h5>
                                    <p>your vote is your power, decide right </p>
                                </div>

                                {filtered.map(candidate => {

                                    if (candidate.priority === priority)
                                        return (
                                            <div key={candidate.id} className="col-sm-8 col-md-6 d-flex justify-content-center align-items-center category__content " >
                                                <div className="category d-flex align-items-center">
                                                    <img className='voter__profile__pic' src={man} alt="voter-profile" />
                                                    <div className="about__candidate px-4 py-2 ">
                                                        <h5>{candidate.candidate_name}</h5>
                                                        <h6>{candidate.position}</h6>
                                                        <button className='btn btn-sm btn-secondary' id={candidate.id} onClick={() => selectedCandidate(candidate)}>vote</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                }
                                )

                                }

                            </div>
                        )
                    }


                }

                )}


                <div className='finish__vote d-flex flex-column justify-content-center align-items-center w-100'>
                    <button className='btn' id='vote__submit' onClick={() => vote(num)}>submit</button>
                </div>

            </div>
        </div>
    )
}


export default Candidate;