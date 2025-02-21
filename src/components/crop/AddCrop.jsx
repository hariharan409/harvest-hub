import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCropByID, saveCropFormData, setCropFormData, setLoadingFlags } from "../../store/slices/cropSlice";
import { EpicButton } from "../global/button/Button";

const AddCrop = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cropFormData = useSelector((state) => state.crop?.cropForm);
    const loadingFlags = useSelector((state) => state.crop?.loadingFlags);
    const {register,handleSubmit,setValue,watch,formState: {errors}} = useForm({
        // set initial values from redux store
        defaultValues: cropFormData 
    });

    // synchronize form values with Redux when Redux state changes
    useEffect(() => {
        try {
            // if id available - user is editing the form
            if(id) {
                dispatch(getCropByID(id));
                // dynamically set form values using Object.entries()
                Object.entries(cropFormData).forEach(([key,value]) => {
                    setValue(key,value);
                })
            } else {
                // dynamically set form values using Object.entries()
                Object.entries(cropFormData).forEach(([key,value]) => {
                    setValue(key,value);
                })
            }
        } catch (error) {
            console.error("Error while synchronizing form values:", error.message || error);
        }
    },[cropFormData,setValue]);

    // If you still need to reset cropFormData on unmount
    useEffect(() => {
        return () => {
            dispatch(setCropFormData({})); 
        };
    }, [dispatch]); 

    const onSubmit = (data) => {
        try {
            dispatch(setLoadingFlags({key: "isSaving",value: true}));
            dispatch(saveCropFormData(data));
            // after saving, go back to the previous page
            navigate(-1);
        } catch (error) {
            console.log(error.message || error);
        }
    }

    const onImageChange = async(event) => {
        try {
            const file = event.target.files?.[0];
            if(file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const BASE64_STRING = reader.result;
                    // Store Base64 in React Hook Form
                    setValue("cropImage",BASE64_STRING);
                }
            }
        } catch (error) {
            console.log(error.message || error);
        }
    }

    return(
        <div className="bg-black-200 p-8 rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex flex-col gap-8 capitalize">
                {/* crop name field */}
                <label className="flex flex-col">
                    <span className='text-white font-medium mb-4'>crop name</span>
                    <input 
                        id="cropName"
                        {...register("cropName",{required: "crop name is required"})}
                        placeholder="what's the crop name?"
                        className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                    {errors.cropName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.cropName.message}</p>}
                </label>
                {/* crop type field */}
                <label className="flex flex-col">
                    <span className='text-white font-medium mb-4'>crop type</span>
                    <input 
                        id="cropType"
                        {...register("cropType",{required: "crop type is required"})}
                        placeholder="what's the crop type?"
                        className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                    {errors.cropType && <p className="text-red-500 text-xs mt-1 ml-1">{errors.cropType.message}</p>}
                </label>
                {/* crop image field */}
                <label className="flex flex-col">
                    <span className='text-white font-medium mb-4'>upload image</span>
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => onImageChange(e)}
                        className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                    {/* Hidden field to store Base64 */}
                    <input type="hidden" {...register("cropImage", { required: "crop image is required" })} />
                    {errors.cropImage && <p className="text-red-500 text-xs mt-1 ml-1">{errors.cropImage.message}</p>}
                </label>
                <img src={watch("cropImage")} className="w-72 object-contain"/>
                <div className="flex justify-end">
                    <EpicButton type="submit" label={loadingFlags.isSaving ? "saving..." : "save crop"} disabled={loadingFlags.isSaving} varient="greenVarient" customClassNames="w-36"/>
                </div>
            </form>
        </div>
    )
}

export default AddCrop;