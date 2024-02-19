import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { RootState } from '@/app';
import { IDigitButtonsProps } from './types';
import styles from './DigitButtons.module.scss';
import { getInclusiveRange } from '@/algorithms/helpers';
import { GameStatus } from '../../const';

export const DigitButtons: React.FC<IDigitButtonsProps> = ({ className, count, gameStatus, onSetValue }) => {
    const { gamePaused } = useSelector((state: RootState) => state.gameHeader);
    const disabled = gamePaused || gameStatus === GameStatus.SUCCESS;

    return (
        <div className={classnames(styles.DigitButtons, styles[`count_${count}`], className)}>
            {getInclusiveRange(1, count).map(val => (
                <button
                    key={val}
                    className={classnames(styles.Button, disabled && styles.disabled, styles[`count_${count}`])}
                    disabled={disabled}
                    onClick={() => onSetValue(val)}
                >
                    {val}
                </button>
            ))}
        </div>
    );
};
