import React, { FC } from 'react';
import type {
  TextElement as ITextElement,
  CreateTextElementOptions,
  ElementEventListener,
  ElementStyle,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface BaseTextElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  'aria-label'?: string;
  placeholder?: string;
  transform?: RegExp | [RegExp, string?];
  onChange?: ElementEventListener<'change'>;
  onFocus?: ElementEventListener<'focus'>;
  onBlur?: ElementEventListener<'blur'>;
  onReady?: ElementEventListener<'ready'>;
  onKeyDown?: ElementEventListener<'keydown'>;
}

interface MaskedTextElementProps extends BaseTextElementProps {
  mask?: (RegExp | string)[];
  password?: false;
}

interface PasswordTextElementProps extends BaseTextElementProps {
  mask?: never;
  password: true;
}

type TextElementProps = MaskedTextElementProps | PasswordTextElementProps;

export const TextElement: FC<TextElementProps> = ({
  id,
  bt,
  style,
  disabled,
  'aria-label': ariaLabel,
  placeholder,
  transform,
  mask,
  password,
  onReady,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const element = useElement<ITextElement, CreateTextElementOptions>(
    id,
    'text',
    {
      targetId: id,
      style,
      disabled,
      'aria-label': ariaLabel,
      mask,
      password,
      placeholder,
      transform,
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
