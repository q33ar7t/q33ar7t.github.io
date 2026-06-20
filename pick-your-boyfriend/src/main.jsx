import { createRoot } from 'react-dom/client';

// Fonts as npm packages (previously loaded from Google Fonts CDN)
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/500.css';
import '@fontsource/roboto-mono/400-italic.css';
import '@fontsource/roboto-mono/500-italic.css';
import '@fontsource/source-serif-4/400.css';
import '@fontsource/source-serif-4/600.css';
import '@fontsource/source-serif-4/400-italic.css';
import '@fontsource/source-serif-4/600-italic.css';

import './styles.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
