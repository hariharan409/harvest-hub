import { useNavigate } from "react-router-dom";
import {EpicButton} from "../index";
import { CropRecordsTable } from "./CropRecordsTable";


const CropRecords = () => {
    const navigate = useNavigate();

    const onNavigate = (path) => {
        navigate(path);
    }

    return(
        <div>
            <div className="flex justify-end">
                <EpicButton label="add" onClick={() => onNavigate("/crop-records/add-crop-records")} varient="greenVarient" />
            </div>
            <CropRecordsTable />
        </div>
    )
}

export default CropRecords;