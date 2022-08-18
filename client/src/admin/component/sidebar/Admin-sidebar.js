import React from 'react'
import { Link } from 'react-router-dom';
// import { Routes,Route } from "react-router-dom";
import './Admin-sidebar.css'
import Voting from "../voting1.png"



function AdminSidebar(props) {

    return (
        <div className='sidebar__container d-flex flex-column justify-content-start align-items-center tet-white h-100'>
            <img src={Voting} className="logo my-4" alt="logo" />
            <div className="sidebar py-2">
                <ul className='list-unstyled d-flex flex-column justify-content-center align-items-center'>
                    <Link to='/admin-home'><li ><span><i className="mdi mdi-blur"></i></span></li></Link>
                    <Link to='/add'><li><span><i className="mdi mdi-comment-plus-outline"></i></span></li></Link>
                    <Link to='/editElection'><li><span><i className="mdi mdi-scale-balance"></i></span></li></Link>

                </ul>
            </div>
        </div>
    )
}

export default AdminSidebar;
