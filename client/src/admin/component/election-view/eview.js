import React from 'react'
import './eview.css'


function eview({data}) {
    let total_election = data.length;
    let live = 0, pending = 0, ended = 0
    

    const d_data = data.length === 0 ? data : data.map(d => {
        const  Status  = Number(d.Status);
        switch (Status) {
            case 0:
                pending++
                break;

            case 1:
                live++
                break;

            case 2:
                ended++
                break;

            default:
                break;
        }
        return { live, pending, ended };

    })
  const e_data = d_data.length === 0 ? {live:0, pending:0, ended:0}: d_data.pop();


    return (
        <div className='row eview__row mt-4'>

            <div className="col-12">
                <h3 className='section__head'>Dashboard</h3>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="eview positions">
                    <span><i className="mdi mdi-ribbon"></i></span>
                    <span><b>{total_election}</b><p>Total Elections</p></span>
                </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="eview candidates">
                    <span><i className="mdi mdi-stop-circle-outline"></i></span>
                    <span><b>{e_data.ended}</b><p>Finished Election</p></span>
                </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="eview total__voters">
                    <span><i className="mdi mdi-timer-off"></i></span>
                    <span><b>{e_data.pending}</b><p>Pending</p></span>
                </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="eview vote__cast">
                    <span><i className="mdi mdi-timer-sand"></i></span>
                    <span><b>{e_data.live}</b><p>Live Election</p></span>
                </div>
            </div>

        </div>
    )
}

export default eview
