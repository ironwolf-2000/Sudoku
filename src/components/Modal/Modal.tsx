import { useEffect } from 'react';
import classnames from 'classnames';

import { IModalProps } from './types';
import styles from './Modal.module.scss';

export const Modal: React.FC<IModalProps> = ({ children, title, visible, applyButtonLabel, onApply, onClose }) => {
    useEffect(() => {
        if (visible) {
            document.body.classList.add('no-scroll');
        }

        return () => document.body.classList.remove('no-scroll');
    }, [visible]);

    return (
        <div className={classnames(styles.Modal, !visible && styles.hidden)}>
            <div className={styles.Content}>
                {title && <header className={styles.Title}>{title}</header>}
                <div className={styles.Body}>{children}</div>
                <footer className={styles.Footer}>
                    <button className={styles.Button} onClick={onClose}>
                        Cancel
                    </button>
                    {applyButtonLabel && onApply && (
                        <button className={styles.Button} onClick={onApply}>
                            {applyButtonLabel}
                        </button>
                    )}
                </footer>
            </div>
        </div>
    );
};
