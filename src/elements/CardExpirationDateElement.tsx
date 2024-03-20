import React, { FC, ForwardedRef, RefObject, useRef } from 'react';
import type {
  CardExpirationDateElement as ICardExpirationDateElement,
  CreateCardExpirationDateElementOptions,
  ElementEventListener,
  ElementStyle,
  CardExpirationDateElementEvents,
  CardExpirationDateValue,
  InputMode,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardExpirationDateElementProps {
  'aria-label'?: string;
  autoComplete?: 'on' | 'off';
  bt?: BasisTheoryReact;
  disabled?: boolean;
  enableCopy?: boolean;
  id: string;
  inputMode?: `${InputMode}`;
  onBlur?: ElementEventListener<CardExpirationDateElementEvents, 'blur'>;
  onChange?: ElementEventListener<CardExpirationDateElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardExpirationDateElementEvents, 'focus'>;
  onKeyDown?: ElementEventListener<CardExpirationDateElementEvents, 'keydown'>;
  onReady?: ElementEventListener<CardExpirationDateElementEvents, 'ready'>;
  placeholder?: string;
  readOnly?: boolean;
  style?: ElementStyle;
  validateOnChange?: boolean;
  value?: CardExpirationDateValue<'static'> | string;
  valueRef?: RefObject<ICardExpirationDateElement>;
}

const CardExpirationDateElementC: FC<
  CardExpirationDateElementProps & {
    elementRef?: ForwardedRef<ICardExpirationDateElement>;
  }
> = ({
  'aria-label': ariaLabel,
  autoComplete,
  bt,
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
    ICardExpirationDateElement,
    CreateCardExpirationDateElementOptions
  >(
    id,
    'cardExpirationDate',
    wrapperRef,
    {
      'aria-label': ariaLabel,
      autoComplete,
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
    elementRef
  );

  if (valueRef?.current) {
    element?.setValueRef(valueRef.current);
  }

  useListener('ready', element, onReady);
  useListener('change', element, onChange);
  useListener('focus', element, onFocus);
  useListener('blur', element, onBlur);
  useListener('keydown', element, onKeyDown);

  return <div id={id} ref={wrapperRef} />;
};

export const CardExpirationDateElement = React.forwardRef<
  ICardExpirationDateElement,
  CardExpirationDateElementProps
  // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
>(function CardExpirationDateElement(props, ref) {
  return <CardExpirationDateElementC {...props} elementRef={ref} />;
});

export type { CardExpirationDateElementProps };
