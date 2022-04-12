import React, {lazy, Suspense} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {LinearDeterminate} from 'shared/components';

const Home = lazy(() => import('pages/private/Home'));

export const PrivateRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LinearDeterminate />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="*" element={() => <Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
