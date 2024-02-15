interface ICell {
    val: number;
    notes: number[];
    clue?: boolean;
}

export type Grid = ICell[][];

export type RawGrid = ICell['val'][][];

export type Coordinate = [number, number];
