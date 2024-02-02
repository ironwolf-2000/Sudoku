import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { PATHS, SudokuType } from '@/app/const';
import styles from './MainPage.module.scss';
import { Card, Icon, Stars } from '@/components';
import doubleCheck from '@/assets/icons/double_check.svg';
import hint from '@/assets/icons/hint.svg';
import { RootState } from '@/app';
import { incrementInitialCheckCount, incrementInitialHintCount, setSudokuType } from '@/features/gameSettings';

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { initialCheckCount, initialHintCount, sudokuType } = useSelector((state: RootState) => state.gameSettings);

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
                    <section className={styles.Section}>
                        <h2 className={styles.SectionTitle}>Extras:</h2>
                        <div className={styles.ExtrasContent}>
                            <Icon
                                src={doubleCheck}
                                badge={String(initialCheckCount)}
                                title="Tap to increase"
                                label="check"
                                onClick={() => dispatch(incrementInitialCheckCount())}
                            />
                            <Icon
                                src={hint}
                                badge={String(initialHintCount)}
                                title="Tap to increase"
                                label="hint"
                                onClick={() => dispatch(incrementInitialHintCount())}
                            />
                        </div>
                    </section>
                    <section className={styles.Section}>
                        <h2 className={styles.SectionTitle}>Type:</h2>
                        <div className={styles.TypeContent}>
                            <button
                                className={classnames(
                                    styles.TypeButton,
                                    sudokuType === SudokuType.CLASSIC && styles.selected
                                )}
                                onClick={() => dispatch(setSudokuType(SudokuType.CLASSIC))}
                            >
                                Classic
                            </button>
                            <button
                                className={classnames(
                                    styles.TypeButton,
                                    sudokuType === SudokuType.DIAGONALS && styles.selected
                                )}
                                onClick={() => dispatch(setSudokuType(SudokuType.DIAGONALS))}
                            >
                                Diagonals
                            </button>
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
