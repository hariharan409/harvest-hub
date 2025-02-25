import { useParams } from "react-router-dom";
import { useCrop, useCropRecords } from "../../custom-hooks";
import {EpicButton, EpicDatepicker, EpicSelectDropdown, EpicTextInput} from "../index";
import {MinusCircleIcon} from "@heroicons/react/20/solid";


const AddCropRecords = () => {
    const {id} = useParams();
    const {cropList} = useCrop();
    const {register, handleSubmit, setValue, watch, errors,loadingFlags, onSubmit, onAddWork,onRemoveWork,onAddExpense,onRemoveExpense,cropRecordsFormData} = useCropRecords(id);

    return(
        <div className="bg-black-200 p-8 rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex flex-col gap-8 capitalize">
                {/* row-1 crop records*/}
                <div className="flex gap-8">
                    <div className="w-48">
                        <EpicSelectDropdown label="select crop" name="cropID" list={cropList} valueKey="id" displayKey="cropName" register={register} validation={{required: "crop name is required"}} placeholder="what's the crop name?" errors={errors.cropID} />
                    </div>
                    <EpicDatepicker label="planting-date" name="plantingDate" register={register} setValue={setValue} watch={watch} validation={{required: "planting date is required"}} placeholder="pick the planting date" errors={errors.plantingDate}  />
                </div>
                {/* add work details button */}
                <div className="flex justify-end">
                    <EpicButton label="add work" onClick={() => onAddWork()} varient="greenVarient" customClassNames="w-48" />
                </div>
                <div className="flex flex-col gap-5">
                    {
                        cropRecordsFormData.workDetails?.map((work,workIndex) => {
                            return(
                                <div key={workIndex} className="border-4 border-purple-950 rounded-lg">
                                    <div key={workIndex} className="flex flex-wrap items-end gap-5 p-3 bg-purple-950">
                                        <span className="text-lg self-center hidden lg:block">{workIndex + 1}).</span>
                                        {/* work type field */}
                                        <EpicTextInput label="work type" name={`workDetails[${workIndex}].workType`} register={register} validation={{required: `work type is required for row - ${workIndex + 1}`}} placeholder="what's the work type?" errors={(errors?.workDetails && errors?.workDetails[workIndex]) && errors?.workDetails[workIndex]?.workType}/>
                                        {/* work description field */}
                                        <EpicTextInput label="work description" name={`workDetails[${workIndex}].workDescription`} register={register} validation={{required: `work description is required for row - ${workIndex + 1}`}} placeholder="what's the work description?" errors={(errors?.workDetails && errors?.workDetails[workIndex]) && errors?.workDetails[workIndex]?.workDescription} />
                                        {/* work date picker */}
                                        <EpicDatepicker label="work-date" name={`workDetails[${workIndex}].workDate`} register={register} setValue={setValue} watch={watch} validation={{required: `work date is required for row - ${workIndex + 1}`}} placeholder="pick the work date" errors={(errors?.workDetails && errors?.workDetails[workIndex]) && errors?.workDetails[workIndex]?.workDate}  />
                                        <MinusCircleIcon className="w-8 h-8 self-center cursor-pointer text-yellow-500 hover:text-red-500" onClick={() => onRemoveWork(workIndex)} />
                                        <div className="flex-1 flex justify-center">
                                            <EpicButton label="add expense" onClick={() => onAddExpense(workIndex)} varient="greenVarient" customClassNames="w-48" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-5">
                                    {
                                        work.expenseList?.map((expense,expenseIndex) => {
                                            return(
                                                <div key={expenseIndex} className="flex flex-wrap items-end gap-5 p-3 border-t-2 border-purple-950">
                                                    <span className="text-sm self-center hidden lg:block">{expenseIndex + 1}).</span>
                                                    {/* expense type field */}
                                                    <EpicTextInput label="expense type" name={`workDetails[${workIndex}].expenseList[${expenseIndex}].expenseType`} register={register} validation={{required: `expense type is required for row - ${expenseIndex + 1}`}} placeholder="what's the expense type?" errors={(errors?.workDetails && errors?.workDetails[workIndex]?.expenseList[expenseIndex]) && errors?.workDetails[workIndex]?.expenseList[expenseIndex]?.expenseType}/>
                                                    {/* expense amount field */}
                                                    <EpicTextInput label="expense amount" name={`workDetails[${workIndex}].expenseList[${expenseIndex}].expenseAmount`} register={register} validation={{required: `expense amount is required for row - ${expenseIndex + 1}`}} placeholder="what's the expense amount?" errors={(errors?.workDetails && errors?.workDetails[workIndex]?.expenseList[expenseIndex]) && errors?.workDetails[workIndex]?.expenseList[expenseIndex]?.expenseAmount}/>
                                                    {/* expense date picker */}
                                                    <EpicDatepicker label="expense-date" name={`workDetails[${workIndex}].expenseList[${expenseIndex}].expenseDate`} register={register} setValue={setValue} watch={watch} validation={{required: `expense date is required for row - ${workIndex + 1}`}} placeholder="pick the expense date" errors={(errors?.workDetails && errors?.workDetails[workIndex]?.expenseList[expenseIndex]) && errors?.workDetails[workIndex]?.expenseList[expenseIndex]?.expenseDate}  />
                                                    {/* expense description field */}
                                                    <EpicTextInput label="expense description" name={`workDetails[${workIndex}].expenseList[${expenseIndex}].expenseDescription`} register={register} validation={{required: `expense description is required for row - ${expenseIndex + 1}`}} placeholder="what's the expense description?" errors={(errors?.workDetails && errors?.workDetails[workIndex]?.expenseList[expenseIndex]) && errors?.workDetails[workIndex]?.expenseList[expenseIndex]?.expenseDescription}/>
                                                    <MinusCircleIcon className="w-8 h-8 self-center cursor-pointer text-yellow-500 hover:text-red-500" onClick={() => onRemoveExpense(workIndex,expenseIndex)} />
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        })
                    }
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