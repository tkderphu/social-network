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

// Register Firebase Messaging Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}