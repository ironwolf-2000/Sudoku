export interface IGameButtonRowProps {
    /** The optional CSS class name for styling */
    className?: string;
    /** The number of different values */
    count?: number;
    /** Indicates if the component is clickable */
    clickable?: boolean;
    /** A function to handle the value setting */
    onSetValue: (val: number) => void;
}
