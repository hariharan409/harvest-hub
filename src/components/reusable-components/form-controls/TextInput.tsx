import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";


interface EpicTextInputProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    validation: object;
    placeholder: string;
    errors: FieldError;

}

const EpicTextInput: React.FC<EpicTextInputProps> = ({label,name,register,validation,placeholder,errors}) => {

    return(
        <label className="flex flex-col">
            <span className='text-white font-medium mb-4'>{label}</span>
            <input 
                id={name}
                {...register(name,validation)}
                placeholder={placeholder}
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            {errors && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>}
        </label>
    )
}

export default EpicTextInput;