import React, { FC, useRef } from 'react';
import type {
  CardElement as ICardElement,
  CreateCardElementOptions,
  CardElementEvents,
  ElementEventListener,
  ElementStyle,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

export interface CardElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  autoComplete?: string;
  onChange?: ElementEventListener<CardElementEvents, 'change'>;
  onFocus?: ElementEventListener<CardElementEvents, 'focus'>;
  onBlur?: ElementEventListener<CardElementEvents, 'blur'>;
  onReady?: ElementEventListener<CardElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<CardElementEvents, 'keydown'>;
}

export const CardElement: FC<CardElementProps> = ({
  id,
  bt,
  style,
  disabled,
  autoComplete,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useElement<ICardElement, CreateCardElementOptions>(
    id,
    'card',
    wrapperRef,
    {
      style,
      disabled,
      autoComplete,
    },
    bt
  );

  useListener('ready', element, onReady);
  useListener('change', element, onChange);
  useListener('focus', element, onFocus);
  useListener('blur', element, onBlur);
  useListener('keydown', element, onKeyDown);

  return <div id={id} ref={wrapperRef} />;
};
