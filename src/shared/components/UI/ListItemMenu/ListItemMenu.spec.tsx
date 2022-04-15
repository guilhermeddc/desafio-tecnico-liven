import {render, screen} from '@testing-library/react';

import {ListItemMenu} from '.';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('ListItemMenu', () => {
  it('renders correctly', () => {
    const {container} = render(
      <ListItemMenu label="Home" link="/" onClick={() => null} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    render(<ListItemMenu label="Home" link="/" onClick={() => null} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
