import React, { FC, useRef, ForwardedRef } from 'react';
import type {
  CardElement as ICardElement,
  CreateCardElementOptions,
  CardElementEvents,
  ElementEventListener,
  ElementStyle,
  CardElementValue,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  value?: CardElementValue<'static'>;
  onChange?: ElementEventListener<CardElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<CardElementEvents, 'keydown'>;
  validateOnChange?: boolean;
  enableCopy?: boolean;
}

const CardElementC: FC<
  CardElementProps & { elementRef?: ForwardedRef<ICardElement> }
> = ({
  id,
  bt,
  style,
  disabled,
  autoComplete,
  value,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  elementRef,
  validateOnChange,
  enableCopy,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useElement<ICardElement, CreateCardElementOptions>(
    id,
    'card',
    wrapperRef,
    {
      enableCopy,
      validateOnChange,
      style,
      disabled,
      autoComplete,
      value,
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
  // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
  function CardElement(props, ref) {
    return <CardElementC {...props} elementRef={ref} />;
  }
);

export type { CardElementProps };
