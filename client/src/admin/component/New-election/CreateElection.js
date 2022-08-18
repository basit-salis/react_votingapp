import React, { useState, useEffect } from 'react'
import { createElection,addCandidate } from '../apiCalls/apiCalls';
import 'react-datepicker/dist/react-datepicker.css'

import './CreateElection.css'
import Profile from '../navbar/man1.png'

// create election content
function CreateElection() {
    const [candidate, setCandidate] = useState([]);
    let d = candidate
    const addCandidate = () => {
        let candName = document.querySelector('.candidate__name').value
        let candPos = document.querySelector('.candidate__pos').value
        d.push({ candidateName: `${candName}`, candidatePosition: `${candPos}` })
        setCandidate(d);
    }

    useEffect(() => {
        console.log('mount')

        return () => {
            console.log('unmount')
        }
    }, [candidate])



    const addElection = async () => {
        let title = document.querySelector('[name = "election-name"]').value
        let description = document.querySelector('[name="election-desc"]').value
        let organisation = document.querySelector('[name="organisation-name"]').value
        let startDate = document.querySelector('[name="start-date"]').value
        let startTime = document.querySelector('[name = "start-time"]').value
        let endDate = document.querySelector('[name="end-date"]').value
        let endTime = document.querySelector('[name="end-time"]').value

        const election_data = {
            title,
            description,
            organisation,
            startDate,
            startTime,
            endDate,
            endTime,
            candidate
        }
        console.log(election_data)
        const data = await createElection(election_data)
        if(data.status === true){
            console.log('add candidates')
            alert(data.Msg)

    }}
    console.log('candidateBefore', candidate, d)

    return (
        <div className='new__election'>
            <div className="row election__head_container mt-3">
                <div className="col-12">
                    <h3 className='section__head'>Create Election</h3>
                </div>
                <div className="col-12 col-md-10">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="title">title</label>
                        <input type="text" className='election__head title' name="election-name" placeholder='election title' />
                        <input type="text" className='election__head description' name="election-desc" placeholder='election description' />
                    </div>
                </div>

                <div className="col-2 contestant__img__container d-none d-md-flex align-items-end">
                    <img src={Profile} className='candidate-img' alt="contestant imag" />
                </div>
            </div>

            <div className="row my-3 p-0">
                <div className="col-12 d-flex flex-column">
                    <label htmlFor="organisation">Name of The Organisation</label>
                    <input type="text" className='organisation px-2' name='organisation-name' placeholder='organisers of election' />
                </div>

            </div>

            <div className="row election__timer form-group d-flex">
       
                <div className="col-9 col-md-3 timer__container d-flex flex-column">
                    <label htmlFor="timer">start Date</label>
                    <input type="date" className='timer timer__end' name="start-date" id="start__date"
                        min={new Date()}
                    />

                    <label for="appt">Choose time to start election </label>

                    <input type="time" className='timer timer__end' id="appt" name="start-time"
                        min="09:00" max="18:00" required />

                </div>

                <div className="col-9 col-md-3 timer__container d-flex flex-column">
                    <label htmlFor="timer">End Date</label>
                    <input type="date" className='timer timer__end' name="end-date" id="start__date"
                        min={new Date()}
                    />
                    <label htmlFor="appt">Choose time to end election</label>

                    <input type="time" className='timer timer__end' id="appt" name="end-time"
                        min="09:00" max="18:00" required />
                </div>


            </div>

            <div className="row options form-group d-flex mt-4">
                <div className="col-12 col-md-10 candidate__container ">
                    <label htmlFor="candidate">options</label>
                    <div className='d-flex align-items-center option px-2 my-2'>
                        <input type="text" className='candidate__name my-1' name='candidateName' placeholder='candidate name' />
                        <input type="text" className='candidate__pos my-1 ' name='candidatePos' placeholder='candidate position' />
                        <button className='btn btn-primary btn-sm addC' onClick={() => addCandidate()}>+</button>
                    </div>
                    <div className='d-flex flex-column align-items-center candidate-grouping px-2 my-2 w-75'>

                        {candidate && candidate.map((e, i) => (
                            <div className="candidate bg-secondary d-flex justify-content-between align-items-center text-light w-100 my-1 px-3" key={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)}>
                                <span className='text-mute px-2'>{i + 1}</span>
                                <span>{e.candidateName}</span>
                                <span>{e.candidatePosition}</span>
                                <span className='bg-danger '><button className='btn btn-danger btn-sm '>x</button></span>
                            </div>

                        ))}
                    </div>

                    <button className='btn timer add__candidate my-3' onClick={() => addElection()}>create election </button>
                </div>
            </div>
        </div>
    )
}

export default CreateElection;
