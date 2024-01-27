import { Button, Icon } from '@/components';
import { NumberButtons } from '..';
import classnames from 'classnames';
import { GameStatus } from '../../const';
import styles from './GameControls.module.scss';
import { IGameControlsProps } from './types';
import eraser from '@/assets/icons/eraser.svg';
import hint from '@/assets/icons/hint.svg';

export const GameControls: React.FC<IGameControlsProps> = ({
    gameStatus,
    onSelectValue,
    onShowHint,
    onErase,
    onTriggerCheckMode,
    onUpdateBoard,
    selectedCell,
    selectedValue,
}) => {
    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <Button className={styles.HeaderButton} onClick={onTriggerCheckMode}>
                    Check
                </Button>
                <Icon className={styles.HeaderButton} src={hint} onClick={onShowHint} label="hint" />
                <Icon className={styles.HeaderButton} src={eraser} onClick={onErase} label="eraser" />
            </div>
            <NumberButtons
                className={styles.NumberButtons}
                valueSetting={Boolean(selectedCell)}
                selectedValue={selectedValue}
                onSetValue={onUpdateBoard}
                onSelectValue={onSelectValue}
            />
            {gameStatus === GameStatus.SUCCESS && (
                <p className={classnames(styles.InfoLabel, styles.success)}>
                    You've successfully completed the puzzle!
                </p>
            )}
            {gameStatus === GameStatus.FAILURE && (
                <p className={classnames(styles.InfoLabel, styles.failure)}>You've made some mistakes!</p>
            )}
        </div>
    );
};
