import {BrowserRouter} from 'react-router-dom';

import {fireEvent, render, screen} from '@testing-library/react';
import {AppProvider} from 'shared/context';
import {useCart} from 'shared/hooks';
import {productsInCart} from 'tests/mock';

import Cart from '.';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation: jest.fn(),
}));
jest.mock('shared/hooks', () => ({
  useCart: jest.fn(),
}));

const mockedUseCart = useCart as jest.Mock;

describe('Cart', () => {
  it('should render products length is greater than zero', () => {
    mockedUseCart.mockImplementation(() => ({
      cartTotalPrice: 400,
      products: productsInCart,
      cartQuantity: 3,
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
      deleteProduct: jest.fn(),
    }));

    const {container} = render(
      <BrowserRouter>
        <AppProvider>
          <Cart />
        </AppProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText(/Your bag/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Qty/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getByTestId('add-product-1'));
    expect(screen.getAllByText(/2/i)[0]).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('remove-product-1'));
    expect(screen.getAllByText(/1/i)[0]).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('delete-product-2'));
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  });

  it('should render products length is equal to zero', () => {
    mockedUseCart.mockImplementation(() => ({
      cartTotalPrice: 0,
      products: [],
      cartQuantity: 0,
    }));

    const {container} = render(
      <BrowserRouter>
        <AppProvider>
          <Cart />
        </AppProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText(/Your bag/i)).toBeInTheDocument();
    expect(screen.getByText(/Your bag is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/Return to home/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Return to home/i));
    expect(container).toBeInTheDocument();
  });
});
