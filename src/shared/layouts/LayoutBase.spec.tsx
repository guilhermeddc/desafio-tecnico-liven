import {QueryClientProvider} from 'react-query';

import {render, screen} from '@testing-library/react';
import {queryClient} from 'shared/services/queryClient';

import {LayoutBase} from '.';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('LayoutBase', () => {
  it('should render', () => {
    const {container} = render(
      <QueryClientProvider client={queryClient}>
        <LayoutBase />
      </QueryClientProvider>,
    );

    screen.debug();

    expect(container).toBeInTheDocument();
    expect(screen.getByText(/Technical Challenge Liven/)).toBeInTheDocument();
    expect(screen.getAllByText(/Shop all/)[0]).toBeInTheDocument();
    expect(screen.getAllByAltText(/logo Liven/)[0]).toBeInTheDocument();
  });
});
