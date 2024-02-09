import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { PATHS, SudokuType } from '@/app/const';
import styles from './MainPage.module.scss';
import { Card, Icon, Stars } from '@/components';
import check from '@/assets/icons/check.svg';
import hint from '@/assets/icons/hint.svg';
import pencil from '@/assets/icons/pencil.svg';
import { RootState } from '@/app';
import {
    incrementInitialCheckCount,
    incrementInitialHintCount,
    setBoardSize,
    setSudokuType,
    toggleInitialWithNotes,
} from '@/features/gameSettings';

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { initialCheckCount, initialHintCount, initialWithNotes, sudokuType, boardSize } = useSelector(
        (state: RootState) => state.gameSettings
    );

    const extrasIcons = [
        {
            src: check,
            badge: String(initialCheckCount),
            label: 'checks',
            onClick: () => dispatch(incrementInitialCheckCount()),
        },
        {
            src: hint,
            badge: String(initialHintCount),
            label: 'hints',
            onClick: () => dispatch(incrementInitialHintCount()),
        },
        {
            src: pencil,
            badge: String(initialWithNotes ? 'on' : 'off'),
            label: 'notes',
            onClick: () => dispatch(toggleInitialWithNotes()),
        },
    ];

    const sudokuTypes = [
        { type: SudokuType.CLASSIC, label: 'Classic' },
        { type: SudokuType.DIAGONALS, label: 'Diagonals' },
        { type: SudokuType.EVEN_ODD, label: 'Even-Odd' },
    ] as const;

    const boardSizes = [4, 6, 8, 9];

    return (
        <Card className={styles.MainPage}>
            <div>
                <h1 className={styles.Title}>Sudoku Game</h1>
                <main className={styles.Body}>
                    <section className={styles.Section}>
                        <h2 className={styles.SectionTitle}>Difficulty:</h2>
                        <div className={styles.SectionContent}>
                            <Stars interactive />
                        </div>
                    </section>
                    <section className={styles.Section}>
                        <h2 className={styles.SectionTitle}>Extras:</h2>
                        <div className={classnames(styles.SectionContent, styles.ExtrasContent)}>
                            {extrasIcons.map(props => (
                                <Icon key={props.label} title="Tap to change" withCaption captionVisible {...props} />
                            ))}
                        </div>
                    </section>
                    <section className={styles.Section}>
                        <h2 className={styles.SectionTitle}>Type:</h2>
                        <div className={classnames(styles.SectionContent, styles.TypeContent)}>
                            {sudokuTypes.map(({ type, label }) => (
                                <button
                                    key={type}
                                    className={classnames(styles.TypeButton, sudokuType === type && styles.selected)}
                                    onClick={() => dispatch(setSudokuType(SudokuType[type]))}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </section>
                    <section className={styles.Section}>
                        <h2 className={styles.SectionTitle}>Size:</h2>
                        <div className={classnames(styles.SectionContent, styles.SizeContent)}>
                            {boardSizes.map(size => (
                                <button
                                    key={size}
                                    className={classnames(styles.SizeButton, boardSize === size && styles.selected)}
                                    onClick={() => dispatch(setBoardSize(size))}
                                >
                                    {size}x{size}
                                </button>
                            ))}
                        </div>
                    </section>
                </main>
                <footer className={styles.Footer}>
                    <button className={styles.PlayButton} onClick={() => navigate(PATHS.GAME)}>
                        New Game
                    </button>
                </footer>
            </div>
        </Card>
    );
};
