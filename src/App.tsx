import { useState } from 'react';
import UploadStep from './components/features/UploadStep';
import SurveyStep from './components/features/SurveyStep';
import ReportPage from './components/features/ReportPage';

import styles from "./App.module.css";

function App() {
  const [step, setStep] = useState(1);

  return (
    <div className={styles.appContainer}>
      {step === 1 && <UploadStep onNext={() => setStep(2)} />}
      {step === 2 && <SurveyStep onNext={() => setStep(3)} />}
      {step === 3 && <ReportPage />}
    </div>
  );
}

export default App;
