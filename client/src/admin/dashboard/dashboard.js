import React,{ useState, useEffect } from 'react';
import AdminNavbar from '../component/navbar/Admin-navbar';
import AdminSidebar from '../component/sidebar/Admin-sidebar';
import Eview from '../component/election-view/eview';
import Voters from '../component/voters/voters';
import Axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import '../../assets/css/customCss.css'

// first page on admin dashboard
function Dashboard() {

    const [data, setData] = useState(null)
    useEffect(() => {
        Axios.get('http://localhost:3001/admin/admin-dashboard')
            .then(response => {
                const data = response.data
                console.log('elections', data)
                setData(data)
            })

    }, [])

    return (
        <div className='row jumbotron jumbotron-fluid' style={{ 'height': '100vh' }}>
            <div className="col-2 col-md-1 bg-secondary">
                <AdminSidebar />
            </div>
            <div className="col-10 col-md-11 dashboard">
                <div className="row nav__row">
                    <AdminNavbar />
                </div>
                {data ? <Eview data={data} /> : <CircularProgress color="inherit"/>}

                {data &&  <Voters data={data} />}
            </div>

        </div>
    )
}

export default Dashboard


