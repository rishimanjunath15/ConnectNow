import React from 'react';
import "../App.css"
import mobileImg from '../Assets/mobile.png'; // adjust path if needed
import { Link } from 'react-router-dom';
function LandingPage() {
    return ( <div className='landingPageContainer'>
         <nav>
        <div className='navHeader'>
          
            <h2>LoopTalk</h2>
             </div>
           

            <div className='navList'>
                <p>Join  as Guest</p>
                <p>Register</p>
                <div role='button'>
                    <p>Login</p>
                </div>
            </div>
       
         </nav>

         <div className='landingMianContainer'>
            <div>
                <h1><span style={{color:"#FF9830"}}>Connect</span> with your Loved Ones</h1>
           
           <p>Cover Distance by LoopTalk</p>
           <div role='button'>
            <Link to={"/home"} style={{textDecoration:"none" ,color:"white"}} >Get Started</Link>
           </div>
            </div>
            <div>
                <img src={mobileImg} alt="Mobile UI" />

            </div>
            <div></div>
         </div>

    </div> );
}

export default LandingPage;