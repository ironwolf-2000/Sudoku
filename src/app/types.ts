import { SudokuType } from './const';

interface ICell {
    val: number;
    notes: number[];
    clue?: boolean;
}

export type Grid = ICell[][];

export type RawGrid = ICell['val'][][];

export type Coordinate = [number, number];

export type ClueCount = Record<SudokuType, Record<number, number>>;
