import React from 'react';
import '../App.css'
const NavBar = () => {
    return (
        <div className="navbar">
            <a className='about' href="/PokerTracker/#/home">Home</a>
            <a className='title' href="/PokerTracker/#/calculator">Poker Tracker</a>
            <a className='about' href="/PokerTracker/#/about">About</a>
        </div>
    );
}
export default NavBar