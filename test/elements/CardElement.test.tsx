import * as React from 'react';
import type {
  CardElement as ICardElement,
  CardElementValue,
  ElementStyle,
  InputMode,
} from '@basis-theory/basis-theory-js/types/elements';
import { render } from '@testing-library/react';
import { Chance } from 'chance';
import { CardElement } from '../../src';
import { useElement } from '../../src/elements/useElement';
import { useListener } from '../../src/elements/useListener';

jest.mock('../../src/elements/useElement');
jest.mock('../../src/elements/useListener');

describe('CardElement', () => {
  const chance = new Chance();
  const refArray = [React.createRef<ICardElement>(), undefined];

  let id: string;
  let wrapperDiv: HTMLDivElement;
  let style: ElementStyle;
  let disabled: boolean;
  let autoComplete: 'on' | 'off';
  let inputMode: `${InputMode}`;
  let value: CardElementValue<'static'>;
  let validateOnChange: boolean;
  let enableCopy: boolean;
  let readOnly: boolean;
  let onReady: jest.Mock;
  let onChange: jest.Mock;
  let onFocus: jest.Mock;
  let onBlur: jest.Mock;
  let onKeyDown: jest.Mock;
  let element: unknown;
  let ref: any;

  beforeEach(() => {
    id = 'my-card';
    wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('id', id);
    style = {
      [chance.string()]: chance.string(),
    };
    disabled = chance.bool();
    readOnly = chance.bool();
    autoComplete = chance.pickone(['on', 'off']);
    value = {
      number: chance.cc({ type: 'mc' }),
      /* eslint-disable camelcase */
      expiration_month: chance.integer({
        min: 1,
        max: 12,
      }),
      expiration_year: new Date().getFullYear() + 1,
      /* eslint-enable camelcase */
      cvc: chance.string({
        length: 3,
        numeric: true,
      }),
    };
    validateOnChange = chance.bool();
    enableCopy = chance.bool();
    inputMode = 'numeric';
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
      <CardElement
        autoComplete={autoComplete}
        disabled={disabled}
        enableCopy={enableCopy}
        id={id}
        inputMode={inputMode}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onReady={onReady}
        readOnly={readOnly}
        ref={ref}
        style={style}
        validateOnChange={validateOnChange}
        value={value}
      />
    );

    expect(container).toMatchSnapshot();
    expect(useElement).toHaveBeenCalledWith(
      id,
      'card',
      { current: wrapperDiv },
      {
        style,
        disabled,
        enableCopy,
        inputMode,
        autoComplete,
        readOnly,
        value,
        validateOnChange,
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
