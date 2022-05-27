import React, { FC, ForwardedRef } from 'react';
import type {
  Brand,
  CardVerificationCodeElement as ICardVerificationCodeElement,
  CardVerificationCodeElementEvents,
  CreateCardVerificationCodeElementOptions,
  ElementEventListener,
  ElementStyle,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardVerificationCodeElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  'aria-label'?: string;
  placeholder?: string;
  cardBrand?: Brand;
  onChange?: ElementEventListener<CardVerificationCodeElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardVerificationCodeElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardVerificationCodeElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardVerificationCodeElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<
    CardVerificationCodeElementEvents,
    'keydown'
  >;
  /**
   * Container ref
   */
  ref?: ForwardedRef<HTMLDivElement>;
  /**
   * Underlying element ref
   */
  elementRef?: ForwardedRef<ICardVerificationCodeElement>;
}

const CardVerificationCodeElementC: FC<CardVerificationCodeElementProps> = ({
  id,
  bt,
  style,
  disabled,
  'aria-label': ariaLabel,
  placeholder,
  cardBrand,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  ref,
  elementRef,
}) => {
  const element = useElement<
    ICardVerificationCodeElement,
    CreateCardVerificationCodeElementOptions
  >(
    id,
    'cardVerificationCode',
    {
      targetId: id,
      style,
      disabled,
      'aria-label': ariaLabel,
      placeholder,
      cardBrand,
    },
    bt,
    elementRef
  );

  useListener('ready', element, onReady);
  useListener('change', element, onChange);
  useListener('focus', element, onFocus);
  useListener('blur', element, onBlur);
  useListener('keydown', element, onKeyDown);

  return <div id={id} ref={ref} />;
};

export const CardVerificationCodeElement = React.forwardRef<
  HTMLDivElement,
  CardVerificationCodeElementProps
>((props, ref) => <CardVerificationCodeElementC {...props} ref={ref} />);

export type { CardVerificationCodeElementProps };
