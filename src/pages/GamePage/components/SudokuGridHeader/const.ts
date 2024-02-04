export enum ModalType {
    QUIT = 'QUIT',
    RESTART = 'RESTART',
    TIME_OVER = 'TIME_OVER',
}

export const MODAL_DATA = [
    {
        modalType: ModalType.QUIT,
        applyButtonLabel: 'Quit',
        title: 'Quit the game?',
        text: 'You will lose the progress in the current game.',
    },
    {
        modalType: ModalType.RESTART,
        applyButtonLabel: 'Restart',
        title: 'Restart the game?',
        text: 'You will start the same sudoku board from the beginning.',
    },
    {
        modalType: ModalType.TIME_OVER,
        applyButtonLabel: 'Understood',
        title: 'Time is over',
        text: 'Uh-oh! The clock has run out on this Sudoku challenge. The game will now be restarted.',
    },
] as const;

export const GAME_TIMEOUT = 7200;
