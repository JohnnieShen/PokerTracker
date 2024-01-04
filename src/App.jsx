import React from 'react';
import NavBar from "./components/navbar";
import Calculator from "./components/calculator";
import About from "./components/about";
import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from './components/home';

function App() {
    return (
        <HashRouter>
            <div>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/home" element={<Calculator />} />
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;