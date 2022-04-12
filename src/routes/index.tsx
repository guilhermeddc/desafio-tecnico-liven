import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import {PrivateRoutes} from './private.routes';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <PrivateRoutes />
    </BrowserRouter>
  );
};
