import {theme} from '.';

describe('theme', () => {
  it('should be defined', () => {
    expect(theme).toBeDefined();
  });

  it('should have a primary color', () => {
    expect(theme.palette.primary).toBeDefined();
  });
});
