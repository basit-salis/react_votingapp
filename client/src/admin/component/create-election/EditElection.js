import React from 'react'
import './EditElection.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import AdminNavbar from '../navbar/Admin-navbar';
import AdminSidebar from '../sidebar/Admin-sidebar';
import ViewCandidates from './Edit'
import electionImg from '../assets/img/curved6.jpg'
import AddVoterModal from './addVoterModal';
import AddCandidateModal from './addCandidateModal';
import UpdateElectionModal from './updateElectionModal';
import { apiCalls,Start } from '../apiCalls/apiCalls.js'
import { electionStatus, timeLeft } from '../../../utils/helpers/check-election'








function EditElection() {
    const [status, setStatus] = useState('0')
    const [api, setApi] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [candidateModalShow, setCandidateModalShow] = useState(false);
    const [updateElection, setUpdateElection] = useState(false);
    const [timer, setTimer] = useState('0: 0: 0')

    const handleModal = () => setModalShow(true);
    const handleCandidateModal = () => setCandidateModalShow(true);
    const updateElectionModal = () => setUpdateElection(true);
    // update props from child ==close modal==
    const changeProps = () => setModalShow(false);
    const changeCanProps = () => setCandidateModalShow(false);
    const updateElectionProps = () => setUpdateElection(false)

    const routeToCandidates = (id) => {
        navigate(`view-candidates`, { state: { electionId: id } })
    }

    const routeToVoters = (id) => {
        navigate(`view-voters`, { state: { electionId: id } })
    }
    const stopElection = async (election) => {
        let con = window.confirm('Election cant be continued after using stop, kindly use pause if you want to continue later ')
        console.log(election.ElectionId)
        if (con) { 
            let response = await Start(election.ElectionId)
        };
    }
    const result = (election) => {
        if (election.Status === 2) {
            navigate(`result`, { 
                state: { 
                    election
                } })
        }
        else {
            alert('election is still live')
        }
        console.log(election)

    }
    const navigate = useNavigate();

    useEffect(() => {
        async function fun() {
            const data = await apiCalls()
            setApi(data)
       
            }
        
        fun()
    }, [status])

    return (
        <div className='row jumbotron jumbotron-fluid' style={{ 'height': '100vh', 'backgroundColor': '#f2f3ff' }}>
            <div className="col-2 col-md-1 bg-secondary">
                <AdminSidebar />
            </div>


            <div className="col-10 col-md-11">
                <div className="row nav__row">
                    <AdminNavbar />
                </div>
                <div className="row  edit__election__container border">
                    {/* editable table come here */}

                    {/* trial */}
                    {api.length !== 0 && api.map((d) => {
                        //() => pause === 'Start' ? play('Pause') : play('Start')
                        const StartPause = async()=>{
                            let eStatus = d.Status
                            let id = d.ElectionId
                            let response = await Start(id, eStatus)

                            status === 0 ? setStatus('1'): setStatus('0')
                            
                       

                        }
        

                        return (
                            <div className="col-12 border col-sm-6 col-md-4 edit__election__item d-flex flex-column justify-content-center align-items-center my-2" key={d.ElectionId}>
                                <div className="election__data d-flex flex-column p-2 px-sm-3">
                                    <div className='d-flex justify-content-between' id="dt"><span>{d.ELECTION_NAME}</span> <button id='edit__btn' onClick={() => result(d) }>result</button></div>
                                    <div className='d-flex justify-content-between' id="dt"><span>edit election</span> <button id='edit__btn' onClick={updateElectionModal}>edit  <i className='mdi mdi-alert'></i></button></div>
                                    <div className='d-flex justify-content-between' id="dt"><span>add candidate</span><button id='edit__btn' onClick={handleCandidateModal} >edit  <i className='mdi mdi-boombox'></i></button></div>
                                    <div className='d-flex justify-content-between' id="dt"><span>add voters</span> <button id='edit__btn' onClick={handleModal}>edit  <i className='mdi mdi-account-group'></i></button></div>

                                    <div className="footer__edit d-flex justify-content-around position-relative mt-2 py-1">
                                        <div className="row election__footer d-flex">
                                            <span className='col-6' id='edit__span'><button id='view__btn' className='btn' onClick={() => stopElection(d)}>stop </button></span>
                                            <span className='col-6' id='edit__span'><button id='view__btn' className='btn' onClick={()=> StartPause()}>{d.Status === 0 ? 'Start' : 'Pause'}</button></span>
                                            <span className='col-6' id='edit__span'><button id='view__btn' className='btn' onClick={() => routeToCandidates(d.ElectionId)}> candidate </button></span>
                                            <span className='col-6' id='edit__span'><button id='view__btn' className='btn' onClick={() => routeToVoters(d.ElectionId)}>voters </button></span>
                                        </div>
                                        <div className="row footer__img_container d-flex justify-content-center align-items-center">
                                            <img className='footer__img' src={electionImg} alt="" />

                                        </div>
                                    </div>

                                </div>

                            </div>
                        )
                    })}



                    <div className=" d-flex flex-column p-2 px-3">
                        <AddVoterModal modalHandler={modalShow} change={changeProps} />
                        <AddCandidateModal modalHandler={candidateModalShow} change={changeCanProps} />
                        <UpdateElectionModal modalHandler={updateElection} change={updateElectionProps} />

                    </div>

                    {/* trial */}
                </div>


            </div>

        </div>

    )
}

export default EditElection








