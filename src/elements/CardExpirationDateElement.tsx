import React, { FC, ForwardedRef, MutableRefObject, useRef } from 'react';
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
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  readOnly?: boolean;
  inputMode?: `${InputMode}`;
  autoComplete?: 'on' | 'off';
  'aria-label'?: string;
  placeholder?: string;
  value?: CardExpirationDateValue<'static'> | string;
  onChange?: ElementEventListener<CardExpirationDateElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardExpirationDateElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardExpirationDateElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardExpirationDateElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<CardExpirationDateElementEvents, 'keydown'>;
  validateOnChange?: boolean;
  enableCopy?: boolean;
  valueRef?: MutableRefObject<ICardExpirationDateElement>;
}

const CardExpirationDateElementC: FC<
  CardExpirationDateElementProps & {
    elementRef?: ForwardedRef<ICardExpirationDateElement>;
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
  value,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  elementRef,
  validateOnChange,
  enableCopy,
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
      targetId: id,
      enableCopy,
      style,
      disabled,
      readOnly,
      inputMode,
      autoComplete,
      'aria-label': ariaLabel,
      placeholder,
      value,
      validateOnChange,
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

export const CardExpirationDateElement = React.forwardRef<
  ICardExpirationDateElement,
  CardExpirationDateElementProps
  // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
>(function CardExpirationDateElement(props, ref) {
  return <CardExpirationDateElementC {...props} elementRef={ref} />;
});

export type { CardExpirationDateElementProps };
