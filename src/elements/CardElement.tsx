import React, { FC, useEffect, useState } from 'react';
import type {
  BaseElement,
  BasisTheoryElements,
  CardElement as ICardElement,
  ElementEventListener,
  ElementStyle,
  EventType,
  Subscription,
} from '@basis-theory/basis-theory-elements-interfaces/elements';
import { useBasisTheory } from '../core';
import type { BasisTheoryReact, ElementMapper } from '../core/types';

interface CardElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  onChange?: ElementEventListener<'change'>;
  onFocus?: ElementEventListener<'focus'>;
  onBlur?: ElementEventListener<'blur'>;
  onReady?: ElementEventListener<'ready'>;
  onKeyDown?: ElementEventListener<'keydown'>;
}

const useListener = <T extends EventType, E extends BaseElement<unknown>>(
  eventType: T,
  element?: E,
  listener?: ElementEventListener<T>
): void =>
  useEffect(() => {
    let subscription: Subscription;

    if (element && listener) {
      subscription = element.on(eventType, listener);
    }

    return () => subscription?.unsubscribe();
  }, [element, eventType, listener]);

export const CardElement: FC<CardElementProps> = ({
  id,
  bt: btFromProps,
  style,
  disabled,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const { bt: btFromContext } = useBasisTheory();
  const [element, setElement] = useState<ICardElement>();

  const bt = (btFromProps || btFromContext) as
    | (BasisTheoryElements & ElementMapper)
    | undefined;

  useEffect(() => {
    if (bt && !element) {
      const card = bt.createElement('card', {
        style,
        disabled,
      });

      card.mount(`#${id}`);
      setElement(card);
      bt.indexElement(id, card);
    }

    return (): void => {
      if (element?.mounted) {
        element.unmount();
        bt?.disposeElement(id);
        setElement(undefined);
      }
    };
  }, [bt, id, element, style, disabled]);

  useListener('ready', element, onReady);
  useListener('change', element, onChange);
  useListener('focus', element, onFocus);
  useListener('blur', element, onBlur);
  useListener('keydown', element, onKeyDown);

  useEffect(() => {
    if (element?.mounted) {
      element.update({
        style,
        disabled,
      });
    }
  }, [element, style, disabled]);

  return <div id={id} />;
};
