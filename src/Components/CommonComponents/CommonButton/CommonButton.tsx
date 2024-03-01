import React from 'react';
import "./CommonButton.scss";
import { CommonButtonProps } from "../../interfaces/index";


const CommonButton: React.FC<CommonButtonProps> = ({ onClick, children, className,type }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    );
};

export default CommonButton;
