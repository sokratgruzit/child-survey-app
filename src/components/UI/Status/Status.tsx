import styles from "./Status.module.css";

interface StatusProps {
    text?: string;
    textColor?: string;
    layoutColor?: string;
}

const Status: React.FC<StatusProps> = ({ text = "", textColor = "", layoutColor = "" }) => {
    return (
        <div 
            className={styles.container}
            style={{
                background: layoutColor
            }}
        >
            <span style={{ color: textColor }}>{text}</span>
        </div>
    )
};

export default Status;