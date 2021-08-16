import { BasisTheory } from '@basis-theory/basis-theory-js';
import type { BasisTheoryInitOptions } from '@basis-theory/basis-theory-js/types';
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

  test('should not initialize if key is falsy', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(() =>
      useBasisTheory('')
    );

    expect(result.current.bt).toBeUndefined();
    rerender();
    // expect rejection, because value never changes
    // eslint-disable-next-line jest/require-to-throw-message
    await expect(() => waitForNextUpdate()).rejects.toThrow();
    expect(result.current.bt).toBeUndefined();
  });

  test('should bubble up init errors', async () => {
    const errorMessage = chance.string();

    jest
      .spyOn(BasisTheory.prototype, 'init')
      .mockRejectedValueOnce(new Error(errorMessage));

    const { waitForNextUpdate, result } = renderHook(() =>
      useBasisTheory(key, options)
    );

    expect(result.current.error).toBeUndefined();

    await waitForNextUpdate();

    expect(result.current.error).toStrictEqual(new Error(errorMessage));
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

    expect(result.current.bt).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current.bt?.applications).toBeDefined();
  });

  test('should update instance if props change', async () => {
    const { waitForNextUpdate, result, rerender } = renderHook(() =>
      useBasisTheory(key, options)
    );

    await waitForNextUpdate();
    const initial = result.current.bt;

    expect(initial).toBeDefined();

    key = chance.string();

    rerender();
    await waitForNextUpdate();

    expect(result.current.bt === initial).toBe(false);
  });
});
