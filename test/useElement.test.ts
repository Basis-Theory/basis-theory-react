import type {
  BasisTheoryElements,
  ElementType,
} from '@basis-theory/basis-theory-elements-interfaces/elements';
import { renderHook } from '@testing-library/react-hooks';
import { Chance } from 'chance';
import { ElementMapper } from '../src/core/types';
import { useBasisTheoryValue } from '../src/elements/useBasisTheoryValue';
import { useElement } from '../src/elements/useElement';

jest.mock('../src/elements/useBasisTheoryValue');

describe('useElement', () => {
  const chance = new Chance();

  let bt: ElementMapper & BasisTheoryElements;
  let mount: jest.Mock;
  let update: jest.Mock;

  beforeEach(() => {
    mount = jest.fn();

    update = jest.fn();
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
    jest.mocked(useBasisTheoryValue).mockReturnValue(undefined);
    const { result } = renderHook(() =>
      useElement(chance.string(), chance.pickone(['card', 'text']), {})
    );

    expect(bt.createElement).toHaveBeenCalledTimes(0);
    expect(bt.indexElement).toHaveBeenCalledTimes(0);
    expect(bt.disposeElement).toHaveBeenCalledTimes(0);
    expect(result.current).toBeUndefined();
  });

  test('should create, mount and index element', () => {
    const id = chance.string();
    const type = chance.pickone<ElementType>(['card', 'text']);
    const { result } = renderHook(() => useElement(id, type, {}));

    expect(bt.createElement).toHaveBeenCalledTimes(1);
    expect(bt.createElement).toHaveBeenCalledWith(type, {});
    expect(mount).toHaveBeenCalledTimes(1);
    expect(mount).toHaveBeenCalledWith(`#${id}`);
    expect(result.current).toBeDefined();
    expect(bt.indexElement).toHaveBeenCalledWith(id, result.current);
  });

  test('should update options', () => {
    const option1 = chance.word();
    const option2 = chance.word();
    const option3 = chance.word();

    let value1 = chance.word();

    const id = chance.string();
    const type = chance.pickone<ElementType>(['card', 'text']);

    const { rerender } = renderHook(
      ({ options }) => useElement(id, type, options),
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
      [option2]: expect.any(String),
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
});
