export enum ModalType {
    QUIT = 'QUIT',
    RESTART = 'RESTART',
    TIME_OVER = 'TIME_OVER',
}

export const MODAL_DATA = [
    {
        modalType: ModalType.QUIT,
        title: 'Quit the game?',
        text: 'This action will result in the loss of your current game progress.',
        applyButtonLabel: 'Quit',
        withCloseButton: true,
    },
    {
        modalType: ModalType.RESTART,
        title: 'Restart the game?',
        text: 'Restarting will set you back to the beginning of the same Sudoku grid.',
        applyButtonLabel: 'Restart',
        withCloseButton: true,
    },
    {
        modalType: ModalType.TIME_OVER,
        title: 'Time is over!',
        text: 'Uh-oh! The clock has run out on this Sudoku challenge. The game will now be restarted.',
        applyButtonLabel: 'Close',
        withCloseButton: false,
    },
] as const;

export const GAME_TIMEOUT = 7200;
