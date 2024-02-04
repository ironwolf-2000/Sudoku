import { useEffect, useState } from 'react';
import classnames from 'classnames';

import { IModalProps } from './types';
import styles from './Modal.module.scss';

export const Modal: React.FC<IModalProps> = ({ children, title, visible, applyButtonLabel, onApply, onClose }) => {
    const [modalVisible, setModalVisible] = useState(visible);
    const [animationClassName, setAnimationClassName] = useState<string | undefined>();

    useEffect(() => {
        if (visible) {
            document.body.classList.add('no-scroll');
            setAnimationClassName(styles.show);
            setModalVisible(true);
        }

        return () => document.body.classList.remove('no-scroll');
    }, [visible]);

    const onModalClose = (callback: () => void) => {
        setAnimationClassName(styles.hide);
        setTimeout(() => setModalVisible(false), 200);
        callback();
    };

    return (
        <div className={classnames(styles.Modal, !modalVisible && styles.hidden, animationClassName)}>
            <div className={classnames(styles.Content, animationClassName)}>
                <header className={styles.Title}>{title}</header>
                <div className={styles.Body}>{children}</div>
                <footer className={classnames(styles.Footer, !onClose && styles.withOneElement)}>
                    {onClose && (
                        <button className={styles.Button} onClick={() => onModalClose(onClose)}>
                            Cancel
                        </button>
                    )}
                    <button className={styles.Button} onClick={() => onModalClose(onApply)}>
                        {applyButtonLabel}
                    </button>
                </footer>
            </div>
        </div>
    );
};
