import { useEffect } from 'react';
import './styles/theme.css'
import AppRoutes from './routes/AppRoutes';
import { applyThemeSettings } from './utils/themeHandler';

const App: React.FC = () => {
  useEffect(() => {
    applyThemeSettings();
    const theme = import.meta.env.VITE_REACT_APP_THEME || 'default'; 
    document.documentElement.setAttribute('data-theme', theme);
  }, []);


  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
