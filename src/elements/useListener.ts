import { useEffect } from 'react';
import type {
  BaseElement,
  ElementEventListener,
  EventType,
  Subscription,
} from '@basis-theory/basis-theory-js/types/elements';

const useListener = <
  T extends EventType,
  Ev,
  E extends BaseElement<unknown, Ev>
>(
  eventType: T,
  element?: E,
  listener?: ElementEventListener<Ev, T>
): void =>
  useEffect(() => {
    let subscription: Subscription;

    if (element && listener) {
      subscription = element.on(eventType, listener);
    }

    return () => subscription?.unsubscribe();
    // we shouldn't run this effect when eventType changes
    // which would turn out to be a different listener
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, listener]);

export { useListener };
