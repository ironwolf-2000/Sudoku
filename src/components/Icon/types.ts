export interface IIconProps {
    className?: string;
    src: string;
    label: string;
    size?: 's' | 'm' | 'l';
    disabled?: boolean;
    title?: string;
    badge?: string;
    withCaption?: boolean;
    onHover?: () => void;
    onHoverEnd?: () => void;
    onClick?: () => void;
}
