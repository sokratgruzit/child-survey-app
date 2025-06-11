import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store/index.ts';
import { nextStep, setLoading, prevStep, showPopup } from '../../../store/stepSlice.ts';
import { setTaskId, setStatus, setReportStatus, setAllUploaded } from '../../../store/uploadSlice.ts';
import { useState, useEffect } from 'react';

import Button from "../Button/Button";

import { uploadFiles } from '../../../api/upload'; 
import { submitSurvey } from '../../../api/survey.ts';
import { getReportStatus } from '../../../api/report.ts';
import { useUpload } from '../../../contexts/UploadContext';
import { useSurvey } from '../../../contexts/SurveyContext';

import styles from "./Steps.module.css";

const Steps = () => {
    const step = useSelector((state: RootState) => state.step.value);
    const loading = useSelector((state: RootState) => state.step.loading);
    const allUploaded = useSelector((state: RootState) => state.upload.allUploaded);
    const taskId = useSelector((state: RootState) => state.upload.taskId);
    const surveyStatus = useSelector((state: RootState) => state.upload.status);
    const dispatch = useDispatch();

    const { files } = useUpload();
    const { allFilled, data: surveyData } = useSurvey();

    const buttonTexts = [
        "Начат тест",
        "Далее",
        "Узнать результаты",
        "Поделиться результатами"
    ];

    const backButtonTexts = [
        "К загрузке рисунков",
        "Скачать отчет PDF"
    ];

    const stepIcons = [
        null,
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L1 6M15 6L10 11M15 6L10 1" stroke={allUploaded && !loading ? "white" : "var(--overlay-dark-50)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 16L17.5 12L13.5 8M6.5 17L11.5 12L6.5 7" stroke={allFilled && !loading ? "white" : "var(--overlay-dark-50)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.15938 7.70723L5.07682 7.70723C4.12833 7.70723 3.35938 8.47619 3.35938 9.42467C3.35938 9.99395 3.64162 10.5267 4.11298 10.8464L9.8317 14.7219C11.1411 15.609 12.8586 15.609 14.168 14.7219L19.8848 10.8474C20.3571 10.5277 20.6394 9.99491 20.6394 9.42563C20.6394 8.47715 19.8704 7.70723 18.9219 7.70723H15.8394M3.35938 9.44003L3.35938 18.2672C3.35938 19.328 4.21858 20.1872 5.27937 20.1872L18.7194 20.1872C19.7802 20.1872 20.6394 19.328 20.6394 18.2672L20.6394 9.44003M3.89505 19.5987L9.19809 14.2957M14.7987 14.2947L20.1018 19.5978M11.9984 2.90723V9.57539M11.9984 2.90723L13.9184 4.82723M11.9984 2.90723L10.0784 4.82723" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    ];

    const backIcons = [
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 7L10 12L15 17" stroke="#293244" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0569 11.111L13.4994 14.6685M13.4994 14.6685L9.94194 11.111M13.4994 14.6685L13.4994 3.99707M21.5028 16.4461C21.5028 18.4109 19.91 20.0036 17.9453 20.0036H9.05358C7.08883 20.0036 5.49609 18.4109 5.49609 16.4461" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    ];

    const [disabled, setDisabled] = useState<boolean>(false);

    const handleStepBack = async () => {
        if (step === 2) {
            dispatch(prevStep());
            dispatch(setAllUploaded(false));
        }

        if (step === 3) {

        }
    };

    const handleStep = async () => {
        if (step === 0) {
            dispatch(nextStep());
        }

        if (step === 1 && allUploaded) {
            dispatch(setLoading(true));
            try {
                if (files.scene && files.animal && files.selfie) {
                    const response = await uploadFiles({
                        scene: files.scene,
                        animal: files.animal,
                        selfie: files.selfie,
                    });

                    dispatch(setTaskId(response.task_id));
                    dispatch(setStatus(response.status));
                    dispatch(nextStep());
                } else {
                    console.warn("Не все файлы загружены в контексте");
                }
            } catch (error) {
                console.error("Ошибка при загрузке файлов:", error);
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        
        if (step === 2 && allFilled) {
            if (!taskId) {
                console.error("Нет task_id — нельзя отправить опрос");
                return;
            }

            dispatch(setLoading(true));

            try {
                const response = await submitSurvey({ 
                    survey: { ...surveyData },
                    task_id: taskId
                });

                dispatch(setTaskId(response.task_id));
                dispatch(setStatus(response.message));
            } catch (error: any) {
                const errorMessage = error.message || 'Произошла ошибка при отправке опроса';
                const statusCode = error.status || 500;

                // Вызов кастомного popup
                dispatch(showPopup({
                    title: `Ошибка ${statusCode}`,
                    description: errorMessage,
                    show: true
                }));
            } 
        }
    };

    useEffect(() => {
        if (
            step === 0 ||
            (step === 1 && allUploaded && !loading) ||
            (step === 2 && allFilled && !loading) 
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [allUploaded, step, loading, allFilled]);

    useEffect(() => {
        if (surveyStatus !== "Опросник принят") return;
        if (!taskId) return;
        
        let intervalId: ReturnType<typeof setInterval>;

        const checkStatus = async () => {
            try {
                const response = await getReportStatus(taskId);
                console.log('Report status:', response);

                if (response.status !== "в обработке") {
                    clearInterval(intervalId);
                    dispatch(setLoading(false));
                } else {
                    dispatch(setReportStatus(response.status));
                }
            } catch (error) {
                console.error('Ошибка при получении статуса:', error);
            }
        };

        checkStatus();
        intervalId = setInterval(checkStatus, 10000); 

        return () => {
            clearInterval(intervalId); 
        };
    }, [surveyStatus, taskId]);

    return (
        <div className={styles.container}>
            <div className={styles.steps}>Шаг {step}/3</div>
            <div className={styles.btnsWrap}>
                {step > 1 && <Button
                    text={backButtonTexts[step - 2]}
                    onClick={handleStepBack}
                    backgroundColor="var(--blue-lighter)"
                    textColor={step === 2 ? "#293244" : "white"}
                    iconRight={step === 2 ? backIcons[0] : null}
                    icon={step === 3 ? backIcons[1] : null}
                    iconColor="white"
                    disabled={false}
                    className="secondary"
                />}
                <Button
                    text={buttonTexts[step]}
                    onClick={handleStep}
                    backgroundColor="var(--blue-primary)"
                    textColor="white"
                    icon={stepIcons[step]}
                    iconColor="white"
                    disabled={disabled}
                    className="primary"
                />
            </div>
        </div>
    );
};

export default Steps;
