export interface IIconProps {
    className?: string;
    src: string;
    label: string;
    withTitle?: boolean;
    onHover?: () => void;
    onHoverEnd?: () => void;
    onClick?: () => void;
}
