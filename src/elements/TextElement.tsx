import React, { FC, useRef, ForwardedRef, MutableRefObject } from 'react';
import type {
  TextElement as ITextElement,
  CreateTextElementOptions,
  ElementEventListener,
  ElementStyle,
  TextElementEvents,
  InputMode,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheoryReact } from '../core';
import { useElement } from './useElement';
import { useListener } from './useListener';

interface BaseTextElementProps {
  id: string;
  bt?: BasisTheoryReact;
  style?: ElementStyle;
  disabled?: boolean;
  readOnly?: boolean;
  inputMode?: `${InputMode}`;
  autoComplete?: 'on' | 'off';
  valueRef?: MutableRefObject<ITextElement>;
  'aria-label'?: string;
  placeholder?: string;
  transform?: RegExp | [RegExp, string?];
  value?: string;
  validation?: RegExp;
  onChange?: ElementEventListener<TextElementEvents, 'change'>;
  onFocus?: ElementEventListener<TextElementEvents, 'focus'>;
  onBlur?: ElementEventListener<TextElementEvents, 'blur'>;
  onReady?: ElementEventListener<TextElementEvents, 'ready'>;
  onKeyDown?: ElementEventListener<TextElementEvents, 'keydown'>;
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

const TextElementC: FC<
  TextElementProps & { elementRef?: ForwardedRef<ITextElement> }
> = ({
  id,
  bt,
  style,
  disabled,
  readOnly,
  inputMode,
  autoComplete,
  'aria-label': ariaLabel,
  placeholder,
  transform,
  mask,
  password,
  value,
  validation,
  onReady,
  onChange,
  onFocus,
  valueRef,
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
      readOnly,
      inputMode,
      autoComplete,
      'aria-label': ariaLabel,
      mask,
      password,
      placeholder,
      transform,
      value,
      validation,
    },
    bt,
    elementRef
  );

  if (valueRef) {
    element?.setValueRef(valueRef.current);
  }

  useListener('ready', element, onReady);
  useListener('change', element, onChange);
  useListener('focus', element, onFocus);
  useListener('blur', element, onBlur);
  useListener('keydown', element, onKeyDown);

  return <div id={id} ref={wrapperRef} />;
};

export const TextElement = React.forwardRef<ITextElement, TextElementProps>(
  // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
  function TextElement(props, ref) {
    return <TextElementC {...props} elementRef={ref} />;
  }
);

export type { TextElementProps };
