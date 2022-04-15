import {render, screen} from '@testing-library/react';
import {product01} from 'tests/mock';

import {ProductCard} from '.';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('ProductCard', () => {
  it('renders correctly', () => {
    const {container} = render(<ProductCard product={product01} />);

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    render(<ProductCard product={product01} />);

    expect(screen.getByText(/Product Test 1/)).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });
});
