import React, { FC, useRef, ForwardedRef } from 'react';
import type {
  CardElement as ICardElement,
  CreateCardElementOptions,
  CardElementEvents,
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
  autoComplete?: string;
  onChange?: ElementEventListener<CardElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<CardElementEvents, 'keydown'>;
  elementRef?: ForwardedRef<ICardElement>;
}

const CardElementC: FC<CardElementProps> = ({
  id,
  bt,
  style,
  disabled,
  autoComplete,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  elementRef,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useElement<ICardElement, CreateCardElementOptions>(
    id,
    'card',
    wrapperRef,
    {
      style,
      disabled,
      autoComplete,
    },
    bt,
    elementRef
  );

  useListener('ready', element, onReady);
  useListener('change', element, onChange);
  useListener('focus', element, onFocus);
  useListener('blur', element, onBlur);
  useListener('keydown', element, onKeyDown);

  return <div id={id} ref={wrapperRef} />;
};

export const CardElement = React.forwardRef<ICardElement, CardElementProps>(
  (props, ref) => <CardElementC {...props} elementRef={ref} />
);

export type { CardElementProps };
