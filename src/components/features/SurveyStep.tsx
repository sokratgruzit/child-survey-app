import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { setSurveyData } from '../../store/surveySlice';

interface Props {
  onNext: () => void;
}

const SurveyStep = ({ onNext }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    education: '',
    profession: '',
    workingWithChildren: '',
    howFound: '',
    motivation: '',
    experience: '',
    difficulties: '',
    ideas: '',
    thoughts: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(setSurveyData(form));
    onNext();
  };

  const disabled = !form.name || !form.age || !form.gender;

  return (
    <div>
      <h2>Анкета участника</h2>

      <input name="name" placeholder="ФИО" value={form.name} onChange={handleChange} />

      <input name="age" placeholder="Возраст" value={form.age} onChange={handleChange} />

      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">Пол</option>
        <option value="Мужской">Мужской</option>
        <option value="Женский">Женский</option>
        <option value="Другое">Другое</option>
      </select>

      <input name="education" placeholder="Образование" value={form.education} onChange={handleChange} />

      <input name="profession" placeholder="Профессия" value={form.profession} onChange={handleChange} />

      <input name="workingWithChildren" placeholder="Опыт с детьми (где, сколько лет)" value={form.workingWithChildren} onChange={handleChange} />

      <input name="howFound" placeholder="Как узнали об исследовании" value={form.howFound} onChange={handleChange} />

      <textarea name="motivation" placeholder="Почему решили участвовать?" value={form.motivation} onChange={handleChange} />

      <textarea name="experience" placeholder="Что показалось интересным / необычным?" value={form.experience} onChange={handleChange} />

      <textarea name="difficulties" placeholder="С какими трудностями столкнулись?" value={form.difficulties} onChange={handleChange} />

      <textarea name="ideas" placeholder="Какие возникли идеи по улучшению?" value={form.ideas} onChange={handleChange} />

      <textarea name="thoughts" placeholder="Мысли/ощущения после участия в исследовании" value={form.thoughts} onChange={handleChange} />

      <button disabled={disabled} onClick={handleSubmit}>
        Отправить анкету
      </button>
    </div>
  );
};

export default SurveyStep;
