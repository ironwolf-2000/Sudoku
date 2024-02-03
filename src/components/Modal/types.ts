export interface IModalProps {
    children?: React.ReactNode;
    visible?: boolean;
    title: string;
    onApply: () => void;
    onClose: () => void;
    applyButtonLabel: string;
}
