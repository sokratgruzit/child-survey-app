import type { ChangeEvent } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { setAllUploaded } from '../../store/uploadSlice';
import { useUpload } from '../../contexts/UploadContext';

import styles from "./Features.module.css";

type FileField = 'scene' | 'animal' | 'selfie';

const UploadStep = () => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  const maxSizeMB = 5;

  const dispatch = useDispatch<AppDispatch>();
  const { files, setFile } = useUpload();
  
  const [previews, setPreviews] = useState<Record<FileField, string | null>>({
    scene: null,
    animal: null,
    selfie: null,
  });
  const [error, setError] = useState<string | null>(null);

  const animControls = {
    scene: useAnimation(),
    animal: useAnimation(),
    selfie: useAnimation(),
  };

  const triggerIconAnimation = async (field: FileField) => {
    const controls = animControls[field];
    await controls.start({ scale: .8, transition: { type: 'spring', stiffness: 300, duration: .15 } });
    await controls.start({ scale: 1, transition: { type: 'spring', stiffness: 300, duration: .15 } });
  };

  const handleFileChange = (field: FileField) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setError(null);

    const updatedFiles = { ...files, [field]: file };

    setFile(field, file);

    if (!file) {
      setPreviews(prev => ({ ...prev, [field]: null }));
      
      const allUploaded = Object.values(updatedFiles).every(Boolean);
      dispatch(setAllUploaded(allUploaded));
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError('Допустимые форматы файлов: jpg, jpeg, png, pdf');
      dispatch(setAllUploaded(false));
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError('Размер файла не должен превышать 5 МБ');
      dispatch(setAllUploaded(false));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews(prev => ({ ...prev, [field]: reader.result as string }));
    };
    reader.readAsDataURL(file);

    const allUploaded = Object.values(updatedFiles).every(Boolean);
    dispatch(setAllUploaded(allUploaded));
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.imageCard}>
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{
            duration: .3,
            ease: "easeIn"
          }}
          onClick={() => triggerIconAnimation("scene")} 
          className={styles.placeholder}
        >
          <input type="file" accept="image/*" onChange={handleFileChange('scene')} />
          {previews.scene && <motion.img
            key={previews.scene}
            className={styles.preview}
            src={previews.scene}
            width={100}
            alt="scene preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          />}
          <motion.img animate={animControls.scene} src={`/images/btn-${previews.scene ? "refresh" : "upload"}.webp`} className={styles.imgIcon} alt="upload" />
        </motion.div>
        <span>Дом, дерево, человек</span>
      </div>
      <div className={styles.imageCard}>
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{
            duration: .3,
            ease: "easeIn",
            delay: .3
          }}
          onClick={() => triggerIconAnimation("animal")} 
          className={styles.placeholder}
        >
          <input type="file" accept="image/*" onChange={handleFileChange('animal')} />
          {previews.animal && <motion.img
            key={previews.animal}
            className={styles.preview}
            src={previews.animal}
            width={100}
            alt="animal preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          />}
          <motion.img animate={animControls.animal} src={`/images/btn-${previews.animal ? "refresh" : "upload"}.webp`} className={styles.imgIcon} alt="upload" />
        </motion.div>
        <span>Несуществующее животное</span>
      </div>
      <div className={styles.imageCard}>
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{
            duration: .3,
            ease: "easeIn",
            delay: .6
          }}
          onClick={() => triggerIconAnimation("selfie")} 
          className={styles.placeholder}
        >
          <input type="file" accept="image/*" onChange={handleFileChange('selfie')} />
          {previews.selfie && <motion.img
            key={previews.selfie}
            className={styles.preview}
            src={previews.selfie}
            width={100}
            alt="selfie preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          />}
          <motion.img animate={animControls.selfie} src={`/images/btn-${previews.selfie ? "refresh" : "upload"}.webp`} className={styles.imgIcon} alt="upload" />
        </motion.div>
        <span>Автопортрет</span>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default UploadStep;
