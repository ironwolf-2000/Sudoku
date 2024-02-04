import { useDispatch } from 'react-redux';

import play from '@/assets/icons/play.svg';
import { Icon } from '@/components';
import { toggleGamePaused } from '@/features/gameControls';
import styles from './PauseOverlay.module.scss';

export const PauseOverlay = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.PauseOverlay}>
            <Icon src={play} size="l" label="play icon" onClick={() => dispatch(toggleGamePaused())} />
        </div>
    );
};
