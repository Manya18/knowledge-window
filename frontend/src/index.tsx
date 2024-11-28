import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import CreateAssistant from './pages/createAssistant/CreateAssistant';
import TestPage from './pages/assistantPreview/AssistantPreview';
import RegistrationPage from './pages/registrationPage/RegistrationPage';
import AuthorizationPage from './pages/authorizationPage/AuthorizationPage';
import AssistantsList from './pages/assistantsList/assistantsList';
import IframeWrapper from './pages/iframeWrapper/IframeWrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const assistantName = window.localStorage.getItem('assistant')

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/createAssistant",
    element: <CreateAssistant />,
  },
  {
    path: "/createAssistant/:id",
    element: <CreateAssistant />,
  },
  {
    path: "/assistantsList",
    element: <AssistantsList />,
  },
  {
    path: "/auth",
    element: <AuthorizationPage></AuthorizationPage>,
  },
  {
    path: "/registration",
    element: <RegistrationPage></RegistrationPage>,
  },
  {
    path: "/assistantPreview/:id",
    element: <TestPage assistantName={assistantName ?? ''} />,
  },
  {
    path: "/iframe",
    element: <IframeWrapper src={`http://localhost:3000/assistantPreview/${assistantName}`} title={assistantName || ""} width="100%" height="100%" />,
  },
]);

root.render(
  <RouterProvider router={router} />
);