import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PATHS } from '@/app/const';
import { Button } from '@/components/Button';
import styles from './MainPage.module.scss';
import { Icon, Stars } from '@/components';
import doubleCheck from '@/assets/icons/double_check.svg';
import hint from '@/assets/icons/hint.svg';
import { RootState } from '@/app';
import { incrementInitialCheckCount, incrementInitialHintCount } from '@/features/gameSettings';

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { initialCheckCount, initialHintCount } = useSelector((state: RootState) => state.gameSettings);

    return (
        <div className={styles.MainPage}>
            <header>
                <h1 className={styles.Title}>Sudoku Game</h1>
            </header>
            <main className={styles.Content}>
                <section className={styles.Section}>
                    <h2 className={styles.SectionTitle}>Difficulty:</h2>
                    <Stars interactive />
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
            </main>
            <footer className={styles.Footer}>
                <Button className={styles.PlayButton} onClick={() => navigate(PATHS.GAME)}>
                    Play
                </Button>
            </footer>
        </div>
    );
};
