import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCropById } from "../../store/slices/cropSlice";
import { EpicButton } from "../global/button/Button";


export const CropTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cropList = useSelector((state) => state.crop.cropList);

    const onNavigate = (path,id) => {
        navigate(path+`/${id}`)
    }
    
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
                            crop type
                        </th>
                        <th scope="col" className="px-6 py-5 border-x">
                            action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cropList.map((crop,index) => (
                            <tr key={crop.id} className="capitalize border-y text-[#915EFF]">
                                <td className="px-6 py-4 border-x">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 border-x">
                                    {crop.cropName}
                                </td>
                                <td className="px-6 py-4 border-x">
                                    {crop.cropType}
                                </td>
                                <td className="px-6 py-4 border-x flex justify-center gap-x-4">
                                    <EpicButton label="edit" onClick={() => onNavigate("/add-crop",crop.id)} varient="greenVarient" />
                                    <EpicButton label="delete" onClick={() => dispatch(deleteCropById(crop.id))} varient="redVarient" />
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}