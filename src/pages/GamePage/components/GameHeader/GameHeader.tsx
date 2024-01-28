import { useNavigate } from 'react-router-dom';

import { Icon, Stars } from '@/components';
import { PATHS } from '@/app/const';
import home from '@/assets/icons/home.svg';
import restart from '@/assets/icons/restart.svg';
import styles from './GameHeader.module.scss';
import { IGameHeaderProps } from './types';

export const GameHeader: React.FC<IGameHeaderProps> = ({ onRestartGame }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.GameHeader}>
            <Icon src={home} withTitle onClick={() => navigate(PATHS.MAIN)} label="Go to main page" />
            <Icon src={restart} withTitle onClick={onRestartGame} label="Restart game" />
            <Stars />
        </div>
    );
};
