import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/const';
import { Button } from '@/components/Button';
import styles from './MainPage.module.scss';
import { Stars } from '@/components';

export const MainPage: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(PATHS.GAME);
    };

    return (
        <div className={styles.MainPage}>
            <header>
                <h1 className={styles.Title}>Sudoku Game</h1>
            </header>
            <main className={styles.Content}>
                <section className={styles.Section}>
                    <h2 className={styles.SectionTitle}>Difficulty</h2>
                    <Stars interactive />
                </section>
            </main>
            <footer className={styles.Footer}>
                <Button className={styles.PlayButton} onClick={handleClick}>
                    Play
                </Button>
            </footer>
        </div>
    );
};
