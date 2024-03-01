import React from 'react';
import "./CommonLabel.scss";
import { CommonLabelProps }  from "../../interfaces/index";


const CommonLabel: React.FC<CommonLabelProps> = ({ htmlFor, children, className }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={className}
        >
            {children}
        </label>
    );
};

export default CommonLabel;
