export interface IIconProps {
    className?: string;
    src: string;
    size?: 's' | 'm' | 'l';
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
