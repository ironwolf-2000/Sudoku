export interface IModalProps {
    children?: React.ReactNode;
    visible?: boolean;
    title: string;
    applyButtonLabel: string;
    onApply: () => void;
    onClose?: () => void;
}
