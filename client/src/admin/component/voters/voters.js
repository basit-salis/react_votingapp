import React from 'react';
import './voters.css';
import {DateTime} from 'luxon'

function Voters({ data }) {
    console.log(data)
    let dt = DateTime

    return (
        <div className='row voters__table__row p-0 border'>

            <div className="col-12 p-0">
                <div className='row voters__table__head'>
                    <div className="col-2 tdata">Event</div>
                    <div className="col-1 tdata">ID</div>
                    <div className="col-1 tdata"> voters</div>
                    <div className="col-2 tdata">vote cast</div>
                    <div className="col-2 tdata">start</div>
                    <div className="col-2 tdata">end </div>
                    <div className="col-2 tdata">Status</div>
                </div>
            </div>

            {data && data.map((dat) => (
                <div className="col-12 " key={dat.id} >
                    <div className="row voters__table">
                        <div className="col-2 tdata">{dat.ELECTION_NAME}</div>
                        <div className="col-1 tdata"> {dat.ElectionId}</div>
                        <div className="col-1 tdata"> {dat.totalVoters}</div>
                        <div className="col-2 tdata">{dat.voted}</div>
                        <div className="col-2 tdata">{dt.fromISO(`${dat.Start_time}`).toLocaleString(dt.DATETIME_FULL)}</div>
                        <div className="col-2 tdata">{dt.fromISO(`${dat.Stop_time}`).toLocaleString(dt.DATETIME_FULL)}</div>
                        <div className="col-2 tdata">
                            {dat.Status === 0 ?
                                <i className='mdi mdi-stop px-1'>pending</i> :
                                dat.Status === 1 ?
                                    <i className='mdi mdi-cached px-1'>Running</i> :
                                    <i className='mdi mdi-timer-off px-1'>ended</i>}</div>
                    </div>
                </div>
            ))}

        </div >
    )
}

export default Voters
