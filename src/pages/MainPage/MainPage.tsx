import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { BOARD_SIZES, SUDOKU_TYPES, sudokuTypeToLabel } from '@/app/const';
import styles from './MainPage.module.scss';
import { Icon, Slider, Stars } from '@/components';
import check from '@/assets/icons/check.svg';
import hint from '@/assets/icons/hint.svg';
import notes from '@/assets/icons/notes.svg';
import notesOutline from '@/assets/icons/notes_outline.svg';
import { RootState } from '@/app';
import {
    incrementInitialCheckCount,
    incrementInitialHintCount,
    setBoardSize,
    setSudokuType,
    toggleInitialWithNotes,
} from '@/features/gameSettings';
import { ISliderProps } from '@/components/Slider/types';
import { PlayButton } from './components';

export const MainPage: React.FC = () => {
    const dispatch = useDispatch();
    const { initialCheckCount, initialHintCount, initialWithNotes, sudokuType, boardSize } = useSelector(
        (state: RootState) => state.gameSettings
    );

    const sudokuTypes: ISliderProps['items'] = useMemo(() => {
        return SUDOKU_TYPES.map(type => ({
            label: sudokuTypeToLabel[type],
            onItemClick: () => dispatch(setSudokuType(type)),
        }));
    }, [dispatch]);

    const boardSizes: ISliderProps['items'] = useMemo(() => {
        return BOARD_SIZES.map(size => ({
            label: `${size}×${size}`,
            onItemClick: () => dispatch(setBoardSize(size)),
        }));
    }, [dispatch]);

    const helpIcons = useMemo(
        () => [
            {
                src: check,
                badge: String(initialCheckCount),
                label: 'checks',
                onClick: () => dispatch(incrementInitialCheckCount()),
            },
            {
                src: hint,
                badge: String(initialHintCount),
                label: 'hints',
                onClick: () => dispatch(incrementInitialHintCount()),
            },
            {
                src: initialWithNotes ? notes : notesOutline,
                badge: String(initialWithNotes ? 'on' : 'off'),
                label: 'notes',
                onClick: () => dispatch(toggleInitialWithNotes()),
            },
        ],
        [dispatch, initialCheckCount, initialHintCount, initialWithNotes]
    );

    return (
        <div className={styles.MainPage}>
            <h1 className={styles.Title}>Sudoku Game</h1>
            <main className={styles.Body}>
                <section className={styles.Section}>
                    <h2 className={styles.SectionTitle}>Game Type</h2>
                    <Slider items={sudokuTypes} selectedIndex={SUDOKU_TYPES.indexOf(sudokuType)} />
                </section>
                <section className={styles.Section}>
                    <h2 className={styles.SectionTitle}>Board Size</h2>
                    <Slider
                        items={boardSizes}
                        sliderItemClass={styles.BoardSizeItem}
                        selectedIndex={BOARD_SIZES.indexOf(boardSize)}
                    />
                </section>
                <section className={classnames(styles.Section, styles.horizontal)}>
                    <h2 className={styles.SectionTitle}>Help:</h2>
                    <div className={classnames(styles.SectionContent, styles.HelpContent)}>
                        {helpIcons.map(props => (
                            <Icon key={props.label} withCaption captionVisible {...props} />
                        ))}
                    </div>
                </section>
                <section className={classnames(styles.Section, styles.horizontal)}>
                    <h2 className={styles.SectionTitle}>Difficulty:</h2>
                    <div className={styles.SectionContent}>
                        <Stars interactive />
                    </div>
                </section>
                <PlayButton />
            </main>
        </div>
    );
};
