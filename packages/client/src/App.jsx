import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SiteWrapper } from './components';
import { DashboardBulletin } from './pages/Dashboard/DashboardBulletin';
import { NewAssessment } from './pages/Assessments/NewAssessment';
import { AssessmentList } from './pages/Assessments/AssessmentList';
import { Login } from './pages/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    element: <DashboardBulletin />,
    path: `/dashboard`,
  },
  {
    element: <NewAssessment />,
    path: `/assessment/new`,
  },
  {
    element: <AssessmentList />,
    path: `/assessment/list`,
  },

  {
    element: <Login />,
    path: `/login`,
  },

]);

const App = () => <SiteWrapper>
  <RouterProvider router={router} />
</SiteWrapper>;

export default App;
