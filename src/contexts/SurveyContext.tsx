import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Frequency = 'Очень редко' | 'Редко' | 'Иногда' | 'Часто' | 'Всегда';
type Gender = 'Мужской' | 'Женский';
type EmotionalState = 'Отличное' | 'Хорошее' | 'Удовлетворительное' | 'Неудовлетворительное' | 'Очень плохое';

export interface SurveyData {
  childName: string;
  childDOB: string;
  childGender: Gender;
  parentName: string;

  q1_1: Frequency;
  q1_2: Frequency;
  q1_3: Frequency;
  q1_4: Frequency;
  q1_5: Frequency;
  q1_6: Frequency;
  q1_7: Frequency;
  q1_8: Frequency;
  q1_9: Frequency;
  q1_10: Frequency;

  q2_1: Frequency;
  q2_2: Frequency;
  q2_3: Frequency;
  q2_4: Frequency;
  q2_5: Frequency;
  q2_6: Frequency;
  q2_7: Frequency;
  q2_8: Frequency;
  q2_9: Frequency;
  q2_10: Frequency;

  q3_1: Frequency;
  q3_2: Frequency;
  q3_3: Frequency;
  q3_4: Frequency;
  q3_5: Frequency;
  q3_6: Frequency;
  q3_7: Frequency;
  q3_8: Frequency;
  q3_9: Frequency;
  q3_10: Frequency;

  q4_1: Frequency;
  q4_2: Frequency;
  q4_3: Frequency;
  q4_4: Frequency;
  q4_5: Frequency;
  q4_6: Frequency;
  q4_7: Frequency;
  q4_8: Frequency;
  q4_9: Frequency;
  q4_10: Frequency;

  emotionalState: EmotionalState;
  specialistsHelp: string;

  childStrengths?: string;
  additionalDevelopmentInfo?: string;
  developmentConcerns?: string;
}

interface SurveyContextProps {
  data: SurveyData | null;
  setData: (data: SurveyData) => void;
  allFilled: boolean;
  setAllFilled: (filled: boolean) => void;
}

const SurveyContext = createContext<SurveyContextProps | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SurveyData | null>(null);
  const [allFilled, setAllFilled] = useState(false);

  return (
    <SurveyContext.Provider value={{ data, setData, allFilled, setAllFilled }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) throw new Error('useSurvey must be used within a SurveyProvider');
  return context;
};
