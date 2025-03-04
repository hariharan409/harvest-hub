import moment from "moment";
import { useCropRecords, usePagination } from "../../custom-hooks"
import {Pagination,EpicButton} from "../index";


export const CropRecordsTable = () => {
    const {cropRecordsList,onNavigate,onDeleteCropRecords} = useCropRecords();
    // pagination logic via custom hook
    const {currentItems,pageCount,offset,handlePageChange} = usePagination(cropRecordsList);

    return(
        <div className="relative overflow-x-auto shadow-md max-h-[70%]">
            <table className="w-full bg-black-200 text-base text-center">
                <thead className= "text-lg uppercase">
                    <tr className="border-y">
                        <th scope="col" className="px-6 py-5 border-x">
                            s no
                        </th>
                        <th scope="col" className="px-6 py-5 border-x">
                            crop name
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
                        currentItems.map((cropRecord,index) => (
                            <tr key={cropRecord._id} className="capitalize border-y text-[#915EFF]">
                                <td className="px-6 py-4 border-x">
                                    {offset + index + 1}
                                </td>
                                <td className="px-6 py-4 border-x">
                                    {cropRecord.cropID?.cropName}
                                </td>
                                <td className="px-6 py-4 border-x">
                                    {moment(cropRecord.plantingDate).format("DD-MMM-YYYY")}
                                </td>
                                <td className="px-6 py-4 border-x">
                                    {cropRecord.workDetails?.length}
                                </td>
                                <td className="px-6 py-4 border-x flex justify-center gap-x-4">
                                    <EpicButton label="edit" onClick={() => onNavigate("/crop-records/add-crop-records",cropRecord._id)} varient="greenVarient" />
                                    <EpicButton label="delete" onClick={() => onDeleteCropRecords(cropRecord._id)} varient="redVarient" />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* using reusable Pagination component */}
            <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
    )
}