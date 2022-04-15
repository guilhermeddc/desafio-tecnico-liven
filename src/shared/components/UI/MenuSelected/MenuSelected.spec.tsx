import {render, screen} from '@testing-library/react';

import {MenuSelected} from '.';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('MenuSelected', () => {
  it('renders correctly', () => {
    const {container} = render(
      <MenuSelected active={true} onClick={() => null}>
        Home
      </MenuSelected>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    render(
      <MenuSelected active={true} onClick={() => null}>
        Home
      </MenuSelected>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
