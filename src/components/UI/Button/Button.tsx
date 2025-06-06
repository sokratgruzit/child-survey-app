import React from 'react';

import styles from './Button.module.css';

interface UIButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  textColor?: string;
  iconColor?: string;
  className?: string;
}

const Button: React.FC<UIButtonProps> = ({
  text,
  onClick,
  disabled = false,
  backgroundColor = 'var(--blue-primary)',
  icon,
  iconRight,
  textColor = '#fff',
  iconColor = '#fff',
  className = 'primary',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[className]}`}
      style={{
        backgroundColor: disabled ? "var(--overlay-dark-10)" : backgroundColor,
        color: disabled ? "var(--overlay-dark-50)" : textColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {iconRight && (
        <span className={styles.buttonIcon} style={{ color: iconColor }}>
          {iconRight}
        </span>
      )}
      <span className={styles.buttonText}>{text}</span>
      {icon && (
        <span className={styles.buttonIcon} style={{ color: iconColor }}>
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
