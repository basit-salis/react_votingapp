import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './CreateElection.css'
import AdminSidebar from '../sidebar/Admin-sidebar';
import AdminNavbar from '../navbar/Admin-navbar';
import { getResult } from '../apiCalls/apiCalls';


function ElectionResult() {
    const [data, setData] = useState([])
    const location = useLocation()
    const election = location.state.election
    const electionid = election.ElectionId
    const total_voters = election.totalVoters
    const election_name = election.ELECTION_NAME

    console.log('id',electionid,total_voters,election_name )
    useEffect(() => {
        async function fn() {
            let data = await getResult(electionid)
            console.log('d', data)
            setData(data)
        }
        fn()
    }, [])
    let already = [];

                       
    const  ePercent = (votes) =>{
        //static for now
        let total = total_voters
       let votePercent = (votes/total) * 100
       return votePercent

    }

    return (

        <div className='row jumbotron jumbotron-fluid' style={{ 'height': '100vh', 'backgroundColor': '#f2f3ff' }}>
            <div className="col-1 bg-secondary">
                <AdminSidebar />
            </div>
            <div className="col-11">
                <div className="row nav__row">
                    <AdminNavbar />
                </div>
                <div className='voting__result mt-3 px-3' style={{ 'width': '80%', 'margin': '0 auto' }}>
                    <div className="row my-3">
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center my-3">

                            <h3>{election_name}</h3>
                            <h5>{electionid}</h5>
                       

                        </div>
                        <div className="col-12">
                            <h6>Voting Results</h6>
                        </div>
                    </div>
                    {data && data.map(result => {

                        let selected_element = result.POSITION;
                        let filtered = data.filter(n => (n.POSITION === selected_element && !(already.includes(selected_element))))


                        already.push(selected_element)
                        if (filtered.length !== 0) {
                            return (
                                <div className='py-2 px-3 my-2' id="candidates" key={result.id}>
                                    <p>{result.POSITION}</p>

                                    {filtered.length !== 0 && filtered.map((result, i) => (
                                        <div className='row candidate d-flex my-2' key={result.id}>
                                            <div className="col-1 d-flex justify-content-center align-items-end">
                                                <p>{++i}</p>
                                            </div>

                                            <div className="col-10 d-flex flex-column">
                                                <div className="result__candidate__name d-flex justify-content-between">
                        
                                                    <span><p>{result.CANDIDATE_NAME} </p></span>  <span><p>{ ePercent(result.vote_count)}%</p></span>
                                                </div>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{ "width": `${ ePercent(result.vote_count)}%`, "height": "20px", "backgroundColor": "yellow", "color": "yellow" }} aria-valuenow={"100"} aria-valuemin={"0"} aria-valuemax={"100"}></div>
                                                </div>
                                            </div>

                                            <div className="col-1 d-flex justify-content-center align-items-center">
                                                <span><i className='mdi mdi-account-multiple'></i>{result.vote_count}</span>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )
                        }

                    })}

                </div>
            </div>

        </div>


    )
}

export default ElectionResult
