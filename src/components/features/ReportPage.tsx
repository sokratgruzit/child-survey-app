import { useSelector } from 'react-redux';
import type { RootState } from '../../store/index.ts';

function ReportPage() {
  const taskId = useSelector((state: RootState) => state.upload.taskId);

  return (
    <div>
      <h2>Report</h2>
      <p><strong>Task ID:</strong> {taskId}</p>
    </div>
  );
}

export default ReportPage;
