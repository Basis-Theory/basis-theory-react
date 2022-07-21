import React, { FC, ForwardedRef } from 'react';
import type {
  CardElement as ICardElement,
  CardElementEvents,
  CreateCardElementOptions,
  ElementEventListener,
  ElementStyle,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  onChange?: ElementEventListener<CardElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<CardElementEvents, 'keydown'>;
  /**
   * Element ref
   */
  ref?: ForwardedRef<ICardElement>;
}

const CardElementC: FC<CardElementProps> = ({
  id,
  bt,
  style,
  disabled,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  ref,
}) => {
  const element = useElement<ICardElement, CreateCardElementOptions>(
    id,
    'card',
    {
      style,
      disabled,
    },
    bt,
    ref
  );

  useListener('ready', element, onReady);
  useListener('change', element, onChange);
  useListener('focus', element, onFocus);
  useListener('blur', element, onBlur);
  useListener('keydown', element, onKeyDown);

  return <div id={id} />;
};

export const CardElement = React.forwardRef<ICardElement, CardElementProps>(
  (props, ref) => <CardElementC {...props} ref={ref} />
);

export type { CardElementProps };
