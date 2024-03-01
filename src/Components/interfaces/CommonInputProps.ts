export interface CommonInputProps {
    type?: any;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?:(e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string; 
    id?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}