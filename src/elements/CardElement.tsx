import React, { FC, useEffect, useState } from 'react';
import type {
  CardElement as Element,
  UpdateCardElementOptions,
  ElementEventListener,
} from '@basis-theory/basis-theory-elements-interfaces/elements';
import { useSuperElements } from './Elements';

interface Props {
  id: string;
  onChange?: ElementEventListener<'change'>;
  onFocus?: ElementEventListener<'focus'>;
  onBlur?: ElementEventListener<'blur'>;
  onReady?: ElementEventListener<'ready'>;
  onKeyDown?: ElementEventListener<'keydown'>;
  options?: UpdateCardElementOptions;
}

export const CardElement: FC<Props> = ({
  id,
  onChange,
  onFocus,
  onBlur,
  onReady,
  onKeyDown,
  options,
}) => {
  const { elements, indexElement, disposeElement } = useSuperElements();
  const [element, setElement] = useState<Element>();

  useEffect(() => {
    if (elements && !element) {
      const card = elements.create('card', options);

      if (onChange) {
        card.on('change', onChange);
      }

      if (onBlur) {
        card.on('blur', onBlur);
      }

      if (onFocus) {
        card.on('focus', onFocus);
      }

      if (onReady) {
        card.on('ready', onReady);
      }

      if (onKeyDown) {
        card.on('keydown', onKeyDown);
      }

      card.mount(`#${id}`);
      setElement(card);
      indexElement(id, card);
    }

    return (): void => {
      if (element?.mounted) {
        element.unmount();
        disposeElement(id);
        setElement(undefined);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements, id, element]);

  useEffect(() => {
    if (options && element?.mounted) {
      element.update(options);
    }
  }, [options, element]);

  return <div id={id} />;
};
