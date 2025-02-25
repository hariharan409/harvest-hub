import moment from "moment";
import { useCropRecords } from "../../custom-hooks"
import EpicButton from "../reusable-components/button/Button";


export const CropRecordsTable = () => {
    const {cropRecordsList,onNavigate,onDeleteCropRecords} = useCropRecords();

    return(
        <div className="relative overflow-x-auto shadow-md max-h-[70%]">
            <table className="w-full bg-black-200 text-base text-center">
                <thead className= "text-lg uppercase">
                    <tr className="border-y">
                        <th scope="col" className="px-6 py-5 border-x">
                            s no
                        </th>
                        <th scope="col" className="px-6 py-5 border-x">
                            crop ID
                        </th>
                        <th scope="col" className="px-6 py-5 border-x">
                            planting date
                        </th>
                        <th scope="col" className="px-6 py-5 border-x">
                            total works
                        </th>
                        <th scope="col" className="px-6 py-5 border-x">
                            action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cropRecordsList.map((cropRecord,index) => (
                            <tr key={cropRecord.id} className="capitalize border-y text-[#915EFF]">
                                <td className="px-6 py-4 border-x">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 border-x">
                                    {cropRecord.cropID}
                                </td>
                                <td className="px-6 py-4 border-x">
                                    {moment(cropRecord.plantingDate,"ddd MMM DD YYYY HH:mm:ss [GMT]ZZ").format("DD-MMM-YYYY")}
                                </td>
                                <td className="px-6 py-4 border-x">
                                    {cropRecord.workDetails?.length}
                                </td>
                                <td className="px-6 py-4 border-x flex justify-center gap-x-4">
                                    <EpicButton label="edit" onClick={() => onNavigate("/add-crop-records",cropRecord.id)} varient="greenVarient" />
                                    <EpicButton label="delete" onClick={() => onDeleteCropRecords(cropRecord.id)} varient="redVarient" />
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}