export enum GameStatus {
    SUCCESS,
    FAILURE,
    PENDING,
}

export enum Level {
    EASY,
    MEDIUM,
    HARD,
    INSANE,
}

export const levelToClues = {
    [Level.EASY]: 60,
    [Level.MEDIUM]: 45,
    [Level.HARD]: 30,
    [Level.INSANE]: 28,
};
