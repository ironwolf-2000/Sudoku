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
    setSudokuType,
    toggleInitialWithNotes,
} from '@/features/gameSettings';

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { initialCheckCount, initialHintCount, initialWithNotes, sudokuType } = useSelector(
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
    ] as const;

    return (
        <Card className={styles.MainPage}>
            <div>
                <header>
                    <h1 className={styles.PageTitle}>Sudoku Game</h1>
                </header>
                <main className={styles.Body}>
                    <section className={styles.Section}>
                        <h2 className={styles.SectionTitle}>Difficulty:</h2>
                        <div>
                            <Stars interactive />
                        </div>
                    </section>
                    <section className={classnames(styles.Section, styles.ExtrasSection)}>
                        <h2 className={styles.SectionTitle}>Extras:</h2>
                        <div className={styles.ExtrasContent}>
                            {extrasIcons.map(props => (
                                <Icon key={props.label} title="Tap to change" withCaption {...props} />
                            ))}
                        </div>
                    </section>
                    <section className={styles.Section}>
                        <h2 className={styles.SectionTitle}>Type:</h2>
                        <div className={styles.TypeContent}>
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
