import { createRoot } from 'react-dom/client';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import App from './App.tsx';
import { store } from './store/index.ts';
import { Provider } from 'react-redux';
import { UploadProvider } from "./contexts/UploadContext";
import { SurveyProvider } from './contexts/SurveyContext.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <UploadProvider>
      <SurveyProvider>
        <App />
      </SurveyProvider>
    </UploadProvider>
  </Provider>
)
