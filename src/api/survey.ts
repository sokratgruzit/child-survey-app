import { apiFetch } from './index';

type SurveyPayload = {
    task_id: string;
    survey: {
        [key: string]: any;
    };
};

export async function submitSurvey(data: SurveyPayload): Promise<{ task_id: string, message: string }> {    
    return await apiFetch<{ task_id: string, message: string }>('/submit-survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}
