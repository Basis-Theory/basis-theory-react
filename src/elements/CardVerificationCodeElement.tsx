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
  'aria-label'?: string;
  autoComplete?: 'on' | 'off';
  bt?: BasisTheoryReact;
  cardBrand?: Brand | string;
  disabled?: boolean;
  enableCopy?: boolean;
  id: string;
  inputMode?: `${InputMode}`;
  onBlur?: ElementEventListener<CardVerificationCodeElementEvents, 'blur'>;
  onChange?: ElementEventListener<CardVerificationCodeElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardVerificationCodeElementEvents, 'focus'>;
  onKeyDown?: ElementEventListener<
    CardVerificationCodeElementEvents,
    'keydown'
  >;
  onReady?: ElementEventListener<CardVerificationCodeElementEvents, 'ready'>;
  placeholder?: string;
  readOnly?: boolean;
  style?: ElementStyle;
  validateOnChange?: boolean;
  value?: string;
  valueRef?: MutableRefObject<ICardVerificationCodeElement | null>;
}

const CardVerificationCodeElementC: FC<
  CardVerificationCodeElementProps & {
    elementRef?: ForwardedRef<ICardVerificationCodeElement>;
  }
> = ({
  'aria-label': ariaLabel,
  autoComplete,
  bt,
  cardBrand,
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
  style,
  validateOnChange,
  value,
  valueRef,
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
      'aria-label': ariaLabel,
      autoComplete,
      cardBrand,
      disabled,
      enableCopy,
      inputMode,
      placeholder,
      readOnly,
      style,
      targetId: id,
      validateOnChange,
      value,
    },
    bt,
    elementRef,
    valueRef
  );

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
