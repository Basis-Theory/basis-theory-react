import React, { FC, ForwardedRef } from 'react';
import type {
  CardNumberElement as ICardNumberElement,
  CardNumberElementEvents,
  CreateCardNumberElementOptions,
  ElementEventListener,
  ElementStyle,
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
  'aria-label'?: string;
  placeholder?: string;
  iconPosition?: SanitizedElementOptions['iconPosition'];
  onChange?: ElementEventListener<CardNumberElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardNumberElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardNumberElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardNumberElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<CardNumberElementEvents, 'keydown'>;
  /**
   * Element ref
   */
  ref?: ForwardedRef<ICardNumberElement>;
}

const CardNumberElementC: FC<CardNumberElementProps> = ({
  id,
  bt,
  style,
  disabled,
  'aria-label': ariaLabel,
  placeholder,
  iconPosition,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  ref,
}) => {
  const element = useElement<
    ICardNumberElement,
    CreateCardNumberElementOptions
  >(
    id,
    'cardNumber',
    {
      targetId: id,
      style,
      disabled,
      'aria-label': ariaLabel,
      placeholder,
      iconPosition,
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

export const CardNumberElement = React.forwardRef<
  ICardNumberElement,
  CardNumberElementProps
>((props, ref) => <CardNumberElementC {...props} ref={ref} />);

export type { CardNumberElementProps };
