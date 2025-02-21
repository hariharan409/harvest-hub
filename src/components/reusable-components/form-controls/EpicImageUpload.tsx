import React from "react";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface EpicImageUploadProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    validation: object;
    errors: FieldError;

}

const EpicImageUpload: React.FC<EpicImageUploadProps> = ({label,name,register,setValue,validation,errors}) => {

    const onImageChange = async(event) => {
        try {
            const file = event.target.files?.[0];
            if(file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const BASE64_STRING = reader.result;
                    // Store Base64 in React Hook Form
                    setValue(name,BASE64_STRING);
                }
            }
        } catch (error) {
            console.log(error.message || error);
        }
    }


    return(
        <label className="flex flex-col">
            <span className='text-white font-medium mb-4'>{label}</span>
            <input 
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            {/* Hidden field to store Base64 */}
            <input type="hidden" {...register(name,validation)} />
            {errors && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>}
        </label>
    )
}

export default EpicImageUpload;