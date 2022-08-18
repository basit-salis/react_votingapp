import React from 'react';
import './Navbar.css'
import Results from './results.png';
import Dashboard from './dashboard1.png';
import Setting from './settings.png';
import VoteCategory from '../../views/Voting-page/Vote-category';

function Navbar() {
    return (
        <div>

            <VoteCategory/>

            <div className='bottom__navbar__container d-sm-flex d-md-none align-self-center justify-content-between align-items-center px-5' >
                <li>
                <img className='navbar__btn' src={Results}></img>
                </li>

                 <li>
                <img className='navbar__btn' src={Dashboard}></img>
                </li>

                 <li>
                <img className='navbar__btn' src={Setting}></img>
                </li>

                  
            </div>

        </div>
    )
}

export default Navbar


