import React from 'react';
import { useState } from 'react';
import AdminNavbar from '../component/navbar/Admin-navbar';
import AdminSidebar from '../component/sidebar/Admin-sidebar';
import CreateElection from '../component/New-election/CreateElection';
// import ElectionResult from '../New-election/Election-result';

// create election component
function Election() {


    return (
        <div className='row jumbotron jumbotron-fluid' style={{ 'height': 'auto','backgroundColor':'#f2f3ff'}}>
            <div className="col-2 col-md-1  bg-secondary">
                <AdminSidebar />
            </div>
            <div className="col-10 col-md-11">
                <div className="row nav__row">

                    <AdminNavbar />
                </div>
                {/* <ElectionResult/> */}

                <CreateElection/>
            </div>

        </div>
    )
}

export default Election
