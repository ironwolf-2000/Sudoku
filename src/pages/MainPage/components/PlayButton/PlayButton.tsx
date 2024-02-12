import { useNavigate } from 'react-router-dom';

import styles from './PlayButton.module.scss';
import arrowRight from '@/assets/icons/arrow_right.svg';
import { useLayoutType } from '@/app/hooks';
import { LayoutType, PATHS } from '@/app/const';
import { Icon } from '@/components';

export const PlayButton: React.FC = () => {
    const navigate = useNavigate();
    const layoutType = useLayoutType();

    return (
        <button className={styles.PlayButton} onClick={() => navigate(PATHS.GAME, { replace: true })}>
            <span className={styles.PlayButtonText}>Play</span>
            {layoutType === LayoutType.DESKTOP && <Icon src={arrowRight} size="s" label="arrow right" />}
        </button>
    );
};
