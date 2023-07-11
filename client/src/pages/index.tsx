import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';
import Login from '@pages/Login';
import Registration from '@pages/Registration';
import NavLayout from '@pages/NavLayout';
import TinderPage from '@pages/Tinder';
import ProfilePage from '@pages/Profile';
import ChatPage from '@pages/Chat';
import PairsPage from '@pages/Pairs';
import PolicyPage from '@pages/Policy';
import { Chat, ImageSetting, PlaceSetting } from '@/widgets';
import { Choose } from './Chat/components';
import { UserImage } from './Profile/components';

const Routing = (): ReactElement => {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.registration} element={<Registration />} />

      <Route path={ROUTES.main} element={<NavLayout />}>
        <Route index element={<TinderPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />}>
          <Route index element={<UserImage />} />
          <Route path="edit" element={<ImageSetting />} />
          <Route path="place" element={<PlaceSetting />} />
          <Route path=":settingName" element={<UserImage />} />
        </Route>
        <Route path={ROUTES.chat} element={<ChatPage />}>
          <Route index element={<Choose />} />
          <Route path=":chatId" element={<Chat />} />
        </Route>
        <Route path={ROUTES.pairs} element={<PairsPage />} />
      </Route>

      <Route path={ROUTES.policy} element={<PolicyPage />} />
      <Route path={ROUTES.notFound} element={<div>404 NOT FOUND</div>} />
    </Routes>
  );
};

export default Routing;
