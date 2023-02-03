import React, { FC, useRef, ForwardedRef } from 'react';
import type {
  CardVerificationCodeElement as ICardVerificationCodeElement,
  CreateCardVerificationCodeElementOptions,
  ElementEventListener,
  ElementStyle,
  CardVerificationCodeElementEvents,
  Brand,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardVerificationCodeElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  'aria-label'?: string;
  placeholder?: string;
  cardBrand?: Brand | string;
  value?: string;
  onChange?: ElementEventListener<CardVerificationCodeElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardVerificationCodeElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardVerificationCodeElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardVerificationCodeElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<
    CardVerificationCodeElementEvents,
    'keydown'
  >;
  validateOnChange?: boolean;
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
  autoComplete,
  'aria-label': ariaLabel,
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
      autoComplete,
      'aria-label': ariaLabel,
      placeholder,
      cardBrand,
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

export const CardVerificationCodeElement = React.forwardRef<
  ICardVerificationCodeElement,
  CardVerificationCodeElementProps
  // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
>(function CardVerificationCodeElement(props, ref) {
  return <CardVerificationCodeElementC {...props} elementRef={ref} />;
});

export type { CardVerificationCodeElementProps };
