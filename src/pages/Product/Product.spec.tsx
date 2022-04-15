import {QueryClient, QueryClientProvider} from 'react-query';

import {render, waitFor, screen, fireEvent} from '@testing-library/react';
import {AppProvider} from 'shared/context';
import {useCart, useFetchProduct} from 'shared/hooks';
import {moneyMask} from 'shared/utils/moneyMask';
import {products, productsInCart} from 'tests/mock';

import Product from '.';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useParams: () => {
    return {
      id: '1',
    };
  },
}));

jest.mock('shared/hooks', () => ({
  useFetchProduct: jest.fn(),
  useCart: jest.fn(),
}));

const mockedUseFetchProduct = useFetchProduct as jest.Mock;
const mockedUseCart = useCart as jest.Mock;

describe('Product page', () => {
  beforeEach(() => {
    mockedUseFetchProduct.mockImplementation(() => ({
      data: products[0],
      isLoading: false,
    }));
    mockedUseCart.mockImplementation(() => ({
      products: [],
      addNewProduct: jest.fn(),
      addProduct: jest.fn(),
    }));
  });

  it('renders without crashing', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Product />
      </QueryClientProvider>,
    );

    await waitFor(async () => {
      expect(
        screen.getByRole('heading', {name: /product 1/i}),
      ).toBeInTheDocument();
      expect(screen.getByText(String(moneyMask(100)))).toBeInTheDocument();
      expect(screen.getByText(/description 1/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: /add to cart/i,
        }),
      ).toBeInTheDocument();
    });
  });

  it('should with products length is equal to zero', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Product />
        </AppProvider>
      </QueryClientProvider>,
    );

    await waitFor(async () => {
      fireEvent.click(screen.getByRole('button', {name: /add to cart/i}));
    });
  });

  it('should with products length is not equal to zero', async () => {
    const queryClient = new QueryClient();

    const {addProduct} = useCart();

    jest.mock('react-router-dom', () => ({
      useLocation: jest.fn(),
      useParams: () => {
        return {
          id: '1',
        };
      },
    }));

    mockedUseCart.mockImplementation(() => ({
      products: productsInCart,
      addProduct: addProduct,
      addNewProduct: jest.fn(),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Product />
        </AppProvider>
      </QueryClientProvider>,
    );

    await waitFor(async () => {
      fireEvent.click(screen.getByRole('button', {name: /add to cart/i}));
      fireEvent.click(screen.getByRole('button', {name: /add to cart/i}));
    });
  });

  it('should with renders isLoading state true', () => {
    const queryClient = new QueryClient();

    mockedUseFetchProduct.mockImplementation(() => ({
      isLoading: true,
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <Product />
      </QueryClientProvider>,
    );

    expect(screen.getByText(/🍀 Technical Challenge/)).toBeInTheDocument();
    expect(screen.getByText(/Liven/)).toBeInTheDocument();
  });

  it('should with renders isError state true', () => {
    const queryClient = new QueryClient();

    mockedUseFetchProduct.mockImplementation(() => ({
      isError: true,
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <Product />
      </QueryClientProvider>,
    );

    expect(screen.getByText(/Error loading data!/)).toBeInTheDocument();
    expect(screen.getByText(/Reset Page/)).toBeInTheDocument();
  });
});
