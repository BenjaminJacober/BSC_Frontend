import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navigation from "./navbar/Navigation.tsx";
import {Outlet} from "react-router-dom";

function App() {
    return <>
        <Navigation/>
        <Outlet/>
    </>
}

export default App
