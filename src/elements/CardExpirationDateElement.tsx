import React, { FC } from 'react';
import type {
  CardExpirationDateElement as ICardExpirationDateElement,
  CreateCardExpirationDateElementOptions,
  ElementEventListener,
  ElementStyle,
  TextElementEvents,
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
  onChange?: ElementEventListener<TextElementEvents, 'change'>;
  onFocus?: ElementEventListener<TextElementEvents, 'focus'>;
  onBlur?: ElementEventListener<TextElementEvents, 'blur'>;
  onReady?: ElementEventListener<TextElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<TextElementEvents, 'keydown'>;
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
