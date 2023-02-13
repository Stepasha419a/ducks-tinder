import classNames from 'classnames';
import { FC } from 'react';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from './Checkbox.types';

export const CheckboxInput: FC<CheckboxProps> = ({
  variant = 'full',
  text,
  extraClassName,
  children,
  ...props
}) => {
  const cn = classNames(styles.label, styles[variant], extraClassName);

  return (
    <label className={cn}>
      <input className={styles.input} type="checkbox" {...props} />
      {text}
      <div className={styles.icon} />
    </label>
  );
};
