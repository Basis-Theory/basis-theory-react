import React, { FC, ForwardedRef, useRef } from 'react';
import type {
  CardExpirationDateElement as ICardExpirationDateElement,
  CreateCardExpirationDateElementOptions,
  ElementEventListener,
  ElementStyle,
  CardExpirationDateElementEvents,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardExpirationDateElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  autoComplete?: string;
  'aria-label'?: string;
  placeholder?: string;
  onChange?: ElementEventListener<CardExpirationDateElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardExpirationDateElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardExpirationDateElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardExpirationDateElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<CardExpirationDateElementEvents, 'keydown'>;
  elementRef?: ForwardedRef<ICardExpirationDateElement>;
}

const CardExpirationDateElementC: FC<CardExpirationDateElementProps> = ({
  id,
  bt,
  style,
  disabled,
  autoComplete,
  'aria-label': ariaLabel,
  placeholder,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  elementRef,
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
      style,
      disabled,
      autoComplete,
      'aria-label': ariaLabel,
      placeholder,
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

const CardExpirationDateElement = React.forwardRef<
  ICardExpirationDateElement,
  CardExpirationDateElementProps
>((props, ref) => <CardExpirationDateElementC {...props} elementRef={ref} />);

CardExpirationDateElement.displayName = 'CardExpirationDateElement';

export { CardExpirationDateElement };

export type { CardExpirationDateElementProps };
