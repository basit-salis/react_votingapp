import React, { useState,useEffect } from 'react'
import { Alert } from 'react-bootstrap'

const Prompt = ({ err, removeErr }) => {
    const [show, setShow] = useState(false);
    const [animation, setAnimation] = useState(100)

 

// const animate = ()=>{
//     let setTimer = setInterval(() => {
//         console.log('removed',animation)
//         if(animation === 0){
//               removeErr()
//             console.log("cleared")
//             clearInterval(setTimer)
//         }
//         setAnimation(animation - 50)
          
            
//     }, 1000);

// }
//     animate()
//     console.log('check')
setTimeout(() => {
    removeErr()
    
}, 4000);

    return (
        <div className='' style={{
            position: "absolute",
            width: "200px",
            height: "60px",
            top: 30,
            right: 0,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            transition: "2s ease-out",
            backgroundColor: `rgb(183, 51, 51,0.4)`,
            transform: `translateX(-20px)`
 
        }}>
         
            {err}

        </div>


    );
}

export default Prompt

