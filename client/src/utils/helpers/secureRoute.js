import React from 'react'
import {useLocation,Navigate,Outlet} from 'react-router-dom'

const SecureRoute = ()=> {
      const location = useLocation();

    // check if token exist
    const hasJWT = ()=>{
        let tokenExist = false
        localStorage.getItem("token") ? tokenExist=true : tokenExist=false;
        return tokenExist
    }
    
  return (
    hasJWT() ? <Outlet/> : <Navigate to="/" state={{from: location}} replace/>

  )
}

export default SecureRoute


// export const SecureRoute = ()=> {

//     // check if token exist
//     const hasJWT = ()=>{
//         let tokenExist = false
//         localStorage.getItem("token") ? tokenExist=true : tokenExist=false;
//         return tokenExist
//     }
//     console.log('from',hasJWT())
//     return hasJWT()
    
// }

