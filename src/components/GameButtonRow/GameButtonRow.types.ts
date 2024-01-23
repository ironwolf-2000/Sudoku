export interface IGameButtonRowProps {
    className?: string;
    /** number of different values */
    count?: number;
    selectedValue?: number;
    onSelectValue: (val: number) => void;
}
