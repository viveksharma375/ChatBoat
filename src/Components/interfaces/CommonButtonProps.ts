export interface CommonButtonProps {
    onClick?: () => void;
    children ?: React.ReactNode;
    className ?: string;
    type?: "button" | "submit";
}