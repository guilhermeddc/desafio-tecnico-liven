import {render} from '@testing-library/react';

import {Appbar} from '.';

describe('Appbar', () => {
  it('renders correctly', () => {
    const {queryByTestId, getByText} = render(
      <Appbar
        cartQuantity={50}
        drawerWidth={400}
        onDrawerToggle={() => {
          //
        }}
        onNavigateToCart={() => {
          //
        }}
      />,
    );

    expect(queryByTestId('app-bar')).toBeInTheDocument();
    expect(getByText('Technical Challenge Liven')).toBeInTheDocument();
    expect(getByText('50')).toBeInTheDocument();
  });
});
