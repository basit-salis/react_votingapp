import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// history
import { history } from '../utils/helpers/history'
// import pages
import Dashboard from '../admin/dashboard/dashboard';
import EditElection from '../admin/component/create-election/EditElection';
import ViewVoters from '../admin/component/create-election/viewVoters';
import ViewCandidates from '../admin/component/create-election/Edit';
import Election from '../admin/dashboard/Election';
import ElectionResult from '../admin/component/New-election/Election-result';
import Login from '../views/Login/Login';
import VoteCategory from '../views/Voting-page/Vote-category';
import AfterVote from '../views/AfterVoted/AfterVote';
import SecureRoute from '../utils/helpers/secureRoute';
import Layout from './Layout';
import Home from '../views/Home/Home';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route exact path='/' element={<Home />} />
          <Route exact path='login' element={<Login />} />

          {/* private routes user */}
          <Route path='/' element={<SecureRoute />}>
            <Route path="voting-page" element={<VoteCategory />} />
            <Route exact path='/voting-page/voting-result' element={<AfterVote />} />
          </Route>


          {/* private routes admin */}
          <Route path='admin-home' element={<Dashboard />} />
          <Route path='editElection' element={<EditElection />} />
          <Route path='editElection/view-candidates' element={<ViewCandidates />} />
          <Route path='editElection/view-voters' element={<ViewVoters />} />
          <Route exact path='editElection/result' element={<ElectionResult />} />
          <Route path='add' element={<Election />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default Routers;