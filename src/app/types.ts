interface ICell {
    val: number;
    notes: number[];
    clue?: boolean;
    bad?: boolean;
}

export type Board = ICell[][];

export type RawBoard = ICell['val'][][];

export type Coordinate = [number, number];
