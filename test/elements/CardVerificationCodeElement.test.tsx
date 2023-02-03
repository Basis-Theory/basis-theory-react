import * as React from 'react';
import { CARD_BRANDS } from '@basis-theory/basis-theory-js/elements/constants';
import type {
  Brand,
  ElementStyle,
  CardVerificationCodeElement as ICardVerificationCodeElement,
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

  let id: string;
  let wrapperDiv: HTMLDivElement;
  let style: ElementStyle;
  let disabled: boolean;
  let autoComplete: 'on' | 'off';
  let ariaLabel: string;
  let placeholder: string;
  let cardBrand: Brand | string;
  let value: string;
  let validateOnChange: boolean;
  let onReady: jest.Mock;
  let onChange: jest.Mock;
  let onFocus: jest.Mock;
  let onBlur: jest.Mock;
  let onKeyDown: jest.Mock;
  let element: unknown;
  let ref: any;

  beforeEach(() => {
    id = 'my-card-verification-code';
    wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('id', id);
    style = {
      [chance.string()]: chance.string(),
    };
    disabled = chance.bool();
    autoComplete = chance.pickone(['on', 'off']);
    ariaLabel = chance.string();
    placeholder = chance.string();
    value = chance.string();
    validateOnChange = chance.bool();
    cardBrand = chance.pickone<Brand>([...CARD_BRANDS]);
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
      <CardVerificationCodeElement
        aria-label={ariaLabel}
        autoComplete={autoComplete}
        cardBrand={cardBrand}
        disabled={disabled}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onReady={onReady}
        placeholder={placeholder}
        ref={ref}
        style={style}
        validateOnChange={validateOnChange}
        value={value}
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
        autoComplete,
        'aria-label': ariaLabel,
        placeholder,
        cardBrand,
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
