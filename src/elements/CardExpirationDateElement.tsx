import React, { FC } from 'react';
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

export interface CardExpirationDateElementProps {
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
}

export const CardExpirationDateElement: FC<CardExpirationDateElementProps> = ({
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
    bt
  );

  useListener('ready', element, onReady);
  useListener('change', element, onChange);
  useListener('focus', element, onFocus);
  useListener('blur', element, onBlur);
  useListener('keydown', element, onKeyDown);

  return <div id={id} />;
};
