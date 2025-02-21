import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { AddCrop, CropRecordsTable, CropTable, Dashboard, NavBar, PageNotFound, ToastListener } from "./components";
import { styles } from "./styles";
import { Toaster } from "react-hot-toast";

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
                                <Route path="/add-crop/:id" element={<AddCrop />} />
                                <Route path="/crop-records-table" element={<CropRecordsTable />} />
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
            {/* 
                <Toaster />:
                - This is the main component from 'react-hot-toast'.
                - It renders the toast notifications globally.
                - Should be placed at the root level of the app to ensure all toasts are visible.
            */}
            <Toaster />
            {/* 
                <ToastListener />:
                - A custom component that listens for Redux state changes related to toast messages.
                - It ensures that toasts are triggered based on global state updates.
                - Useful when toast messages need to be dispatched from Redux actions instead of directly in UI components.
            */}
            <ToastListener />
        </div>
    );
}