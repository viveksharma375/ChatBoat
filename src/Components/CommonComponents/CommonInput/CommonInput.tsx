import React from 'react';
import "./CommonInput.scss";
import { CommonInputProps } from "../../interfaces/index";

const CommonInput: React.FC<CommonInputProps> = ({ type, value, onChange,onKeyDown, placeholder, className ,id,onBlur}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            id={id}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        />
    );
};

export default CommonInput;
