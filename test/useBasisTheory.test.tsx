import React, { FC } from 'react';
import type { BasisTheoryInitOptions } from '@basis-theory/basis-theory-js/types';
import { renderHook } from '@testing-library/react-hooks';
import { Chance } from 'chance';
import { useBasisTheory } from '../src';
import { BasisTheoryProvider } from '../src/core/BasisTheoryProvider';
import { BasisTheoryReact } from '../src/core/BasisTheoryReact';

jest.mock('../src/core/BasisTheoryReact');

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
    expect(BasisTheoryReact).toHaveBeenCalledTimes(0);
  });

  test('should bubble up constructor errors', () => {
    const errorMessage = chance.string();

    jest.mocked(BasisTheoryReact).mockImplementationOnce(() => {
      throw new Error(errorMessage);
    });

    const { result } = renderHook(() => useBasisTheory(key, options));

    expect(result.current.error).toStrictEqual(new Error(errorMessage));
  });

  test('should bubble up async init errors', async () => {
    const errorMessage = chance.string();

    jest
      .spyOn(BasisTheoryReact.prototype, 'init')
      .mockRejectedValueOnce(new Error(errorMessage));

    const { waitForNextUpdate, result } = renderHook(() =>
      useBasisTheory(key, options)
    );

    expect(result.current.error).toBeUndefined();

    await waitForNextUpdate();

    expect(result.current.error).toStrictEqual(new Error(errorMessage));
  });

  test('should pass parameters to BasisTheory init', async () => {
    const init = jest.spyOn(BasisTheoryReact.prototype, 'init');

    const { waitForNextUpdate } = renderHook(() =>
      useBasisTheory(key, options)
    );

    await waitForNextUpdate();
    expect(init).toHaveBeenCalledWith(key, options);
  });

  test('should update instance if props change', async () => {
    const bt = {} as BasisTheoryReact;
    const init = jest.fn().mockResolvedValue(bt);

    bt.init = init;
    jest.mocked(BasisTheoryReact).mockReturnValue(bt);

    const { waitForNextUpdate, rerender } = renderHook(() =>
      useBasisTheory(key, options)
    );

    await waitForNextUpdate();

    key = chance.string();

    rerender();
    await waitForNextUpdate();

    expect(init).toHaveBeenCalledTimes(2);
  });

  describe('Context', () => {
    let btFromContext: BasisTheoryReact;
    let wrapper: FC<{ apiKey?: string }>;

    beforeEach(() => {
      btFromContext = {
        [chance.string()]: chance.string(),
      } as unknown as BasisTheoryReact;
      // eslint-disable-next-line react/display-name
      wrapper = ({ children }): JSX.Element => (
        <BasisTheoryProvider bt={btFromContext}>{children}</BasisTheoryProvider>
      );
    });

    test('should grab instance from Context if no props are passed', () => {
      const { result } = renderHook(() => useBasisTheory(), { wrapper });

      expect(result.current.bt).toStrictEqual(btFromContext);
    });

    test('should favor new instance created from props over Context', async () => {
      const bt = {
        [chance.string()]: chance.string(),
      } as unknown as BasisTheoryReact;
      const init = jest
        .spyOn(BasisTheoryReact.prototype, 'init')
        .mockResolvedValue(bt);

      const { result, rerender, waitForNextUpdate } = renderHook(
        ({ apiKey }) => useBasisTheory(apiKey),
        {
          wrapper,
          initialProps: {},
        }
      );

      // no props
      expect(result.current.bt).toStrictEqual(btFromContext);
      expect(init).toHaveBeenCalledTimes(0);

      // passes defined apiKey to hook
      rerender({ apiKey: key });
      await waitForNextUpdate();

      expect(result.current.bt).toStrictEqual(bt);
      expect(init).toHaveBeenCalledTimes(1);
      expect(init).toHaveBeenLastCalledWith(key, undefined);

      // passes undefined apiKey to hook
      rerender({ apiKey: undefined });

      expect(result.current.bt).toStrictEqual(btFromContext);
      expect(init).toHaveBeenCalledTimes(1);
    });
  });
});
