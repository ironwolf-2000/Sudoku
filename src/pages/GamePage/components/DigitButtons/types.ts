export interface IDigitButtonsProps {
    /** The optional CSS class name for styling */
    className?: string;
    /** The number of different values */
    count?: number;
    /** Indicates if the button is setting the value */
    valueSetting?: boolean;
    selectedValue?: number;
    /** A function to handle the value setting */
    onSetValue: (val: number) => void;
    /** A function to handle the value selection */
    onSelectValue: (val: number) => void;
}
