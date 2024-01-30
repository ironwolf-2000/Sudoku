interface ICell {
    val: number;
    clue?: boolean;
}

export type Board = ICell[][];

export type RawBoard = ICell['val'][][];

export type Coordinate = [number, number];
