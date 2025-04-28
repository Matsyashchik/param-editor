import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const params = [
    { id: 1, name: "Назначение", type: 'string' },
    { id: 2, name: "Длина", type: 'string' }
];

const initialModel: Model = {
    paramValues: [
        { paramId: 1, value: "повседневное" },
        { paramId: 2, value: "макси" }
    ],
    colors: []
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App params={params} model={initialModel} />
  </StrictMode>,
)
