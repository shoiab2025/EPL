import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/userContext.jsx'
import { Suspense } from 'react'
import LoadingPage from './Pages/LoadingPage/LoadingPage.jsx'
const AppComponent = React.lazy(() => import('./App.jsx'))

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback={<LoadingPage />}>
      <UserContext>
        <AppComponent />
      </UserContext>
    </Suspense>
  </BrowserRouter>
);
