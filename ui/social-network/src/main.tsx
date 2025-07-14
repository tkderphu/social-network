import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'
import 'primereact/resources/themes/saga-blue/theme.css';  // or another theme
import 'primereact/resources/primereact.min.css';
import AppProvider from './provider/AppProvider'
import UnProtectedRoute from './routes/UnProtectedRoute'
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css'; // optional
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
    {/* <UnProtectedRoute /> */}
  </BrowserRouter>
  // {/* </StrictMode>, */}
)
