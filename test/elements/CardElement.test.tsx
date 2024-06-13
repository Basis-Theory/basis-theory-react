import * as React from 'react';
import type {
  CardElement as ICardElement,
  CardElementValue,
  ElementStyle,
  InputMode,
  CopyIconStyles,
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

  let autoComplete: 'on' | 'off';
  let copyIconStyles: CopyIconStyles;
  let disabled: boolean;
  let element: unknown;
  let enableCopy: boolean;
  let id: string;
  let inputMode: `${InputMode}`;
  let onBlur: jest.Mock;
  let onChange: jest.Mock;
  let onFocus: jest.Mock;
  let onKeyDown: jest.Mock;
  let onReady: jest.Mock;
  let readOnly: boolean;
  let ref: any;
  let skipLuhnValidation: boolean;
  let style: ElementStyle;
  let validateOnChange: boolean;
  let value: CardElementValue<'static'>;
  let wrapperDiv: HTMLDivElement;

  beforeEach(() => {
    id = 'my-card';
    wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('id', id);
    style = {
      [chance.string()]: chance.string(),
    };
    disabled = chance.bool();
    readOnly = chance.bool();
    skipLuhnValidation = chance.bool();
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
    copyIconStyles = {
      size: '10',
      color: 'blue',
      successColor: 'red',
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
        copyIconStyles={copyIconStyles}
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
        skipLuhnValidation={skipLuhnValidation}
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
        autoComplete,
        disabled,
        enableCopy,
        inputMode,
        copyIconStyles,
        readOnly,
        skipLuhnValidation,
        style,
        validateOnChange,
        value,
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
