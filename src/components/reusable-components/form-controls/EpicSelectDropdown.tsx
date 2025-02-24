import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";


interface EpicSelectDropdownProps<T> {
    label: string;
    name: string;
    list: T[]; // ✅ Generic list for reusability,
    register: UseFormRegister<any>;
    validation: object;
    placeholder: string;
    errors: FieldError;
    valueKey: keyof T;
    displayKey: keyof T;
}


const EpicSelectDropdown = <T,>({
    label,name,list,register,validation,placeholder,errors,valueKey,displayKey
}: EpicSelectDropdownProps<T>) => {

    return(
        <label className="flex flex-col">
            <span className='text-white font-medium mb-4'>{label}</span>
            <select id={name} {...register(name, validation)} className="bg-tertiary text-white px-4 py-2 text-ellipsis" >
                <option value="" className="px-6">{placeholder}</option>
                {list.map((option, index) => (
                <option key={index} value={JSON.stringify(option[valueKey])}>
                    {option[displayKey] as string}
                </option>
                ))}
            </select>
            {errors && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>}
        </label>
    )
}

export default EpicSelectDropdown;