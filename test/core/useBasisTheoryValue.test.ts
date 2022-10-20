import { renderHook } from '@testing-library/react';
import type { BasisTheoryReact } from '../../src';
import { useBasisTheory } from '../../src/core/useBasisTheory';
import { useBasisTheoryValue } from '../../src/elements/useBasisTheoryValue';

jest.mock('../../src/core/useBasisTheory');

describe('useBasisTheoryValue', () => {
  let btParam: BasisTheoryReact<true>;
  let btContext: BasisTheoryReact<true>;

  beforeEach(() => {
    btParam = {} as BasisTheoryReact<true>;
    btContext = {} as BasisTheoryReact<true>;
  });

  test('should return undefined when no instance is available', () => {
    jest.mocked(useBasisTheory).mockReturnValue({});
    const { result } = renderHook(() => useBasisTheoryValue());

    expect(result.current).toBeUndefined();
  });
  test('should return instance from context', () => {
    jest.mocked(useBasisTheory).mockReturnValue({ bt: btContext });
    const { result } = renderHook(() => useBasisTheoryValue());

    expect(result.current).toBe(btContext);
  });
  test('should favor parameter instance', () => {
    jest.mocked(useBasisTheory).mockReturnValue({ bt: btContext });
    const { result } = renderHook(() => useBasisTheoryValue(btParam));

    expect(result.current).toBe(btParam);
  });
});
