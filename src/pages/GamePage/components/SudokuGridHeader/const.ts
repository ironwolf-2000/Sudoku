export enum ModalType {
    QUIT = 'QUIT',
    RESTART = 'RESTART',
    TIME_OVER = 'TIME_OVER',
    GAME_COMPLETED = 'GAME_COMPLETED',
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
        text: 'Restarting will set you back to the beginning of the same Sudoku board.',
        applyButtonLabel: 'Restart',
        withCloseButton: true,
    },
    {
        modalType: ModalType.TIME_OVER,
        title: 'Time is over!',
        text: 'Uh-oh! The clock has run out on this Sudoku challenge. The game will now be restarted.',
        applyButtonLabel: 'Understood',
        withCloseButton: false,
    },
    {
        modalType: ModalType.GAME_COMPLETED,
        title: 'Game completed!',
        text: 'Congratulations! You successfully completed this Sudoku challenge.',
        applyButtonLabel: 'Home page',
        withCloseButton: false,
    },
] as const;

export const GAME_TIMEOUT = 7200;

export const GAME_COMPLETED_MODAL_DELAY = 1500;
