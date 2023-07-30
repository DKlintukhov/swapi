import { makeChildProxy } from './ChidProxy';

describe('makeChildProxy', () => {
  const url = 'https://link/1/';

  it('should make a ChildProxy', () => {
    expect(makeChildProxy(url)).toEqual({ url, id: '1', child: null });
  });
});
