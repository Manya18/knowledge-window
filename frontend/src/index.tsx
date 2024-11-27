import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import CreateAssistant from './pages/createAssistant/CreateAssistant';
import TestPage from './pages/assistantPreview/AssistantPreview';
import RegistrationPage from './pages/registrationPage/RegistrationPage';
import AuthorizationPage from './pages/authorizationPage/AuthorizationPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/createAssistant",
    element: <CreateAssistant></CreateAssistant>,
  },
  {
    path: "/auth",
    element: <AuthorizationPage></AuthorizationPage>,
  },
  {
    path: "/registration",
    element: <RegistrationPage></RegistrationPage>,
  },
]);

root.render(
    <RouterProvider router={router} />
);