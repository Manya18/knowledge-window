import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateAssistant from './pages/createAssistant/CreateAssistant';
import TestPage from './pages/assistantPreview/AssistantPreview';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/createAssistant",
    element: <CreateAssistant></CreateAssistant>,
  },
  // {
  //   path: "/test",
  //   element: <TestPage></TestPage>,
  // },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);