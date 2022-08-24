import * as React from 'react';
import type {
  TextElement as ITextElement,
  ElementStyle,
} from '@basis-theory/basis-theory-js/types/elements';
import { render } from '@testing-library/react';
import { Chance } from 'chance';
import { TextElement } from '../../src';
import { useElement } from '../../src/elements/useElement';
import { useListener } from '../../src/elements/useListener';

jest.mock('../../src/elements/useElement');
jest.mock('../../src/elements/useListener');

describe('TextElement', () => {
  const chance = new Chance();
  const refArray = [
    React.createRef<ITextElement>(),
    (element: any): void => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const test = element;
    },
    // eslint-disable-next-line unicorn/no-null
    null,
    undefined,
  ];

  let id: string;
  let wrapperDiv: HTMLDivElement;
  let style: ElementStyle;
  let disabled: boolean;
  let autoComplete: string;
  let ariaLabel: string;
  let password: boolean;
  let mask: (RegExp | string)[];
  let placeholder: string;
  let transform: RegExp;
  let onReady: jest.Mock;
  let onChange: jest.Mock;
  let onFocus: jest.Mock;
  let onBlur: jest.Mock;
  let onKeyDown: jest.Mock;
  let element: unknown;
  let ref: any;

  beforeEach(() => {
    id = 'my-input';
    wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('id', id);
    style = {
      [chance.string()]: chance.string(),
    };
    disabled = chance.bool();
    autoComplete = chance.pickone(['on', 'off']);
    ariaLabel = chance.string();
    password = chance.bool();
    mask = chance.pickset(
      [/\d/u, '-'],
      chance.integer({
        min: 1,
        max: 10,
      })
    );
    placeholder = chance.string();
    transform = chance.pickone([/\d/u, /./u]);

    onReady = jest.fn();
    onChange = jest.fn();
    onFocus = jest.fn();
    onBlur = jest.fn();
    onKeyDown = jest.fn();
    element = {
      [chance.string()]: chance.string(),
    };
    ref = chance.pickone(refArray);

    jest.mocked(useElement).mockReturnValue(element as any);
  });

  test('should match snapshot and call lifecycle hook properly', () => {
    const { container } = render(
      <TextElement
        aria-label={ariaLabel}
        autoComplete={autoComplete}
        disabled={disabled}
        id={id}
        mask={mask as never} // the need of this cast acts a props typings test :-)
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onReady={onReady}
        password={password}
        placeholder={placeholder}
        ref={ref}
        style={style}
        transform={transform}
      />
    );

    expect(container).toMatchSnapshot();
    expect(useElement).toHaveBeenCalledWith(
      id,
      'text',
      { current: wrapperDiv },
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
      undefined,
      ref
    );
    expect(useListener).toHaveBeenCalledWith('ready', element, onReady);
    expect(useListener).toHaveBeenCalledWith('change', element, onChange);
    expect(useListener).toHaveBeenCalledWith('focus', element, onFocus);
    expect(useListener).toHaveBeenCalledWith('blur', element, onBlur);
    expect(useListener).toHaveBeenCalledWith('keydown', element, onKeyDown);
  });
});
