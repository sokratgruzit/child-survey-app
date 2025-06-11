import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSurvey } from '../../contexts/SurveyContext';

import styles from './Features.module.css';

registerLocale('ru', ru);

const frequencyOptions = ['Очень редко', 'Редко', 'Иногда', 'Часто', 'Всегда'] as const;
const emotionalStateOptions = ['Отличное', 'Хорошее', 'Удовлетворительное', 'Неудовлетворительное', 'Очень плохое'] as const;

const schema = z.object({
  childName: z.string().min(1, 'Введите имя ребенка'),
  childDOB: z.coerce.date({
    required_error: 'Введите дату рождения',
    invalid_type_error: 'Неверный формат даты',
  }),
  childGender: z.enum(['Мужской', 'Женский']),
  parentName: z.string().min(1, 'Введите имя родителя'),
  q1_1: z.enum(frequencyOptions),
  q1_2: z.enum(frequencyOptions),
  q1_3: z.enum(frequencyOptions),
  q1_4: z.enum(frequencyOptions),
  q1_5: z.enum(frequencyOptions),
  q1_6: z.enum(frequencyOptions),
  q1_7: z.enum(frequencyOptions),
  q1_8: z.enum(frequencyOptions),
  q1_9: z.enum(frequencyOptions),
  q1_10: z.enum(frequencyOptions),
  q2_1: z.enum(frequencyOptions),
  q2_2: z.enum(frequencyOptions),
  q2_3: z.enum(frequencyOptions),
  q2_4: z.enum(frequencyOptions),
  q2_5: z.enum(frequencyOptions),
  q2_6: z.enum(frequencyOptions),
  q2_7: z.enum(frequencyOptions),
  q2_8: z.enum(frequencyOptions),
  q2_9: z.enum(frequencyOptions),
  q2_10: z.enum(frequencyOptions),
  q3_1: z.enum(frequencyOptions),
  q3_2: z.enum(frequencyOptions),
  q3_3: z.enum(frequencyOptions),
  q3_4: z.enum(frequencyOptions),
  q3_5: z.enum(frequencyOptions),
  q3_6: z.enum(frequencyOptions),
  q3_7: z.enum(frequencyOptions),
  q3_8: z.enum(frequencyOptions),
  q3_9: z.enum(frequencyOptions),
  q3_10: z.enum(frequencyOptions),
  q4_1: z.enum(frequencyOptions),
  q4_2: z.enum(frequencyOptions),
  q4_3: z.enum(frequencyOptions),
  q4_4: z.enum(frequencyOptions),
  q4_5: z.enum(frequencyOptions),
  q4_6: z.enum(frequencyOptions),
  q4_7: z.enum(frequencyOptions),
  q4_8: z.enum(frequencyOptions),
  q4_9: z.enum(frequencyOptions),
  q4_10: z.enum(frequencyOptions),

  emotionalState: z.enum(emotionalStateOptions),

  specialistsHelp: z.string().min(1, 'Это поле обязательно'),
  additionalDevelopmentInfo: z.string().optional(),
  childStrengths: z.string().optional(),
  developmentConcerns: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const SurveyStep: React.FC = () => {
  const { setData, setAllFilled } = useSurvey();

  const {
    register,
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      childName: '',
      childDOB: new Date(),
      childGender: "Мужской",
      parentName: '',
      q1_1: 'Очень редко',
      q1_2: 'Очень редко',
      q1_3: 'Очень редко',
      q1_4: 'Очень редко',
      q1_5: 'Очень редко',
      q1_6: 'Очень редко',
      q1_7: 'Очень редко',
      q1_8: 'Очень редко',
      q1_9: 'Очень редко',
      q1_10: 'Очень редко',

      q2_1: 'Очень редко',
      q2_2: 'Очень редко',
      q2_3: 'Очень редко',
      q2_4: 'Очень редко',
      q2_5: 'Очень редко',
      q2_6: 'Очень редко',
      q2_7: 'Очень редко',
      q2_8: 'Очень редко',
      q2_9: 'Очень редко',
      q2_10: 'Очень редко',

      q3_1: 'Очень редко',
      q3_2: 'Очень редко',
      q3_3: 'Очень редко',
      q3_4: 'Очень редко',
      q3_5: 'Очень редко',
      q3_6: 'Очень редко',
      q3_7: 'Очень редко',
      q3_8: 'Очень редко',
      q3_9: 'Очень редко',
      q3_10: 'Очень редко',

      q4_1: 'Очень редко',
      q4_2: 'Очень редко',
      q4_3: 'Очень редко',
      q4_4: 'Очень редко',
      q4_5: 'Очень редко',
      q4_6: 'Очень редко',
      q4_7: 'Очень редко',
      q4_8: 'Очень редко',
      q4_9: 'Очень редко',
      q4_10: 'Очень редко',

      emotionalState: 'Отличное',
      specialistsHelp: '',
      additionalDevelopmentInfo: '',
      childStrengths: '',
      developmentConcerns: '',
    },
  });

  useEffect(() => {
  const rawData = getValues();

  setAllFilled(isValid);

  if (isValid) {
    const transformedData = {
      ...rawData,
      childDOB: rawData.childDOB instanceof Date
        ? rawData.childDOB.toISOString()
        : rawData.childDOB, // вдруг уже строка
    };

    setData(transformedData);
  }
}, [isValid, getValues, setData, setAllFilled]);

  const renderRadioGroup = (
    name: string,
    label: string,
    options: readonly string[],
    controlPath: keyof FormData
  ) => (
    <div className={styles.radioGroup}>
      <label className={styles.label}>{label}</label>
      <Controller
        control={control}
        name={controlPath}
        render={({ field }) => (
          <div className={`${styles.radioOptions} ${styles[name]}`}>
            {options.map((option) => (
              <label key={option} className={styles.radioLabel}>
                <input
                  type="radio"
                  value={option}
                  checked={field.value === option}
                  onChange={() => field.onChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      />
      {errors[controlPath] && (
        <p className={styles.error}>
          {(errors[controlPath]?.message as string) || 'Ошибка'}
        </p>
      )}
    </div>
  );

  return (
    <form className={styles.formWrapper} noValidate>
      <div className={styles.field}>
        <label className={styles.label}>Имя ребенка</label>
        <input {...register('childName')} className={styles.input} placeholder="Имя ребенка" />
        {errors.childName && <p className={styles.error}>{errors.childName.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Дата рождения ребенка</label>
        <div className={styles.datePickerWrap}>
          <Controller
            control={control}
            name="childDOB"
            render={({ field }) => (
              <DatePicker
                selected={field.value instanceof Date ? field.value : null}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd.MM.yyyy"
                className={styles.datePickerinput}
                calendarClassName={styles.calendar}
                popperClassName="no-arrow"
                locale="ru"
                placeholderText="Выберите дату"
                maxDate={new Date()}
              />
            )}
          />
        </div>
        {errors.childDOB && <p className={styles.error}>{errors.childDOB.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Пол ребенка</label>
        <div className={styles.radioOptions}>
          <label className={styles.radioLabel}>
            <input {...register('childGender')} type="radio" value="Мужской" />
            <span>Мужской</span>
          </label>
          <label className={styles.radioLabel}>
            <input {...register('childGender')} type="radio" value="Женский" />
            <span>Женский</span>
          </label>
        </div>
        {errors.childGender && <p className={styles.error}>{errors.childGender.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Имя родителя, заполняющего анкету</label>
        <input {...register('parentName')} className={styles.input} placeholder="Имя родителя" />
        {errors.parentName && <p className={styles.error}>{errors.parentName.message}</p>}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoBoxBlock}>
          <img src="/images/thumbs.webp" alt="thumbs" />
          <p>
            Пожалуйста, внимательно прочитайте каждый вопрос и выберите наиболее подходящий
            вариант ответа, отражающий поведение и эмоциональное состояние вашего ребенка в течение
            последних 2-4 недель. Отвечайте максимально честно и искренне, так как от этого зависит
            точность оценки психоэмоционального развития Вашего ребенка.
          </p>
        </div>
        <div className={styles.infoBoxBlock}>
          <img src="/images/flag.webp" alt="flag" />
          <p>Все вопросы обязательны к заполнению</p>
        </div>
      </div>
      <h3 className={styles.sectionHeader}>1. Эмоциональная сфера</h3>
      {renderRadioGroup('common', 'Ребенок часто выражает радость и удовольствие:', frequencyOptions, 'q1_1')}
      {renderRadioGroup('common', 'Ребенок часто грустит или плачет без видимой причины:', frequencyOptions, 'q1_2')}
      {renderRadioGroup('common', 'Ребенок проявляет интерес к играм и занятиям:', frequencyOptions, 'q1_3')}
      {renderRadioGroup('common', 'Ребенок легко успокаивается после расстройства:', frequencyOptions, 'q1_4')}
      {renderRadioGroup('common', 'Ребенок выражает свои эмоции открыто:', frequencyOptions, 'q1_5')}
      {renderRadioGroup('common', 'Ребенок часто испытывает страхи или тревогу:', frequencyOptions, 'q1_6')}
      {renderRadioGroup('common', 'Ребенок проявляет инициативу в общении:', frequencyOptions, 'q1_7')}
      {renderRadioGroup('common', 'Ребенок легко адаптируется к новым ситуациям:', frequencyOptions, 'q1_8')}
      {renderRadioGroup('common', 'Ребенок испытывает удовольствие от общения с семьей:', frequencyOptions, 'q1_9')}
      {renderRadioGroup('common', 'Ребенок выражает радость через улыбку и смех:', frequencyOptions, 'q1_10')}
      <h3 className={styles.sectionHeader}>2. Социальное взаимодействие</h3>
      {renderRadioGroup('common', 'Ребенок легко заводит друзей:', frequencyOptions, 'q2_1')}
      {renderRadioGroup('common', 'Ребенок предпочитает играть один, а не с другими детьми:', frequencyOptions, 'q2_2')}
      {renderRadioGroup('common', 'Ребенок легко заводит друзей:', frequencyOptions, 'q2_3')}
      {renderRadioGroup('common', 'Ребенок предпочитает играть один, а не с другими детьми:', frequencyOptions, 'q2_4')}
      {renderRadioGroup('common', 'Ребенок легко заводит друзей:', frequencyOptions, 'q2_5')}
      {renderRadioGroup('common', 'Ребенок предпочитает играть один, а не с другими детьми:', frequencyOptions, 'q2_6')}
      {renderRadioGroup('common', 'Ребенок легко заводит друзей:', frequencyOptions, 'q2_7')}
      {renderRadioGroup('common', 'Ребенок предпочитает играть один, а не с другими детьми:', frequencyOptions, 'q2_8')}
      {renderRadioGroup('common', 'Ребенок легко заводит друзей:', frequencyOptions, 'q2_9')}
      {renderRadioGroup('common', 'Ребенок предпочитает играть один, а не с другими детьми:', frequencyOptions, 'q2_10')}
      <h3 className={styles.sectionHeader}>3. Саморегуляция и поведение</h3>
      {renderRadioGroup('common', 'Ребенок умеет следовать правилам и инструкциям:', frequencyOptions, 'q3_1')}
      {renderRadioGroup('common', 'Ребенку трудно контролировать свои импульсы:', frequencyOptions, 'q3_2')}
      {renderRadioGroup('common', 'Ребенок умеет следовать правилам и инструкциям:', frequencyOptions, 'q3_3')}
      {renderRadioGroup('common', 'Ребенку трудно контролировать свои импульсы:', frequencyOptions, 'q3_4')}
      {renderRadioGroup('common', 'Ребенок умеет следовать правилам и инструкциям:', frequencyOptions, 'q3_5')}
      {renderRadioGroup('common', 'Ребенку трудно контролировать свои импульсы:', frequencyOptions, 'q3_6')}
      {renderRadioGroup('common', 'Ребенок умеет следовать правилам и инструкциям:', frequencyOptions, 'q3_7')}
      {renderRadioGroup('common', 'Ребенку трудно контролировать свои импульсы:', frequencyOptions, 'q3_8')}
      {renderRadioGroup('common', 'Ребенок умеет следовать правилам и инструкциям:', frequencyOptions, 'q3_9')}
      {renderRadioGroup('common', 'Ребенку трудно контролировать свои импульсы:', frequencyOptions, 'q3_10')}
      <h3 className={styles.sectionHeader}>4. Самооценка и уверенность в себе</h3>
      {renderRadioGroup('common', 'Ребенок уверен в своих силах и способностях:', frequencyOptions, 'q4_1')}
      {renderRadioGroup('common', 'Ребенок часто сомневается в себе:', frequencyOptions, 'q4_2')}
      {renderRadioGroup('common', 'Ребенок уверен в своих силах и способностях:', frequencyOptions, 'q4_3')}
      {renderRadioGroup('common', 'Ребенок часто сомневается в себе:', frequencyOptions, 'q4_4')}
      {renderRadioGroup('common', 'Ребенок уверен в своих силах и способностях:', frequencyOptions, 'q4_5')}
      {renderRadioGroup('common', 'Ребенок часто сомневается в себе:', frequencyOptions, 'q4_6')}
      {renderRadioGroup('common', 'Ребенок уверен в своих силах и способностях:', frequencyOptions, 'q4_7')}
      {renderRadioGroup('common', 'Ребенок часто сомневается в себе:', frequencyOptions, 'q4_8')}
      {renderRadioGroup('common', 'Ребенок уверен в своих силах и способностях:', frequencyOptions, 'q4_9')}
      {renderRadioGroup('common', 'Ребенок часто сомневается в себе:', frequencyOptions, 'q4_10')}
      <h3 className={styles.sectionHeader}>Раздел 5. Общие вопросы</h3>
      {renderRadioGroup(
        'emotionalState',
        'Как Вы оцениваете общее эмоциональное состояние Вашего ребенка?',
        emotionalStateOptions,
        'emotionalState'
      )}

      <div className={styles.field}>
        <label className={styles.label}>Есть ли у Вашего ребенка какие-либо особенности развития или поведения, о которых Вы хотели бы сообщить дополнительно?</label>
        <textarea {...register('additionalDevelopmentInfo')} className={styles.textarea} rows={3} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Какие, на Ваш взгляд, сильные стороны и таланты есть у Вашего ребенка?</label>
        <textarea {...register('childStrengths')} className={styles.textarea} rows={3} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Какие, на Ваш взгляд, области требуют особого внимания и развития у Вашего ребенка?</label>
        <textarea {...register('developmentConcerns')} className={styles.textarea} rows={3} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Обращались ли Вы ранее к специалистам (психологу, неврологу, логопеду) по поводу развития или поведения Вашего ребенка?
        </label>
        <textarea
          {...register('specialistsHelp')}
          className={styles.textarea}
          rows={3}
        />
        {errors.specialistsHelp && <p className={styles.error}>{errors.specialistsHelp.message}</p>}
      </div>
    </form>
  );
};

export default SurveyStep;