import {render} from '@testing-library/react';

import {Drawer} from '.';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('Drawer', () => {
  it('renders correctly an capitalize links', () => {
    const {getAllByText, debug} = render(
      <Drawer
        mobileOpen={false}
        onDrawerToggle={() => {
          //
        }}
        categories={['hats', 'jackets', 'sneakers']}
        onMenuClick={() => {
          //
        }}
        activeMenu={true}
        menuOption={'Shop all'}
        drawerWidth={400}
        onActiveMenu={() => {
          //
        }}
      />,
    );

    debug();
    expect(getAllByText('Hats')).toBeTruthy();
    expect(getAllByText('Jackets')).toBeTruthy();
    expect(getAllByText('Sneakers')).toBeTruthy();
    expect(getAllByText('Shop all')).toBeTruthy();
  });
});
