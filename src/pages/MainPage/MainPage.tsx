import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/App.const';
import { Button } from '@/components/Button';
import styles from './MainPage.module.scss';

export const MainPage: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(PATHS.GAME);
    };

    return (
        <main className={styles.Container}>
            <Button size="l" onClick={handleClick}>
                Play
            </Button>
        </main>
    );
};
