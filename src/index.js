import React from 'react'
import { createRoot } from 'react-dom/client';
import '/src/UI/Styles/app.css'
import { MainApp } from './Infrastructure';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<MainApp />);