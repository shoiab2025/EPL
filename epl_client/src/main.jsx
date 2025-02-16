import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/userContext.jsx'
import { Suspense } from 'react'
import LoadingPage from './Pages/LoadingPage/LoadingPage.jsx'
const AppComponent = React.lazy(() => import('./App.jsx'))
import {SnackbarProvider} from "notistack"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={2} anchorOrigin={{
      vertical: "top",
      horizontal: "right"
    }}>
      <Suspense fallback={<LoadingPage />}>
        <UserContext>
          <AppComponent />
        </UserContext>
      </Suspense>
    </SnackbarProvider>
  </BrowserRouter>
);
