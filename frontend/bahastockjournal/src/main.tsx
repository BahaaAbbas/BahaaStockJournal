import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { checkTokenExpiration, logoutUser, refreshToken } from './common/ChecksToken.ts'

const Main = () => {

  useEffect(() => {
    const remainingTime = checkTokenExpiration();

    if (remainingTime) {
      console.log('Token expired, please log in again.');
      logoutUser();
    } else {
      // Check if the token is about to expire in 5 minutes
      const expirationTime = localStorage.getItem('expiresIn');
      const currentTime = new Date().getTime();
      const remainingTimeUntilExpiration = (parseInt(expirationTime || '0') * 1000) - currentTime;

      // 5 minutes before expiration (5 minutes = 300,000 ms)
      if (remainingTimeUntilExpiration <= 300000) {
        console.log('Token about to expire in 5 minutes, refreshing token...');
        refreshToken();
      }
    }
  }, []);


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  </StrictMode>,
)
