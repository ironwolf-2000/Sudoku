import { GameStatus } from '../../const';

export interface IDigitButtonsProps {
    /** The optional CSS class name for styling */
    className?: string;
    gameStatus: GameStatus;
    /** The number of different values */
    count: number;
    /** A function to handle the value setting */
    onSetValue: (val: number) => void;
}
