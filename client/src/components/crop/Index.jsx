import { useNavigate } from "react-router-dom";
import { CropTable } from "./CropTable";
import {EpicButton} from "../index";

const Crop = () => {
    const navigate = useNavigate();
    
    const onNavigate = (path) => {
        navigate(path);
    }

    return(
        <div>
            <div className="flex justify-end">
                <EpicButton label="add crop" onClick={() => onNavigate("/crop/add-crop")} varient="greenVarient" customClassNames="w-36"/>
            </div>
            <CropTable />
        </div>
    )
}

export default Crop;