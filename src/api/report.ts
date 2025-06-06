import { apiFetch } from './index';

export async function getReportStatus(taskId: string): Promise<{ status: string }> {
  return await apiFetch<{ status: string }>(`/report/${taskId}`);
}
