import './Css/Footer.css'
import React from 'react';

function Footer() {
    return (
    <>
    <div className='gogo'>
        <div className="gridfirst">
            <h2 className='more'>More.</h2>
            <ul className='clonus'>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Client login</a></li>
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Get started</a></li>
                <li><a href="../pages/Contact">Contact</a></li>
                <li><a href="#">Teams of servise</a></li>
            </ul>
        </div>

        <div className="gridsecond"></div>

        <div className="gridthird">
            <h2 className='gs'>Get Started.</h2>
            <p className='most'>
               The most convenient online organizer.
               Tasks, lists, diary, notes always at hand.
               Simple interface makes organization enjoyable.
            </p>
            <button className='buttonh'>
                Book a call
            </button>
        </div>
    </div>
       
    
    <div className="fonts">
        <link rel="preconnect" href="https://fonts.googleapis.com" /> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
    </div>
    </>
    ) 
}

export default Footer;