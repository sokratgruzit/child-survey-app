import Warning from "../Warning/Warning";

import styles from "./Title.module.css";

type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right';

interface TitleProps {
    text: string;
    warning?: boolean;
    justify?: TextAlign;
}

const Title: React.FC<TitleProps> = ({ text, warning, justify = "start" }) => {
    return (
        <div style={{ justifyContent: justify }} className={styles.container}>
            <h2 style={{ textAlign: justify }}>{text}</h2>
            {warning && <Warning />}
        </div>
    )
};

export default Title;