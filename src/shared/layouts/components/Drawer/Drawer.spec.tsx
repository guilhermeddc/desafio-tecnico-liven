import {render} from '@testing-library/react';

import {Drawer} from '.';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('Drawer', () => {
  it('renders correctly an capitalize links', () => {
    const {getAllByText} = render(
      <Drawer
        mobileOpen={false}
        onDrawerToggle={() => null}
        categories={['hats', 'jackets', 'sneakers']}
        onMenuClick={() => null}
        activeMenu={true}
        menuOption={'Shop all'}
        drawerWidth={400}
        onActiveMenu={() => null}
      />,
    );

    expect(getAllByText('Hats')).toBeTruthy();
    expect(getAllByText('Jackets')).toBeTruthy();
    expect(getAllByText('Sneakers')).toBeTruthy();
    expect(getAllByText('Shop all')).toBeTruthy();
  });
});
