import React from 'react';
import '../App.css'
const NavBar = () => {
    return (
        <div className="navbar">
            <a className='about' href="/#/">Back</a>
            <a className='title' href="/#/home">Poker Tracker</a>
            <a className='about' href="/#/about">About</a>
        </div>
    );
}
export default NavBar