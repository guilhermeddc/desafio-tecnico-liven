import {moneyMask} from '.';

describe('moneyMask', () => {
  it('should return a string', () => {
    expect(typeof moneyMask(0)).toBe('string');
  });
  it('should return a string with a dollar sign', () => {
    expect(moneyMask(0)).toBe('$0.00');
  });
  it('should return a string with a dollar sign and a number', () => {
    expect(moneyMask(1)).toBe('$1.00');
  });
  it('should return a string with a dollar sign and a number', () => {
    expect(moneyMask(1.1)).toBe('$1.10');
  });
  it('should return a string with a dollar sign and a number', () => {
    expect(moneyMask(1.11)).toBe('$1.11');
  });
  it('should return a string with a dollar sign and a number', () => {
    expect(moneyMask(1.111)).toBe('$1.11');
  });
  it('should return a string with a dollar sign and a number', () => {
    expect(moneyMask(1.1111)).toBe('$1.11');
  });
});
