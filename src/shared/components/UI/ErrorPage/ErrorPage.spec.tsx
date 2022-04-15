import {QueryClient, QueryClientProvider, QueryObserver} from 'react-query';

import {fireEvent, render, screen} from '@testing-library/react';

import {ErrorPage} from '.';

describe('ErrorPage', () => {
  it('renders correctly', () => {
    const myQueryFn = jest.fn();

    const queryClient = new QueryClient();

    new QueryObserver(queryClient, {
      queryKey: 'products',
    });
    const {container} = render(
      <QueryClientProvider client={queryClient}>
        <ErrorPage queryKey="" />
      </QueryClientProvider>,
    );

    const unsubscribeQuery = queryClient.getQueryCache().subscribe((query) => {
      if (String(query?.query) === 'products') {
        myQueryFn();
      }
    });

    expect(myQueryFn).toHaveBeenCalledTimes(0);
    unsubscribeQuery();

    fireEvent.click(screen.getByRole('button'));
    unsubscribeQuery();
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ErrorPage queryKey="" />
      </QueryClientProvider>,
    );

    expect(screen.getByText('Error loading data!')).toBeInTheDocument();
    expect(screen.getByText('Reset Page')).toBeInTheDocument();
  });
});
