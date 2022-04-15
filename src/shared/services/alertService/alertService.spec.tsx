import {QueryClient, QueryClientProvider} from 'react-query';

import {render} from '@testing-library/react';
import {Observable} from 'rxjs';
import {LayoutBase} from 'shared/layouts';

import {AlertService, feedback} from '.';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('AlertService', () => {
  it('should be defined', () => {
    expect(AlertService).toBeDefined();
  });

  it('should be a object', () => {
    expect(typeof AlertService).toBe('object');
  });

  it('should return an Observable ', () => {
    const queryClient = new QueryClient();

    feedback('Success', 'success');

    render(
      <QueryClientProvider client={queryClient}>
        <LayoutBase />
      </QueryClientProvider>,
    );

    expect(AlertService).toBeInstanceOf(Observable);
  });
});
