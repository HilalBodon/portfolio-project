import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './Context';


const root = document.getElementById('root');
const rootInstance = createRoot(root);
rootInstance.render(
    <ThemeProvider>
    <App />
    </ThemeProvider>,
); 
