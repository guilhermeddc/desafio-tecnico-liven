import React, {lazy, Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';

import {LinearDeterminate} from 'shared/components';

const Home = lazy(() => import('pages/public/Home'));

export const PublicRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LinearDeterminate />}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
};
