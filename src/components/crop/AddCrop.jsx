import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {EpicImageUpload, EpicTextInput,EpicButton} from "../index";
import {useCrop} from "../../custom-hooks/index";

const AddCrop = () => {
    const {id} = useParams();
    const { register, handleSubmit, setValue, watch, errors, loadingFlags, onSubmit } = useCrop(id);

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