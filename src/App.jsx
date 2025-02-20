import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { AddCrop, CropTable, Dashboard, NavBar, PageNotFound } from "./components";
import { styles } from "./styles";

export const App = () => {
    
    return(
        <div>
            <Router future={{v7_relativeSplatPath: true,v7_startTransition: true}}>
                <div className="relative z-0 bg-primary overflow-x-hidden">
                    <div className="w-full h-dvh bg-hero-pattern bg-cover bg-no-repeat bg-center">
                        <NavBar />
                        <div className={`${styles.paddingX} relative w-full h-[calc(100%-120px)] mx-auto pt-7 inset-0 top-[120px] max-w-7xl`}>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/crop-table" element={<CropTable />} />
                                <Route path="/add-crop" element={<AddCrop />} />
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    );
}