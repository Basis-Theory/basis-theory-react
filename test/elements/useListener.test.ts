import type {
  BaseElement,
  EventType,
} from '@basis-theory/basis-theory-elements-interfaces/elements';
import { renderHook } from '@testing-library/react-hooks';
import { Chance } from 'chance';
import { useListener } from '../../src/elements/useListener';

describe('useListener', () => {
  const chance = new Chance();

  let eventType: EventType;
  let element: BaseElement<unknown>;
  let unsubscribe: jest.Mock;

  beforeEach(() => {
    eventType = chance.string() as EventType;
    unsubscribe = jest.fn();
    element = {
      on: jest.fn().mockReturnValue({
        unsubscribe,
      }),
    } as unknown as BaseElement<unknown>;
  });

  test('should not subscribe without a listener', () => {
    renderHook(() => useListener(eventType, element));

    expect(element.on).toHaveBeenCalledTimes(0);
  });

  test('should subscribe with a listener', () => {
    const listener = jest.fn();

    renderHook(() => useListener(eventType, element, listener));

    expect(element.on).toHaveBeenCalledTimes(1);
    expect(element.on).toHaveBeenCalledWith(eventType, listener);
  });

  test('should unsubscribe previous listeners when it changes', () => {
    const firstListener = jest.fn();
    const secondListener = jest.fn();

    const { rerender } = renderHook(
      ({ listener }) => useListener(eventType, element, listener),
      {
        initialProps: {
          listener: firstListener,
        },
      }
    );

    expect(element.on).toHaveBeenCalledTimes(1);
    expect(element.on).toHaveBeenLastCalledWith(eventType, firstListener);

    rerender({
      listener: undefined as unknown as jest.Mock,
    });

    expect(unsubscribe).toHaveBeenCalledTimes(1);

    rerender({
      listener: secondListener,
    });
    expect(element.on).toHaveBeenCalledTimes(2);
    expect(element.on).toHaveBeenLastCalledWith(eventType, secondListener);
  });
});
