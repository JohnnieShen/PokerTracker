import NavBar from "./components/navbar";
import Calculator from "./components/calculator";
import About from "./components/about"
import './App.css'
import { Router, Route, BrowserRouter, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/about" element={<About/>} />
                <Route exact path="/home" element={<Calculator/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
