import { GameStatus } from '../../const';

export interface IDigitButtonsProps {
    className?: string;
    gameStatus: GameStatus;
    count: number;
    onSetValue: (val: number) => void;
}
