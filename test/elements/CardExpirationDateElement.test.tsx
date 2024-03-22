import * as React from 'react';
import type {
  CardExpirationDateElement as ICardExpirationDateElement,
  CardExpirationDateValue,
  ElementStyle,
  InputMode,
} from '@basis-theory/basis-theory-js/types/elements';
import { render } from '@testing-library/react';
import { Chance } from 'chance';
import { CardExpirationDateElement } from '../../src';
import { useElement } from '../../src/elements/useElement';
import { useListener } from '../../src/elements/useListener';

jest.mock('../../src/elements/useElement');
jest.mock('../../src/elements/useListener');

describe('CardExpirationDateElement', () => {
  const chance = new Chance();
  const refArray = [React.createRef<ICardExpirationDateElement>(), undefined];

  const valueRef = React.createRef<ICardExpirationDateElement>();

  let id: string;
  let wrapperDiv: HTMLDivElement;
  let style: ElementStyle;
  let disabled: boolean;
  let readOnly: boolean;
  let autoComplete: 'on' | 'off';
  let ariaLabel: string;
  let placeholder: string;
  let value: CardExpirationDateValue<'static'>;
  let validateOnChange: boolean;
  let enableCopy: boolean;
  let inputMode: `${InputMode}`;
  let onReady: jest.Mock;
  let onChange: jest.Mock;
  let onFocus: jest.Mock;
  let onBlur: jest.Mock;
  let onKeyDown: jest.Mock;
  let element: unknown;
  let ref: any;

  beforeEach(() => {
    id = 'my-card-expiration-date';
    wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('id', id);
    style = {
      [chance.string()]: chance.string(),
    };
    disabled = chance.bool();
    readOnly = chance.bool();
    autoComplete = chance.pickone(['on', 'off']);
    ariaLabel = chance.string();
    placeholder = chance.string();
    value = {
      month: chance.integer({
        min: 1,
        max: 12,
      }),
      year: new Date().getFullYear() + 1,
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
      <CardExpirationDateElement
        aria-label={ariaLabel}
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
        placeholder={placeholder}
        readOnly={readOnly}
        ref={ref}
        style={style}
        validateOnChange={validateOnChange}
        value={value}
        valueRef={valueRef}
      />
    );

    expect(container).toMatchSnapshot();
    expect(useElement).toHaveBeenCalledWith(
      id,
      'cardExpirationDate',
      { current: wrapperDiv },
      {
        targetId: id,
        style,
        disabled,
        enableCopy,
        autoComplete,
        readOnly,
        inputMode,
        'aria-label': ariaLabel,
        placeholder,
        validateOnChange,
        value,
      },
      undefined,
      // eslint-disable-next-line unicorn/no-null
      typeof ref === 'undefined' ? null : ref, // undefined ref gets forwarded as null,
      valueRef // undefined ref gets forwarded as null
    );
    expect(useListener).toHaveBeenCalledWith('ready', element, onReady);
    expect(useListener).toHaveBeenCalledWith('change', element, onChange);
    expect(useListener).toHaveBeenCalledWith('focus', element, onFocus);
    expect(useListener).toHaveBeenCalledWith('blur', element, onBlur);
    expect(useListener).toHaveBeenCalledWith('keydown', element, onKeyDown);
  });
});
