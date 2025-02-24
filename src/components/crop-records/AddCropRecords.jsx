import { useCrop, useCropRecords } from "../../custom-hooks";
import {EpicButton, EpicDatepicker, EpicSelectDropdown} from "../index";


const AddCropRecords = () => {
    const {cropList} = useCrop();
    const {register, handleSubmit, setValue, watch, errors,loadingFlags, onSubmit} = useCropRecords();


    return(
        <div className="bg-black-200 p-8 rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex flex-col gap-8 capitalize">
                <div className="flex gap-8">
                    <div className="w-48">
                        <EpicSelectDropdown label="select crop" name="cropID" list={cropList} valueKey="id" displayKey="cropName" register={register} validation={{required: "crop name is required"}} placeholder="what's the crop name?" errors={errors.cropID} />
                    </div>
                    <EpicDatepicker label="planting-date" name="plantingDate" register={register} setValue={setValue} watch={watch} validation={{required: "planting date is required"}} placeholder="select planting date" errors={errors.plantingDate}  />
                </div>
                {/* save button */}
                <div className="flex justify-end">
                    <EpicButton type="submit" label={loadingFlags.isSaving ? "saving..." : "save crop"} disabled={loadingFlags.isSaving} varient="greenVarient" customClassNames="w-36"/>
                </div>
            </form>
        </div>
    )
}

export default AddCropRecords;