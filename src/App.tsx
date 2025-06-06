import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store/index.ts';
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { setReportStatus, setStatus } from './store/uploadSlice.ts';

import UploadStep from './components/features/UploadStep';
import SurveyStep from './components/features/SurveyStep';
import ReportPage from './components/features/ReportPage';
import FloatingImage from './components/UI/FloatingImage/FloatingImage';
import Status from './components/UI/Status/Status.tsx';

import styles from "./App.module.css";
import Title from './components/UI/Title/Title';
import Steps from './components/UI/Steps/Steps';

interface StatusProps {
  layoutColor: string;
  textColor: string;
  text: string;
  display: boolean;
}

function App() {
  const titles = [
    "Контур моего дитяти!",
    "Загрузите фотографии рисунков",
    "Общая информация о ребенке",
    "**Психологический отчёт о ребёнке 8 лет**"
  ];

  const dispatch = useDispatch();

  const step = useSelector((state: RootState) => state.step.value);
  const reportStatus = useSelector((state: RootState) => state.upload.reportStatus);

  const [title, setTitle] = useState<string>(titles[0]);
  const [statusData, setStatusData] = useState<StatusProps>({
    layoutColor: "",
    textColor: "",
    text: "",
    display: false
  });

  const progressPercent = useMemo(() => {
    setTitle(titles[step]);

    return (step / 3) * 100;
  }, [step]);

  useEffect(() => {
    if (reportStatus === "в обработке") {
      setStatusData({
        layoutColor: "rgba(199, 228, 252, .7)",
        textColor: "var(--blue-primary)",
        text: "Анализ в процессе...",
        display: true
      });
    }

    if (reportStatus === "ошибка") {
      setStatusData({
        layoutColor: "rgb(250, 222, 224, .7)",
        textColor: "var(--red)",
        text: "Что-то пошло не так!",
        display: true
      });

      let timeout = setTimeout(() => {
        setStatusData({
          layoutColor: "",
          textColor: "",
          text: "",
          display: false
        });

        dispatch(setReportStatus(""));
        dispatch(setStatus(""));
        clearTimeout(timeout);
      }, 5000);
    }

    if (reportStatus === "успех") {
      setStatusData({
        layoutColor: "rgba(199, 228, 252, .7)",
        textColor: "var(--purple)",
        text: "Отличненько!",
        display: true
      });

      let timeout = setTimeout(() => {
        setStatusData({
          layoutColor: "",
          textColor: "",
          text: "",
          display: false
        });

        dispatch(setReportStatus(""));
        dispatch(setStatus(""));
        clearTimeout(timeout);
      }, 5000);
    }
  }, [reportStatus]);

  return (
    <>
      {statusData.display && <Status textColor={statusData.textColor} text={statusData.text} layoutColor={statusData.layoutColor} />}
      <FloatingImage src="/images/render.webp" floatAmplitude={1.2} size={200} anchor={{ x: -40, y: -40 }} />
      <FloatingImage src="/images/star.webp" floatAmplitude={.5} size={200} anchor={{ x: -20, y: -30 }} />
      <FloatingImage src="/images/sun.webp" floatAmplitude={1.7} size={200} anchor={{ x: 10, y: -40 }} />
      <FloatingImage src="/images/cloud.webp" floatAmplitude={2.5} size={200} anchor={{ x: 40, y: -40 }} />
      <FloatingImage src="/images/sun.webp" floatAmplitude={1.2} size={200} anchor={{ x: -40, y: 40 }} />
      <FloatingImage src="/images/cloud.webp" floatAmplitude={.5} size={200} anchor={{ x: -20, y: 30 }} />
      <FloatingImage src="/images/render.webp" floatAmplitude={1.7} size={200} anchor={{ x: 10, y: 40 }} />
      <FloatingImage src="/images/star.webp" floatAmplitude={2.5} size={200} anchor={{ x: 40, y: 40 }} />
      <div className={styles.mainWrapper}>
        {step > 0 && <div className={styles.progressContainer}>
          <motion.div
            className={styles.progress}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>}
        <div className={styles.appContainer}>
          <Title justify={step === 0 ? "center" : "start"} text={title} warning={step === 1} />
          {step === 1 && <UploadStep />}
          {step === 2 && <SurveyStep />}
          {step === 3 && <ReportPage />}
          <Steps />
        </div>
      </div>
    </>
  );
}

export default App;
