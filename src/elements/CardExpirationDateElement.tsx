import React, { FC, ForwardedRef } from 'react';
import type {
  CardExpirationDateElement as ICardExpirationDateElement,
  CardExpirationDateElementEvents,
  CreateCardExpirationDateElementOptions,
  ElementEventListener,
  ElementStyle,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardExpirationDateElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  'aria-label'?: string;
  placeholder?: string;
  onChange?: ElementEventListener<CardExpirationDateElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardExpirationDateElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardExpirationDateElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardExpirationDateElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<CardExpirationDateElementEvents, 'keydown'>;
  /**
   * Container ref
   */
  ref?: ForwardedRef<HTMLDivElement>;
  /**
   * Underlying element ref
   */
  elementRef?: ForwardedRef<ICardExpirationDateElement>;
}

const CardExpirationDateElementC: FC<CardExpirationDateElementProps> = ({
  id,
  bt,
  style,
  disabled,
  'aria-label': ariaLabel,
  placeholder,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  ref,
  elementRef,
}) => {
  const element = useElement<
    ICardExpirationDateElement,
    CreateCardExpirationDateElementOptions
  >(
    id,
    'cardExpirationDate',
    {
      targetId: id,
      style,
      disabled,
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

  return <div id={id} ref={ref} />;
};

export const CardExpirationDateElement = React.forwardRef<
  HTMLDivElement,
  CardExpirationDateElementProps
>((props, ref) => <CardExpirationDateElementC {...props} ref={ref} />);

export type { CardExpirationDateElementProps };
