import React, { FC, useRef, ForwardedRef, MutableRefObject } from 'react';
import type {
  CardVerificationCodeElement as ICardVerificationCodeElement,
  CreateCardVerificationCodeElementOptions,
  ElementEventListener,
  ElementStyle,
  CardVerificationCodeElementEvents,
  Brand,
  InputMode,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardVerificationCodeElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: 'on' | 'off';
  'aria-label'?: string;
  placeholder?: string;
  cardBrand?: Brand | string;
  inputMode?: `${InputMode}`;
  value?: string;
  valueRef?: MutableRefObject<ICardVerificationCodeElement>;
  onChange?: ElementEventListener<CardVerificationCodeElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardVerificationCodeElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardVerificationCodeElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardVerificationCodeElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<
    CardVerificationCodeElementEvents,
    'keydown'
  >;
  validateOnChange?: boolean;
  enableCopy?: boolean;
}

const CardVerificationCodeElementC: FC<
  CardVerificationCodeElementProps & {
    elementRef?: ForwardedRef<ICardVerificationCodeElement>;
  }
> = ({
  id,
  bt,
  style,
  disabled,
  readOnly,
  autoComplete,
  'aria-label': ariaLabel,
  inputMode,
  placeholder,
  cardBrand,
  value,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  elementRef,
  validateOnChange,
  valueRef,
  enableCopy,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useElement<
    ICardVerificationCodeElement,
    CreateCardVerificationCodeElementOptions
  >(
    id,
    'cardVerificationCode',
    wrapperRef,
    {
      targetId: id,
      style,
      disabled,
      readOnly,
      autoComplete,
      inputMode,
      'aria-label': ariaLabel,
      placeholder,
      cardBrand,
      value,
      validateOnChange,
      enableCopy,
    },
    bt,
    elementRef
  );

  if (valueRef) {
    element?.setValueRef(valueRef.current);
  }

  useListener('ready', element, onReady);
  useListener('change', element, onChange);
  useListener('focus', element, onFocus);
  useListener('blur', element, onBlur);
  useListener('keydown', element, onKeyDown);

  return <div id={id} ref={wrapperRef} />;
};

export const CardVerificationCodeElement = React.forwardRef<
  ICardVerificationCodeElement,
  CardVerificationCodeElementProps
  // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
>(function CardVerificationCodeElement(props, ref) {
  return <CardVerificationCodeElementC {...props} elementRef={ref} />;
});

export type { CardVerificationCodeElementProps };
