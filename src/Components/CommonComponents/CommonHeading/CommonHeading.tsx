import React from 'react';
import "./CommonHeading.scss";
import { CommonHeadingProps } from "../../interfaces/index";


const CommonHeading: React.FC<CommonHeadingProps> = ({ children, className }) => {
    return (
        <h3 className={className}>
            {children}
        </h3>
    );
};

export default CommonHeading;
