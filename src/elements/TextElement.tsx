import React, { FC, useRef, ForwardedRef, RefObject } from 'react';
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
  'aria-label'?: string;
  autoComplete?: 'on' | 'off';
  bt?: BasisTheoryReact;
  disabled?: boolean;
  id: string;
  inputMode?: `${InputMode}`;
  onBlur?: ElementEventListener<TextElementEvents, 'blur'>;
  onChange?: ElementEventListener<TextElementEvents, 'change'>;
  onFocus?: ElementEventListener<TextElementEvents, 'focus'>;
  onKeyDown?: ElementEventListener<TextElementEvents, 'keydown'>;
  onReady?: ElementEventListener<TextElementEvents, 'ready'>;
  placeholder?: string;
  readOnly?: boolean;
  style?: ElementStyle;
  transform?: RegExp | [RegExp, string?];
  validation?: RegExp;
  value?: string;
  valueRef?: RefObject<ITextElement>;
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
  'aria-label': ariaLabel,
  autoComplete,
  bt,
  disabled,
  elementRef,
  id,
  inputMode,
  mask,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onReady,
  password,
  placeholder,
  readOnly,
  style,
  transform,
  validation,
  value,
  valueRef,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useElement<ITextElement, CreateTextElementOptions>(
    id,
    'text',
    wrapperRef,
    {
      'aria-label': ariaLabel,
      autoComplete,
      disabled,
      inputMode,
      mask,
      password,
      placeholder,
      readOnly,
      style,
      targetId: id,
      transform,
      validation,
      value,
    },
    bt,
    elementRef
  );

  if (valueRef?.current) {
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
