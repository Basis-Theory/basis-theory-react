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
   * Element ref
   */
  ref?: ForwardedRef<ICardExpirationDateElement>;
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
    ref
  );

  useListener('ready', element, onReady);
  useListener('change', element, onChange);
  useListener('focus', element, onFocus);
  useListener('blur', element, onBlur);
  useListener('keydown', element, onKeyDown);

  return <div id={id} />;
};

export const CardExpirationDateElement = React.forwardRef<
  ICardExpirationDateElement,
  CardExpirationDateElementProps
>((props, ref) => <CardExpirationDateElementC {...props} ref={ref} />);

export type { CardExpirationDateElementProps };
