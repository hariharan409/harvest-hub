
import React, { useState } from "react";
import { FieldError, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import DatePicker from "react-datepicker";

interface EpicDatepickerProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    watch: UseFormWatch<any>;
    validation: object;
    placeholder: string;
    errors: FieldError;
}

const EpicDatepicker: React.FC<EpicDatepickerProps> = ({label,name,register,setValue,watch,validation,placeholder,errors}) => {

     // Handle Datepicker change
     const onDateChange = (value: any) => {
        setValue(name, value); // Update the form state with the new date value
    };

    return(
        <label className="flex flex-col">
            <span className='text-white font-medium mb-4'>{label}</span>
            <DatePicker
                {...register(name,validation)}
                selected={watch(name)}
                onChange={onDateChange}
                className="bg-tertiary"
            />
            {errors && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>}
        </label>
    )
}

export default EpicDatepicker;