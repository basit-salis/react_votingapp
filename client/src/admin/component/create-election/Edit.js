import React,{ useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './EditElection.css'
import '../voters/voters.css'
import AdminSidebar from '../sidebar/Admin-sidebar';
import AdminNavbar from '../navbar/Admin-navbar';
import AddCandidateModal from './addCandidateModal';
import EditCandidateModal from './editCandidate.modal'
import { getCandidate, remCandidate } from '../apiCalls/apiCalls';


function ViewCandidates(props) {
    const [candidates, setCandidates] = useState([])
    const [addCandidate, setAddCandidate] = useState(false)
    const [editCandidate, setEditCandidate] = useState({"status":false, "id": null})
    const data = props.data
  
     const location = useLocation();
     const electionId = location.state.electionId
     console.log(electionId)

    const updateCandidates = (candidates)=>{
        setCandidates(candidates)
    }
    useEffect(() => {
        async function fn() {
            const data = await getCandidate(electionId);
            setCandidates(data)
        }
        fn()

    }, [])

    //delete a candidate
    const deleteCandidate = async (id)=> {
        let some = await remCandidate(id); 
        alert(some.data)
        setCandidates(await getCandidate(electionId))

    };
    const updateAddProps = ()=> setAddCandidate(false)
    const updateEditProps = ()=> setEditCandidate(false)
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
                    <h3 className='section__head'>Candidates for ELection_Name</h3>
                </div>

                <div className='row voters__table__row p-0 border'>

                    <div className="col-12 p-0">
                        <div className='row voters__table__head'>
                            <div className="col-3 tdata">Candidate name</div>
                            <div className="col-3 tdata">Position</div>
                            <div className="col-2 tdata">Event-ID</div>
                            <div className="col-2 tdata">Ballot number</div>
                            <div className="col-2 tdata">Action<button className="btn btn-sm btn-secondary mx-1" onClick={()=>setAddCandidate(true)}>add</button></div></div>
                    </div>

                    {candidates && candidates.map((candidate) => (
                        <div className="col-12 " key={candidate.id} >
                            <div className="row voters__table">
                                <div className="col-3 tdata">{candidate.candidate_name}</div>
                                <div className="col-3 tdata">{candidate.position}</div>
                                <div className="col-2 tdata">{candidate.electionId} </div>
                                <div className="col-2 tdata"> <i className='mdi mdi-stop px-1'>Running</i> </div>
                                <div className="col-2 tdata">
                                    <button className="btn btn-sm btn-warning mx-1" onClick={() => setEditCandidate({ "status": true, "id": candidate.id })}>edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={()=>deleteCandidate(candidate.id)}>del</button> 
                                </div>

                            </div>
                        </div>
                    ))}


                </div >
            </div>
            <AddCandidateModal modalHandler={addCandidate} updateCandidates={updateCandidates} change={updateAddProps} electionid={electionId} />
            <EditCandidateModal modalHandler={editCandidate} updateCandidates={updateCandidates} change={updateEditProps} electionid={electionId} />
        </div>

    )
}

export default ViewCandidates;










