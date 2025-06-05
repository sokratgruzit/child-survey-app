import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { setTaskId } from '../../store/uploadSlice';
import Button from '../UI/Button/Button';

import styles from "./Features.module.css";

interface Props {
  onNext: () => void;
}

type FileField = 'scene' | 'animal' | 'selfie';

const UploadStep = ({ onNext }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [files, setFiles] = useState<Record<FileField, File | null>>({
    scene: null,
    animal: null,
    selfie: null,
  });
  const [previews, setPreviews] = useState<Record<FileField, string | null>>({
    scene: null,
    animal: null,
    selfie: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (field: FileField) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [field]: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviews(prev => ({ ...prev, [field]: null }));
    }
  };

  const allUploaded = Object.values(files).every(Boolean);

  const handleSubmit = async () => {
    if (!allUploaded) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('scene', files.scene!);
    formData.append('animal', files.animal!);
    formData.append('selfie', files.selfie!);

    try {
      const res = await fetch('https://sirius-draw-test-94500a1b4a2f.herokuapp.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      const data = await res.json();

      if (!data.task_id) throw new Error('Ответ не содержит task_id');
      dispatch(setTaskId(data.task_id));
      onNext();
    } catch (err: any) {
      setError(err.message || 'Не удалось загрузить фото');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Загрузите 3 изображения</h2>

      <label>
        Дом / Дерево / Человек
        <input type="file" accept="image/*" onChange={handleFileChange('scene')} />
      </label>
      {previews.scene && <img src={previews.scene} width={100} alt="scene preview" />}

      <label>
        Несуществующее животное
        <input type="file" accept="image/*" onChange={handleFileChange('animal')} />
      </label>
      {previews.animal && <img src={previews.animal} width={100} alt="animal preview" />}

      <label>
        Автопортрет
        <input type="file" accept="image/*" onChange={handleFileChange('selfie')} />
      </label>
      {previews.selfie && <img src={previews.selfie} width={100} alt="selfie preview" />}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button
        text="Далее"
        onClick={handleSubmit}
        backgroundColor="var(--blue-primary)"
        textColor="white"
        icon={<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6L1 6M15 6L10 11M15 6L10 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>}
        iconColor="white"
        disabled={!allUploaded || loading}
      />
    </div>
  );
};

export default UploadStep;
