import { Button } from '@/components';
import { NumberButtons } from '..';
import classnames from 'classnames';
import { GameStatus } from '../../GamePage.const';
import { IGameControlsProps } from './GameControls.types';
import styles from './GameControls.module.scss';

export const GameControls: React.FC<IGameControlsProps> = ({
    onTriggerCheckMode,
    onShowHint,
    emptyCells,
    selectedCell,
    selectedValue,
    onUpdateBoard,
    onSelectValue,
    gameStatus,
}) => {
    return (
        <div className={styles.Container}>
            <div className={styles.Menu}>
                <Button onClick={onTriggerCheckMode}>Check</Button>
                <Button onClick={onShowHint} disabled={emptyCells.length === 0}>
                    Hint
                </Button>
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
