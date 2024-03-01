export interface CommonModalProps {
    modalText?:  React.ReactNode;
    children: React.ReactNode;
    onClose?: () => void;
    show?:boolean;
}