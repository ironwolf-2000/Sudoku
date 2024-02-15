import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';

import cross from '@/assets/icons/cross.svg';
import { setWithOverlay } from '@/features/appSettings';
import { Icon } from '@/components/Icon';
import { IModalProps } from './types';
import styles from './Modal.module.scss';

export const Modal: React.FC<IModalProps> = ({ children, title, visible, applyButtonLabel, onApply, onClose }) => {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(visible);
    const [animationClassName, setAnimationClassName] = useState<string | undefined>();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose?.();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        if (visible) {
            setAnimationClassName(styles.show);
            dispatch(setWithOverlay(true));
            setModalVisible(true);
        } else {
            setAnimationClassName(styles.hide);
            setTimeout(() => setModalVisible(false), 200);
        }

        return () => {
            dispatch(setWithOverlay(false));
        };
    }, [dispatch, visible]);

    return (
        <div className={classnames(styles.Modal, !modalVisible && styles.hidden, animationClassName)}>
            <div className={classnames(styles.Content, animationClassName)}>
                <Icon className={styles.CrossIcon} src={cross} label="cross icon" size="s" onClick={onClose} />
                <header className={styles.Title}>{title}</header>
                <div className={styles.Body}>{children}</div>
                <footer className={classnames(styles.Footer, !onClose && styles.withOneElement)}>
                    {onClose && (
                        <button className={styles.Button} onClick={onClose}>
                            Cancel
                        </button>
                    )}
                    <button className={styles.Button} onClick={onApply}>
                        {applyButtonLabel}
                    </button>
                </footer>
            </div>
        </div>
    );
};
