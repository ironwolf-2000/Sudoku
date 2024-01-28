export interface IIconProps {
    className?: string;
    src: string;
    disabled?: boolean;
    label: string;
    badge?: string;
    withTitle?: boolean;
    withCaption?: boolean;
    captionVisible?: boolean;
    onHover?: () => void;
    onHoverEnd?: () => void;
    onClick?: () => void;
}
