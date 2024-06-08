import ReactDOM from 'react-dom/client';
import App from './App.js';
import { PreviousContainerProvider } from './context/containerContext';
import './index.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <PreviousContainerProvider>
      <App />
  </PreviousContainerProvider>    
  
)
