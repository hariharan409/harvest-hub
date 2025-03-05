import { useNavigate } from "react-router-dom";
import {EpicButton} from "../index";
import { CropRecordsTable } from "./CropRecordsTable";
import { useCropRecords } from "../../custom-hooks";


const CropRecords = () => {
    const navigate = useNavigate();
    const {onStatusChange,statusType} = useCropRecords();

    const onNavigate = (path) => {
        navigate(path);
    }

    return(
        <div>
            {/* row 1 */}
            <div className="flex justify-between">
                <div class="inline-flex rounded-md shadow-xs mb-2" role="group">
                    <button type="button" onClick={() => onStatusChange("planted")}   className={`px-4 text-sm font-medium ${statusType === "planted" && "bg-tertiary"} rounded-l-2xl border-tertiary border-2`}>
                        Planted
                    </button>
                    <button type="button" onClick={() => onStatusChange("harvested")} className={`px-4 text-sm font-medium ${statusType === "harvested" && "bg-tertiary"} rounded-r-2xl border-tertiary border-2`}>
                        Harvested
                    </button>
                </div>
                <EpicButton label="add" onClick={() => onNavigate("/crop-records/add-crop-records")} varient="greenVarient" />
            </div>
            {/* row 2 */}
            <CropRecordsTable />
        </div>
    )
}

export default CropRecords;