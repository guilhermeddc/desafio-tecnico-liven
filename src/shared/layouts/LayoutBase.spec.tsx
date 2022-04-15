import {QueryClientProvider} from 'react-query';
import {BrowserRouter} from 'react-router-dom';

import {fireEvent, render, screen} from '@testing-library/react';
import {queryClient} from 'shared/services/queryClient';

import {LayoutBase} from '.';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation: jest.fn(),
}));

describe('LayoutBase', () => {
  it('should render', () => {
    const {container} = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <LayoutBase />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByText(/Technical Challenge Liven/)).toBeInTheDocument();
    expect(screen.getAllByText(/Shop all/)[0]).toBeInTheDocument();
    expect(screen.getAllByAltText(/logo Liven/)[0]).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('app-bar-icon-button'));
  });
});
