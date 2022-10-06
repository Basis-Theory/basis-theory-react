import type {
  BasisTheoryElements,
  ElementType,
} from '@basis-theory/basis-theory-js/types/elements';
import { waitFor } from '@testing-library/react';
import { Chance } from 'chance';
import { useBasisTheoryValue } from '../../src/elements/useBasisTheoryValue';
import { useElement } from '../../src/elements/useElement';
import { ElementMapper } from '../../src/types';
import { renderHook } from '../customRenderHook';

jest.mock('../../src/elements/useBasisTheoryValue');

describe('useElement', () => {
  const chance = new Chance();

  let bt: ElementMapper & BasisTheoryElements;
  let mount: jest.Mock;
  let update: jest.Mock;

  beforeEach(() => {
    mount = jest.fn().mockResolvedValue(undefined);
    update = jest.fn().mockResolvedValue(undefined);
    bt = {
      createElement: jest.fn().mockReturnValue({
        mount,
        update,
        mounted: true,
        unmount: jest.fn(),
      }),
      indexElement: jest.fn(),
      disposeElement: jest.fn(),
    } as unknown as BasisTheoryElements & ElementMapper;
    jest.mocked(useBasisTheoryValue).mockReturnValue(bt);
  });

  test("shouldn't do anything while bt instance is not available", () => {
    const mockRef = { current: document.createElement('div') };

    jest.mocked(useBasisTheoryValue).mockReturnValue(undefined);

    const { result } = renderHook(() =>
      useElement(chance.string(), chance.pickone(['card', 'text']), mockRef, {})
    );

    expect(bt.createElement).toHaveBeenCalledTimes(0);
    expect(bt.indexElement).toHaveBeenCalledTimes(0);
    expect(bt.disposeElement).toHaveBeenCalledTimes(0);
    expect(result.current).toBeUndefined();
  });

  test("shouldn't do anything while wrapper ref is not in the DOM", () => {
    // eslint-disable-next-line unicorn/no-null
    const mockRef = { current: null };

    const { result } = renderHook(() =>
      useElement(chance.string(), chance.pickone(['card', 'text']), mockRef, {})
    );

    expect(bt.createElement).toHaveBeenCalledTimes(0);
    expect(bt.indexElement).toHaveBeenCalledTimes(0);
    expect(bt.disposeElement).toHaveBeenCalledTimes(0);
    expect(result.current).toBeUndefined();
  });

  test('should create, mount and index element', () => {
    const id = chance.string();
    const type = chance.pickone<ElementType>(['card', 'text']);
    const mockRef = { current: document.createElement('div') };
    // eslint-disable-next-line unicorn/no-null
    const testRef = { current: null };
    const { result } = renderHook(() =>
      useElement(id, type, mockRef, {}, undefined, testRef)
    );

    expect(bt.createElement).toHaveBeenCalledTimes(1);
    expect(bt.createElement).toHaveBeenCalledWith(type, {});
    expect(mount).toHaveBeenCalledTimes(1);
    expect(mount).toHaveBeenCalledWith(`#${id}`);
    expect(result.current).toBeDefined();
    expect(bt.indexElement).toHaveBeenCalledWith(id, result.current);
  });

  test('should forward object ref to element on creation', () => {
    const id = chance.string();
    const type = chance.pickone<ElementType>(['card', 'text']);
    const wrapperRef = { current: document.createElement('div') };

    // eslint-disable-next-line unicorn/no-null
    const objectRef = { current: null };
    const { result } = renderHook(() =>
      useElement(id, type, wrapperRef, {}, undefined, objectRef)
    );

    expect(result.current).toBeDefined();
    expect(objectRef.current).toBe(result.current);
  });

  test('should forward function ref to element on creation', () => {
    const id = chance.string();
    const type = chance.pickone<ElementType>(['card', 'text']);
    const wrapperRef = { current: document.createElement('div') };

    // eslint-disable-next-line unicorn/no-null
    let createdElement = null;
    const functionRef = (element: any): void => {
      createdElement = element;
    };

    const { result } = renderHook(() =>
      useElement(id, type, wrapperRef, {}, undefined, functionRef)
    );

    expect(result.current).toBeDefined();
    expect(createdElement).toBe(result.current);
  });

  test('should throw mount error in lifecycle', async () => {
    const id = chance.string();
    const type = chance.pickone<ElementType>(['card', 'text']);
    const mockRef = { current: document.createElement('div') };
    const errorMessage = chance.string();

    mount.mockRejectedValue(errorMessage);

    const { result } = renderHook(() => useElement(id, type, mockRef, {}));

    await waitFor(() => {
      expect(result.error).toStrictEqual(errorMessage);
    });
  });

  test('should update options', () => {
    const option1 = chance.word();
    const option2 = chance.word();
    const option3 = chance.word();

    let value1 = chance.word();

    const id = chance.string();
    const type = chance.pickone<ElementType>(['card', 'text']);
    const mockRef = { current: document.createElement('div') };

    const { rerender } = renderHook(
      ({ options }) => useElement(id, type, mockRef, options),
      {
        initialProps: {
          options: {
            [option1]: value1,
          },
        },
      }
    );

    expect(update).toHaveBeenCalledTimes(0);

    // #1 update - new option1 value
    value1 = chance.word();

    rerender({
      options: {
        [option1]: value1,
      },
    });

    expect(update).toHaveBeenLastCalledWith({
      [option1]: value1,
    });

    // #2 update - adds option2
    let value2 = chance.word();

    rerender({
      options: {
        [option1]: value1,
        [option2]: value2,
      },
    });
    expect(update).toHaveBeenLastCalledWith({
      [option2]: value2,
    });

    // #3 update - removes option1
    rerender({
      options: {
        [option2]: value2,
      },
    });
    expect(update).toHaveBeenLastCalledWith({
      [option1]: undefined,
    });

    // #4 update - adds option3 and changes option2
    value2 = chance.word();
    const value3 = chance.word();

    rerender({
      options: {
        [option2]: value2,
        [option3]: value3,
      },
    });
    expect(update).toHaveBeenLastCalledWith({
      [option2]: value2,
      [option3]: value3,
    });

    expect(update).toHaveBeenCalledTimes(4);
  });

  test('should throw update error in lifecycle', async () => {
    const id = chance.string();
    const type = chance.pickone<ElementType>(['card', 'text']);
    const mockRef = { current: document.createElement('div') };
    const errorMessage = chance.string();

    update.mockRejectedValue(errorMessage);

    const { result, rerender } = renderHook(
      ({ options }) => useElement(id, type, mockRef, options),
      {
        initialProps: {
          options: {},
        },
      }
    );

    // no error yet
    expect(result.error).toBeUndefined();

    // trigger error by updating (triggered options update)
    rerender({
      options: {
        [chance.string()]: chance.string(),
      },
    });
    await waitFor(() => {
      expect(result.error).toStrictEqual(errorMessage);
    });
  });
});
