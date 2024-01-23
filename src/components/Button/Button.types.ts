export interface IButtonProps {
    className?: string;
    children?: React.ReactNode;
    size?: 's' | 'm' | 'l';
    onClick?: () => void;
}
