export interface IIconProps {
    className?: string;
    src: string;
    disabled?: boolean;
    title?: string;
    label?: string;
    badge?: string;
    withCaption?: boolean;
    captionVisible?: boolean;
    onHover?: () => void;
    onHoverEnd?: () => void;
    onClick?: () => void;
}
