import React, { FC, useRef, ForwardedRef } from 'react';
import {
  CardElement as ICardElement,
  CardElementEvents,
  CardElementPlaceholder,
  CardElementValue,
  CopyIconStyles,
  CreateCardElementOptions,
  CreditCardType,
  ElementEventListener,
  ElementStyle,
  InputMode,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardElementProps {
  autoComplete?: CreateCardElementOptions['autoComplete'];
  bt?: BasisTheoryReact;
  cardTypes?: CreditCardType[];
  copyIconStyles?: CopyIconStyles;
  disabled?: boolean;
  enableCopy?: boolean;
  id: string;
  inputMode?: `${InputMode}`;
  onBlur?: ElementEventListener<CardElementEvents, 'blur'>;
  onChange?: ElementEventListener<CardElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardElementEvents, 'focus'>;
  onKeyDown?: ElementEventListener<CardElementEvents, 'keydown'>;
  onReady?: ElementEventListener<CardElementEvents, 'ready'>;
  placeholder?: CardElementPlaceholder;
  readOnly?: boolean;
  skipLuhnValidation?: boolean;
  style?: ElementStyle;
  validateOnChange?: boolean;
  value?: CardElementValue<'static'>;
}

const CardElementC: FC<
  CardElementProps & { elementRef?: ForwardedRef<ICardElement> }
> = ({
  autoComplete,
  bt,
  cardTypes,
  copyIconStyles,
  disabled,
  elementRef,
  enableCopy,
  id,
  inputMode,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onReady,
  placeholder,
  readOnly,
  skipLuhnValidation,
  style,
  validateOnChange,
  value,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useElement<ICardElement, CreateCardElementOptions>(
    id,
    'card',
    wrapperRef,
    {
      autoComplete,
      cardTypes,
      copyIconStyles,
      disabled,
      enableCopy,
      inputMode,
      placeholder,
      readOnly,
      skipLuhnValidation,
      style,
      validateOnChange,
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
