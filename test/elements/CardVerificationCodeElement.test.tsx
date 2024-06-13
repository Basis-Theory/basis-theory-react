import * as React from 'react';
import { CARD_BRANDS } from '@basis-theory/basis-theory-js/elements/constants';
import type {
  Brand,
  CopyIconStyles,
  ElementStyle,
  CardVerificationCodeElement as ICardVerificationCodeElement,
  InputMode,
} from '@basis-theory/basis-theory-js/types/elements';
import { render } from '@testing-library/react';
import { Chance } from 'chance';
import { CardVerificationCodeElement } from '../../src';
import { useElement } from '../../src/elements/useElement';
import { useListener } from '../../src/elements/useListener';

jest.mock('../../src/elements/useElement');
jest.mock('../../src/elements/useListener');

describe('CardVerificationCodeElement', () => {
  const chance = new Chance();
  const refArray = [React.createRef<ICardVerificationCodeElement>(), undefined];

  const valueRef = React.createRef<ICardVerificationCodeElement>();

  let ariaLabel: string;
  let autoComplete: 'on' | 'off';
  let cardBrand: Brand | string;
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
  let placeholder: string;
  let readOnly: boolean;
  let ref: any;
  let style: ElementStyle;
  let validateOnChange: boolean;
  let value: string;
  let wrapperDiv: HTMLDivElement;

  beforeEach(() => {
    id = 'my-card-verification-code';
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
    value = chance.string();
    validateOnChange = chance.bool();
    enableCopy = chance.bool();
    inputMode = 'numeric';
    cardBrand = chance.pickone<Brand>([...CARD_BRANDS]);
    onReady = jest.fn();
    onChange = jest.fn();
    onFocus = jest.fn();
    onBlur = jest.fn();
    onKeyDown = jest.fn();
    copyIconStyles = {
      size: '10',
      color: 'blue',
      successColor: 'red',
    };
    element = {
      [chance.string()]: chance.string(),
    };
    ref = chance.pickone(refArray);

    jest.mocked(useElement).mockReturnValue(element as any);
  });

  test('should match snapshot and call lifecycle hook properly', () => {
    const { container } = render(
      <CardVerificationCodeElement
        aria-label={ariaLabel}
        autoComplete={autoComplete}
        cardBrand={cardBrand}
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
      'cardVerificationCode',
      { current: wrapperDiv },
      {
        targetId: id,
        style,
        disabled,
        enableCopy,
        autoComplete,
        copyIconStyles,
        inputMode,
        'aria-label': ariaLabel,
        placeholder,
        readOnly,
        cardBrand,
        value,
        validateOnChange,
      },
      undefined,
      // eslint-disable-next-line unicorn/no-null
      typeof ref === 'undefined' ? null : ref, // undefined ref gets forwarded as null
      valueRef
    );
    expect(useListener).toHaveBeenCalledWith('ready', element, onReady);
    expect(useListener).toHaveBeenCalledWith('change', element, onChange);
    expect(useListener).toHaveBeenCalledWith('focus', element, onFocus);
    expect(useListener).toHaveBeenCalledWith('blur', element, onBlur);
    expect(useListener).toHaveBeenCalledWith('keydown', element, onKeyDown);
  });
});
