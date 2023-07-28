import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value'));

    expect(result.current).toBe('initial value');
  });

  it('should debounce the value update', async () => {
    const { result, rerender } = renderHook((props) => useDebounce(props.value, props.delay), {
      initialProps: { value: 'initial value', delay: 250 },
    });

    await act(() => {
      rerender({ value: 'updated value', delay: 250 });
    });

    expect(result.current).toBe('initial value');

    await act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current).toBe('updated value');
  });

//   it('should update the value immediately if delay is 0', async () => {
//     const { result, rerender } = renderHook((props) => useDebounce(props.value, props.delay), {
//       initialProps: { value: 'initial value', delay: 0 },
//     });

//     await act(() => {
//       rerender({ value: 'updated value', delay: 0 });
//     });

//     expect(result.current).toBe('updated value');
//   });
});
