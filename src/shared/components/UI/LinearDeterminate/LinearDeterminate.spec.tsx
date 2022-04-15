import {render, screen} from '@testing-library/react';

import {LinearDeterminate} from '.';

describe('LinearDeterminate', () => {
  it('renders correctly', () => {
    const {container} = render(<LinearDeterminate />);

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    render(<LinearDeterminate />);

    expect(screen.getByText('🍀 Technical Challenge')).toBeInTheDocument();
    expect(screen.getByText('Liven')).toBeInTheDocument();
  });
});
