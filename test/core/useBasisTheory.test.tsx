import * as React from 'react';
import type { BasisTheoryInitOptions } from '@basis-theory/basis-theory-js/types/sdk';
import { renderHook, waitFor } from '@testing-library/react';
import { Chance } from 'chance';
import { useBasisTheory } from '../../src';
import { BasisTheoryProvider } from '../../src/core/BasisTheoryProvider';
import { BasisTheoryReact } from '../../src/core/BasisTheoryReact';

jest.mock('../../src/core/BasisTheoryReact');

describe('useBasisTheory', () => {
  const chance = new Chance();

  let key: string;
  let options: BasisTheoryInitOptions;

  beforeEach(() => {
    key = chance.string();
    options = {
      [chance.string()]: chance.string(),
    };
    jest.resetAllMocks();
  });

  test('should not initialize if key is falsy', async () => {
    let error: Error | undefined;
    const { result, rerender } = renderHook(() => useBasisTheory(''), {
      wrapper: class Wrapper extends React.Component<
        React.PropsWithChildren<unknown>
      > {
        public override componentDidCatch(err: Error): void {
          error = err;
        }

        public override render(): React.ReactNode {
          return this.props.children;
        }
      },
    });

    expect(result.current.bt).toBeUndefined();
    expect(error).toBeUndefined();
    rerender();
    // expect rejection, because value never changes
    // await expect(() => rerender()).rejects.toThrow();
    await waitFor(() => expect(error).toBe(true));
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

    const { result } = renderHook(() => useBasisTheory(key, options));

    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.error).toStrictEqual(new Error(errorMessage));
    });
  });

  test('should pass parameters to BasisTheory init', async () => {
    const init = jest.spyOn(BasisTheoryReact.prototype, 'init');

    renderHook(() => useBasisTheory(key, options));

    await waitFor(() => {
      expect(init).toHaveBeenCalledWith(key, options);
    });
  });

  test('should not update instance if props change', async () => {
    const bt = {} as BasisTheoryReact;
    const init = jest.fn().mockResolvedValue(bt);

    bt.init = init;
    jest.mocked(BasisTheoryReact).mockReturnValue(bt);

    const { rerender } = renderHook(() => useBasisTheory(key, options));

    await waitFor(() => {
      key = chance.string();
      rerender();
      expect(init).toHaveBeenCalledTimes(1);
    });
  });

  describe('Context', () => {
    let btFromContext: BasisTheoryReact;
    let wrapper: React.FC<{
      apiKey?: string;
      children?: React.ReactNode;
    }>;

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

    // eslint-disable-next-line jest/no-commented-out-tests
    // test('should favor new instance created from props over Context', async () => {
    //   const bt = {
    //     [chance.string()]: chance.string(),
    //   } as unknown as BasisTheoryReact;
    //   const init = jest
    //     .spyOn(BasisTheoryReact.prototype, 'init')
    //     .mockResolvedValue(bt);

    //   const { result, rerender } = renderHook(
    //     ({ apiKey }) => useBasisTheory(apiKey),
    //     {
    //       wrapper,
    //       initialProps: {},
    //     }
    //   );

    //   // no props, gets from Context
    //   expect(result.current.bt).toStrictEqual(btFromContext);
    //   expect(init).toHaveBeenCalledTimes(0);

    //   // passes apiKey to hook
    //   rerender({ apiKey: key });
    //   await waitFor(() => {
    //     // should get back initialized instance
    //     expect(result.current.bt).toStrictEqual(bt);
    //     expect(init).toHaveBeenCalledTimes(1);
    //     expect(init).toHaveBeenLastCalledWith(key, undefined);

    //     // goes back passing undefined apiKey to hook
    //     rerender({ apiKey: undefined });

    //     // should be the original initialized instance still
    //     expect(result.current.bt).toStrictEqual(bt);
    //     expect(init).toHaveBeenCalledTimes(1);
    //   });
    // });
  });
});
