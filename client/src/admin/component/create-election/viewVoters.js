import React, {useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import './EditElection.css'
import '../voters/voters.css'
import AdminSidebar from '../sidebar/Admin-sidebar';
import AdminNavbar from '../navbar/Admin-navbar';
import AddVoterModal from './addVoterModal';
import EditVoterModal from './editVoterModal'

import { getVoters,remVoter } from '../apiCalls/apiCalls'


function ViewVoters({ data }) {
    const [modalShow, setModalShow] = useState(false);
    const [editVoter, setEditVoter] = useState({"status":false, "id": 0});
    const handleModal = () => {setModalShow(true)};
    const changeProps = () => setModalShow(false);
    const updateEditProps = () => setEditVoter({ "status": false, "id": 0 })

    // console.log("data:", data)
     const location = useLocation();
     const electionId = location.state.electionId
     console.log(electionId)
    const [voters, setVoters] = useState([])

    const deleteVoter = async (d)=> {
        const confirm = window.confirm(`do you want to delete this voter with id ${d}`)
        const data = confirm && await remVoter(d);
        // alert(`test ${response}`)
        const data1 = await getVoters(electionId);
        setVoters(data1)
      
    }
    const updateVoters = (voters)=>{
        setVoters(voters)

    }

    useEffect(() => {
        async function fn() {
            const data = await getVoters(electionId);
            let response = data
            setVoters(response)
        }
        fn()

    }, [])

    return (
        <div className='row jumbotron jumbotron-fluid' style={{ "height": "100vh" }}>
            <div className="col-1 bg-secondary">
                <AdminSidebar />
            </div>


            <div className="col-11">
                <div className="row nav__row">
                    <AdminNavbar />
                </div>

                <div className="col-12 my-2">
                    <h3 className='section__head'>Voters for ELection_Name</h3>
                </div>


                <div className='row voters__table__row p-0 border'>
                    <div className="col-12 p-0">
                        <div className='row voters__table__head'>
                            <div className="col-3 tdata">Voter Email</div>
                            <div className="col-2 tdata">voter id</div>
                            <div className="col-3 tdata">Phone</div>
                            <div className="col-2 tdata">Voted</div>
                            <div className="col-2 tdata">Action <button className="btn btn-sm btn-secondary mx-1" onClick={handleModal}>add</button></div>

                        </div>
                    </div>

                    {voters && voters.map((voter) => (
                        <div className="col-12 "  key={voter.id}>
                            <div className="row voters__table">
                                <div className="col-3 tdata">{voter.email}</div>
                                <div className="col-2 tdata">{voter.voterId}</div>
                                <div className="col-3 tdata">{voter.mobile}</div>
                                <div className="col-2 tdata">{voter.vote_status ? <i className='mdi mdi-stop px-1'>yes</i> : <i className='mdi mdi-stop px-1'>no</i>} </div>
                                <div className="col-2 tdata">
                                    <button className="btn btn-sm btn-warning mx-1" onClick={() => setEditVoter({"status":true, "id":voter.id})}>edit</button>
                                    <button className="btn btn-sm btn-danger " onClick={()=> deleteVoter(voter.id)}>del</button> 
                                    </div>

                            </div>
                        </div>
                    ))}



                </div >
            </div>
            <AddVoterModal modalHandler={modalShow} updateVoters={updateVoters} change={changeProps} electionid={electionId} />
            <EditVoterModal modalHandler={editVoter} updateVoters={updateVoters} change={updateEditProps} electionid={electionId}/>
        </div>

    )
}

export default ViewVoters;










