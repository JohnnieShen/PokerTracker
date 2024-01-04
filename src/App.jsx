import NavBar from "./components/navbar";
import Calculator from "./components/calculator";
import About from "./components/about"
import './App.css'
import { Router, Route, HashRouter, Routes} from "react-router-dom";

function App() {
    return (
        <HashRouter>
            <NavBar/>
            <Routes>
                <Route path="/about" element={<About/>} />
                <Route path="/home" element={<Calculator/>} />
            </Routes>
        </HashRouter>
    )
}
export default App
