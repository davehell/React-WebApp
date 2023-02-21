import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
