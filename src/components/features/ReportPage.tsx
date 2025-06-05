import { useSelector } from 'react-redux';
import type { RootState } from '../../store/index.ts';

function ReportPage() {
  const taskId = useSelector((state: RootState) => state.upload.taskId);
  const answers = useSelector((state: RootState) => state.survey.data);

  return (
    <div>
      <h2>Report</h2>
      <p><strong>Task ID:</strong> {taskId}</p>
      <p><strong>Survey Answers:</strong> {JSON.stringify(answers)}</p>
    </div>
  );
}

export default ReportPage;
