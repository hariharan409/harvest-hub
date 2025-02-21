import React from "react";
import { buttonVariants } from "../../styles/buttonStyles";

// define an interface for the props
interface EpicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;                          // label must be a string
    onClick: () => void;                    // onClick must be a function that returns void
    varient: keyof typeof buttonVariants;   // varient must be a valid key from buttonVariants
    customClassNames?: string;              // optional prop for custom class names
}
// use the interface in below component
export const EpicButton: React.FC<EpicButtonProps> = ({label,onClick,varient,customClassNames,...otherProps}) => {

    return(
        <button type="button" onClick={onClick} className={`${buttonVariants[varient]} ${customClassNames}`} {...otherProps}>
            {label}
        </button>
    )
}