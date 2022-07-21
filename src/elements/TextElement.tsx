import React, { FC, ForwardedRef } from 'react';
import type {
  CreateTextElementOptions,
  ElementEventListener,
  ElementStyle,
  TextElement as ITextElement,
  TextElementEvents,
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
  onChange?: ElementEventListener<TextElementEvents, 'change'>;
  onFocus?: ElementEventListener<TextElementEvents, 'focus'>;
  onBlur?: ElementEventListener<TextElementEvents, 'blur'>;
  onReady?: ElementEventListener<TextElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<TextElementEvents, 'keydown'>;
  /**
   * Element ref
   */
  ref?: ForwardedRef<ITextElement>;
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

const TextElementC: FC<TextElementProps> = ({
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
  ref,
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

export const TextElement = React.forwardRef<ITextElement, TextElementProps>(
  (props, ref) => <TextElementC {...props} ref={ref} />
);

export type { TextElementProps };
