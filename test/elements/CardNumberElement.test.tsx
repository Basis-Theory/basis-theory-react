import * as React from 'react';
import type {
  CardNumberElement as ICardNumberElement,
  ElementStyle,
  CreateCardNumberElementOptions,
} from '@basis-theory/basis-theory-js/types/elements';
import { render } from '@testing-library/react';
import { Chance } from 'chance';
import { CardNumberElement } from '../../src';
import { useElement } from '../../src/elements/useElement';
import { useListener } from '../../src/elements/useListener';

jest.mock('../../src/elements/useElement');
jest.mock('../../src/elements/useListener');

describe('CardNumberElement', () => {
  const chance = new Chance();
  const refArray = [React.createRef<ICardNumberElement>(), undefined];

  let id: string;
  let wrapperDiv: HTMLDivElement;
  let style: ElementStyle;
  let disabled: boolean;
  let autoComplete: 'on' | 'off';
  let ariaLabel: string;
  let placeholder: string;
  let iconPosition: CreateCardNumberElementOptions['iconPosition'];
  let onReady: jest.Mock;
  let onChange: jest.Mock;
  let onFocus: jest.Mock;
  let onBlur: jest.Mock;
  let onKeyDown: jest.Mock;
  let element: unknown;
  let ref: any;

  beforeEach(() => {
    id = 'my-card-number';
    wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('id', id);
    style = {
      [chance.string()]: chance.string(),
    };
    disabled = chance.bool();
    autoComplete = chance.pickone(['on', 'off']);
    ariaLabel = chance.string();
    placeholder = chance.string();
    iconPosition = chance.pickone(['left', 'right', 'none', undefined]);

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
      <CardNumberElement
        aria-label={ariaLabel}
        autoComplete={autoComplete}
        disabled={disabled}
        iconPosition={iconPosition}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onReady={onReady}
        placeholder={placeholder}
        ref={ref}
        style={style}
      />
    );

    expect(container).toMatchSnapshot();
    expect(useElement).toHaveBeenCalledWith(
      id,
      'cardNumber',
      { current: wrapperDiv },
      {
        targetId: id,
        style,
        disabled,
        autoComplete,
        'aria-label': ariaLabel,
        placeholder,
        iconPosition,
      },
      undefined,
      // eslint-disable-next-line unicorn/no-null
      typeof ref === 'undefined' ? null : ref // undefined ref gets forwarded as null
    );
    expect(useListener).toHaveBeenCalledWith('ready', element, onReady);
    expect(useListener).toHaveBeenCalledWith('change', element, onChange);
    expect(useListener).toHaveBeenCalledWith('focus', element, onFocus);
    expect(useListener).toHaveBeenCalledWith('blur', element, onBlur);
    expect(useListener).toHaveBeenCalledWith('keydown', element, onKeyDown);
  });
});
