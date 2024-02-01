import classnames from 'classnames';

import { ICardProps } from './types';
import styles from './Card.module.scss';

export const Card: React.FC<ICardProps> = ({ children, className }) => {
    return <div className={classnames(styles.Card, className)}>{children}</div>;
};
