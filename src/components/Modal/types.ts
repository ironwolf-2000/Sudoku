export interface IModalProps {
    children?: React.ReactNode;
    title?: string;
    visible?: boolean;
    onApply?: () => void;
    onClose: () => void;
    applyButtonLabel?: string;
}
