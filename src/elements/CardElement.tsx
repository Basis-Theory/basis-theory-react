import React, { FC } from 'react';
import type {
  CardElement as ICardElement,
  CreateCardElementOptions,
  ElementEventListener,
  ElementStyle,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface CardElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  onChange?: ElementEventListener<'change'>;
  onFocus?: ElementEventListener<'focus'>;
  onBlur?: ElementEventListener<'blur'>;
  onReady?: ElementEventListener<'ready'>;
  onKeyDown?: ElementEventListener<'keydown'>;
}

export const CardElement: FC<CardElementProps> = ({
  id,
  bt,
  style,
  disabled,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const element = useElement<ICardElement, CreateCardElementOptions>(
    id,
    'card',
    {
      style,
      disabled,
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
