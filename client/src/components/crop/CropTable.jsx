import { EpicButton, Pagination } from "../index";
import { useCrop, usePagination } from "../../custom-hooks";

export const CropTable = () => {
    const { cropList, onNavigate, onDeleteCrop } = useCrop();
    // pagination logic via custom hook
    const {currentItems,pageCount,offset,handlePageChange} = usePagination(cropList);

    return (
        <div className="relative overflow-x-auto shadow-md">
            <table className="w-full bg-black-200 text-base text-center">
                <thead className="text-lg uppercase">
                    <tr className="border-y">
                        <th className="px-6 py-5 border-x">s no</th>
                        <th className="px-6 py-5 border-x">crop name</th>
                        <th className="px-6 py-5 border-x">crop type</th>
                        <th className="px-6 py-5 border-x">action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((crop, index) => (
                        <tr key={crop._id} className="capitalize border-y text-[#915EFF]">
                            <td className="px-6 py-4 border-x">{offset + index + 1}</td>
                            <td className="px-6 py-4 border-x">{crop.cropName}</td>
                            <td className="px-6 py-4 border-x">{crop.cropType}</td>
                            <td className="px-6 py-4 border-x flex justify-center gap-x-4">
                                <EpicButton label="edit" onClick={() => onNavigate("/crop/add-crop", crop._id)} varient="greenVarient" />
                                <EpicButton label="delete" onClick={() => onDeleteCrop(crop._id)} varient="redVarient" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* using reusable Pagination component */}
            <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
    );
};
