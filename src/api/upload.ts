import { apiFetch } from './index';

export async function uploadFiles(files: {
  scene: File;
  animal: File;
  selfie: File;
}): Promise<{ task_id: string, status: string }> {
  const formData = new FormData();
  formData.append('files', files.scene);
  formData.append('files', files.animal);
  formData.append('files', files.selfie);

  return await apiFetch<{ task_id: string, status: string }>('/upload', {
    method: 'POST',
    body: formData
  });
}
