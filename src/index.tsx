import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/root';
import TVShow from './pages/tv-show';
import Episode from './pages/episode';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {index: true, element: <TVShow id={1} />},
      {
        path: "episodes/:episodeId",
        element: <Episode />,
      }
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
