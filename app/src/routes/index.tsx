import Dashboard from '../pages/dashboard';
import Page from '../pages';
import { Route, Routes } from 'react-router';
import paths from './paths';
import Scheduling from '../pages/scheduling';
import SchedulingView from '../pages/schedulingView';

const MainRoute = () => (
  <Routes>
    <Route path={paths.home} element={<Page><Dashboard /></Page>}  />
    <Route path={paths.dashboard} element={<Page><Dashboard /></Page>} />
    <Route path={paths.scheduling} element={<Page><Scheduling /></Page>} />
    <Route path={paths.schedulingView} element={<Page><SchedulingView /></Page>} />
    <Route path="*" element={<h1>Hello world !</h1>} />
  </Routes>
);

export default MainRoute;