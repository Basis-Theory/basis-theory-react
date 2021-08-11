import { BasisTheory } from '@Basis-Theory/basis-theory-js';
import type { BasisTheoryInitOptions } from '@Basis-Theory/basis-theory-js/types';
import { renderHook } from '@testing-library/react-hooks';
import { Chance } from 'chance';
import { useBasisTheory } from '../src';

describe('useBasisTheory', () => {
  const chance = new Chance();

  let key: string;
  let options: BasisTheoryInitOptions;

  beforeEach(() => {
    key = chance.string();
    options = {
      [chance.string()]: chance.string(),
    };
  });

  test('should pass parameters to BasisTheory init', async () => {
    const init = jest.spyOn(BasisTheory.prototype, 'init');

    const { waitForNextUpdate } = renderHook(() =>
      useBasisTheory(key, options)
    );

    await waitForNextUpdate();
    expect(init).toHaveBeenCalledWith(key, options);
  });

  test('should update with initialized instance only', async () => {
    const { waitForNextUpdate, result } = renderHook(() =>
      useBasisTheory(key, options)
    );

    expect(result.current).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current?.applications).toBeDefined();
  });

  test('should update instance if props change', async () => {
    const { waitForNextUpdate, result, rerender } = renderHook(() =>
      useBasisTheory(key, options)
    );

    await waitForNextUpdate();
    const initial = result.current;

    expect(initial).toBeDefined();

    key = chance.string();

    rerender();
    await waitForNextUpdate();

    expect(result.current === initial).toBe(false);
  });
});
