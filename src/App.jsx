import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { Dashboard, NavBar } from "./components";

export const App = () => {
    
    return(
        <div>
            <Router>
                <div className="relative z-0 bg-primary overflow-x-hidden">
                    <div className="w-full h-dvh bg-hero-pattern bg-cover bg-no-repeat bg-center">
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
}