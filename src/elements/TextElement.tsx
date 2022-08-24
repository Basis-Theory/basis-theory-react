import React, { FC, useRef, ForwardedRef } from 'react';
import type {
  TextElement as ITextElement,
  CreateTextElementOptions,
  ElementEventListener,
  ElementStyle,
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
  autoComplete?: string;
  'aria-label'?: string;
  placeholder?: string;
  transform?: RegExp | [RegExp, string?];
  onChange?: ElementEventListener<TextElementEvents, 'change'>;
  onFocus?: ElementEventListener<TextElementEvents, 'focus'>;
  onBlur?: ElementEventListener<TextElementEvents, 'blur'>;
  onReady?: ElementEventListener<TextElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<TextElementEvents, 'keydown'>;
  elementRef?: ForwardedRef<ITextElement>;
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
  autoComplete,
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
  elementRef,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useElement<ITextElement, CreateTextElementOptions>(
    id,
    'text',
    wrapperRef,
    {
      targetId: id,
      style,
      disabled,
      autoComplete,
      'aria-label': ariaLabel,
      mask,
      password,
      placeholder,
      transform,
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

export const TextElement = React.forwardRef<ITextElement, TextElementProps>(
  (props, ref) => <TextElementC {...props} elementRef={ref} />
);

export type { TextElementProps };
