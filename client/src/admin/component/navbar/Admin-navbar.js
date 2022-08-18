import React from 'react'
import NewElection from '../create-election/EditElection';
import './Admin-navbar.css'
import Man from './man1.png';
import Nort from './notification.png'

function AdminNavbar() {
    return (
        <div className='navbar d-flex justify-content-between align-items-center px-4 border'>
            <div className="nav__left d-flex">

                <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control bg-transparent search" placeholder="Search" />
                </div>

            </div>

            <div className="nav__right d-flex justify-content-between align-items-center">
                <span><i className='mdi mdi-chart-bubble px-3'></i></span>
                <span><i className='mdi mdi-account profile mx-1'></i></span>
                <span>salis abdul basit <i className='mdi mdi-arrow-down-drop-circle'></i></span>
            </div>
        </div>
    )
}

export default AdminNavbar;
