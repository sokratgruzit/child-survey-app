import React from 'react';

import styles from './Button.module.css';

interface UIButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  opacity?: number;
  icon?: React.ReactNode;
  textColor?: string;
  iconColor?: string;
  className?: string;
}

const Button: React.FC<UIButtonProps> = ({
  text,
  onClick,
  disabled = false,
  backgroundColor = 'var(--blue-primary)',
  opacity = 1,
  icon,
  textColor = '#fff',
  iconColor = '#fff',
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
      style={{
        backgroundColor,
        opacity: disabled ? 0.6 : opacity,
        color: textColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
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
