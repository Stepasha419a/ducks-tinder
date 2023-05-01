import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';
import Login from '@pages/Login';
import Registration from '@pages/Registration';
import TinderPage from '@pages/Tinder';
import ProfilePage from '@pages/Profile';
import ChatPage from '@pages/Chat';
import PairsPage from '@pages/Pairs';
import PolicyPage from '@pages/Policy';

const Routing = (): ReactElement => {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.registration} element={<Registration />} />

      <Route index element={<TinderPage />} />
      <Route path={ROUTES.profile} element={<ProfilePage />} />
      <Route path={ROUTES.chat} element={<ChatPage />} />
      <Route path={ROUTES.pairs} element={<PairsPage />} />
      <Route path={ROUTES.policy} element={<PolicyPage />} />
      <Route path={ROUTES.notFound} element={<div>404 NOT FOUND</div>} />
    </Routes>
  );
};

export default Routing;
