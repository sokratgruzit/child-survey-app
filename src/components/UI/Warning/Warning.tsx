import styles from "./Warning.module.css";

const Warning = () => {
    return (
        <div className={styles.container}>
            <img src="/images/warning.webp" alt="warning" className={styles.warningIcon} />
            <span className={styles.warningText}>Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более 5 Мб</span>
        </div>
    )
};

export default Warning;