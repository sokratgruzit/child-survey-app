import { showPopup, setLoading } from "../../../store/stepSlice";
import { setAllUploaded, setStatus } from "../../../store/uploadSlice";
import { useDispatch } from 'react-redux';

import Button from "../Button/Button";

import styles from "./Error.module.css";

interface PopUp {
  title: string;
  description: string;
}

const Error: React.FC<PopUp> = ({ title = "", description = "" }) => {
    const dispatch = useDispatch();

    const handleBack = () => {
        dispatch(showPopup({
            show: false,
            title: "",
            description: ""
        }));

        dispatch(setAllUploaded(false));
        dispatch(setStatus(""));
        dispatch(setLoading(false));
    };

    return (
        <div className={styles.container}>
            <span className={styles.title}>{title}</span>
            <span className={styles.descr}>{description}</span>
            <Button
                text="Вернуться назад"
                onClick={handleBack}
                backgroundColor="var(--blue-lighter)"
                textColor="var(--blue-primary)"
                iconRight={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 7L10 12L15 17" stroke="var(--blue-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>}
                iconColor="white"
                disabled={false}
                className="secondary"
            />
        </div>
    )
};

export default Error;