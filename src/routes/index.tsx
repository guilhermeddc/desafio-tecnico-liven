import React, {lazy, Suspense} from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Router,
} from 'react-router-dom';

import {LinearDeterminate} from 'shared/components';
import {LayoutBase} from 'shared/layouts';

const Home = lazy(() => import('pages/Home'));
const Cart = lazy(() => import('pages/Cart'));
const Product = lazy(() => import('pages/Product'));
const Products = lazy(() => import('pages/Products'));

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <LayoutBase>
        <Suspense fallback={<LinearDeterminate />}>
          <Router>
            <Route path="/" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="product/:product" element={<Product />} />
            <Route path="category/:category" element={<Products />} />

            <Route path="*" element={() => <Navigate to="/" replace />} />
          </Router>
        </Suspense>
      </LayoutBase>
    </BrowserRouter>
  );
};
