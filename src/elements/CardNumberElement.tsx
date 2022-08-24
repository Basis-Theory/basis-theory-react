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
  autoComplete?: string;
  'aria-label'?: string;
  placeholder?: string;
  iconPosition?: SanitizedElementOptions['iconPosition'];
  onChange?: ElementEventListener<CardNumberElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardNumberElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardNumberElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardNumberElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<CardNumberElementEvents, 'keydown'>;
  elementRef?: ForwardedRef<ICardNumberElement>;
}

const CardNumberElementC: FC<CardNumberElementProps> = ({
  id,
  bt,
  style,
  disabled,
  autoComplete,
  'aria-label': ariaLabel,
  placeholder,
  iconPosition,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  elementRef,
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

const CardNumberElement = React.forwardRef<
  ICardNumberElement,
  CardNumberElementProps
>((props, ref) => <CardNumberElementC {...props} elementRef={ref} />);

CardNumberElement.displayName = 'CardNumberElement';

export { CardNumberElement };

export type { CardNumberElementProps };
