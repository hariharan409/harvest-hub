import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCropByID, saveCropFormData, setCropFormData, setLoadingFlags } from "../../store/slices/cropSlice";
import {EpicImageUpload, EpicTextInput,EpicButton} from "../index";

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

    return(
        <div className="bg-black-200 p-8 rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex flex-col gap-8 capitalize">
                {/* crop name field */}
                <EpicTextInput label="crop name" name="cropName" register={register} validation={{required: "crop name is required"}} placeholder="what's the crop name?" errors={errors.cropName} />
                {/* crop type field */}
                <EpicTextInput label="crop type" name="cropType" register={register} validation={{required: "crop type is required"}} placeholder="what's the crop type?" errors={errors.cropType} />
                {/* crop image field */}
                <EpicImageUpload label="upload image" name="cropImage" register={register} setValue={setValue} validation={{required: "crop image is required"}} errors={errors.cropImage} />
                {/* image preview */}
                <img src={watch("cropImage")} className="w-72 object-contain"/>
                {/* save button */}
                <div className="flex justify-end">
                    <EpicButton type="submit" label={loadingFlags.isSaving ? "saving..." : "save crop"} disabled={loadingFlags.isSaving} varient="greenVarient" customClassNames="w-36"/>
                </div>
            </form>
        </div>
    )
}

export default AddCrop;