import React from "react";
import { FieldError, UseFormRegister, UseFormWatch } from "react-hook-form";

interface EpicRadioButtonProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
    validation: object;
    placeholder: string;
    errors: FieldError;
    customClassNames?: string; // optional prop for custom class names

}

const EpicRadioButton: React.FC<EpicRadioButtonProps> = ({label,name,register,watch,errors,customClassNames,...otherProps}) => {

    return(
        <label className="flex flex-col">
            <span className='text-white font-medium mb-4'>{label}</span>
            <div className="flex justify-center items-center gap-6 h-full">
                {/* will make this values planted & harvested into dynamic on future */}
                {/* yes radio button */}
                <label className="flex gap-2 items-center">
                    <span className='text-white font-medium'>yes</span>
                    <input 
                        type="radio"
                        value="harvested"
                        {...register(name)}
                        className={`w-7 h-7 bg-tertiary text-white rounded-lg outline-none border-none font-medium ${customClassNames}`}
                        {...otherProps}
                    />
                </label>
                {/* no radio button */}
                <label className="flex gap-2 items-center">
                    <span className='text-white font-medium'>no</span>
                    <input 
                        type="radio"
                        value="planted"
                        {...register(name)}
                        className={`w-7 h-7 bg-tertiary text-white rounded-lg outline-none border-none font-medium ${customClassNames}`}
                        {...otherProps}
                    />
                </label>
            </div>
            {errors && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>}
        </label>
    )
}

export default EpicRadioButton;