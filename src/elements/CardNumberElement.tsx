import React, { FC, useRef, ForwardedRef } from 'react';
import type {
  CardNumberElement as ICardNumberElement,
  CreateCardNumberElementOptions,
  ElementEventListener,
  ElementStyle,
  CardNumberElementEvents,
  SanitizedElementOptions,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardNumberElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  'aria-label'?: string;
  placeholder?: string;
  iconPosition?: SanitizedElementOptions['iconPosition'];
  value?: string;
  onChange?: ElementEventListener<CardNumberElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardNumberElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardNumberElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardNumberElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<CardNumberElementEvents, 'keydown'>;
  validateOnChange?: boolean;
}

const CardNumberElementC: FC<
  CardNumberElementProps & { elementRef?: ForwardedRef<ICardNumberElement> }
> = ({
  id,
  bt,
  style,
  disabled,
  autoComplete,
  'aria-label': ariaLabel,
  placeholder,
  iconPosition,
  value,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  elementRef,
  validateOnChange,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useElement<
    ICardNumberElement,
    CreateCardNumberElementOptions
  >(
    id,
    'cardNumber',
    wrapperRef,
    {
      targetId: id,
      style,
      disabled,
      autoComplete,
      'aria-label': ariaLabel,
      placeholder,
      iconPosition,
      value,
      validateOnChange,
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

export const CardNumberElement = React.forwardRef<
  ICardNumberElement,
  CardNumberElementProps
  // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
>(function CardNumberElement(props, ref) {
  return <CardNumberElementC {...props} elementRef={ref} />;
});

export type { CardNumberElementProps };
