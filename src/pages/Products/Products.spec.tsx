import {QueryClient, QueryClientProvider} from 'react-query';

import {render, waitFor, screen} from '@testing-library/react';
import {useFetchProductsForCategories} from 'shared/hooks';
import {moneyMask} from 'shared/utils/moneyMask';
import {products} from 'tests/mock';

import Products from '.';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useParams: () => {
    return {
      category: 'electronics',
    };
  },
}));
jest.mock('shared/hooks', () => ({
  useFetchProductsForCategories: jest.fn(),
}));

const mockedUseFetchProducts = useFetchProductsForCategories as jest.Mock;

describe('<Products />', () => {
  beforeEach(() => {
    mockedUseFetchProducts.mockImplementation(() => ({
      data: products,
      isLoading: false,
    }));
  });

  it('renders without crashing', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>,
    );

    await waitFor(async () => {
      expect(
        screen.getByRole('heading', {
          name: /on sale now/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: /product 1/i,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(String(moneyMask(100)))).toBeInTheDocument();

      expect(
        screen.getByRole('heading', {
          name: /\$100\.00/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: /product 2/i,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(String(moneyMask(200)))).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: /\$200\.00/i,
        }),
      ).toBeInTheDocument();
    });
  });

  it('renders isLoading state true', () => {
    const queryClient = new QueryClient();

    mockedUseFetchProducts.mockImplementation(() => ({
      isLoading: true,
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>,
    );

    expect(screen.getByText(/🍀 Technical Challenge/)).toBeInTheDocument();
    expect(screen.getByText(/Liven/)).toBeInTheDocument();
  });

  it('renders isError state true', () => {
    const queryClient = new QueryClient();

    mockedUseFetchProducts.mockImplementation(() => ({
      isError: true,
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>,
    );

    expect(screen.getByText(/Error loading data!/)).toBeInTheDocument();
    expect(screen.getByText(/Reset Page/)).toBeInTheDocument();
  });
});
