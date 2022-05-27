import * as React from 'react';
import { CARD_BRANDS } from '@basis-theory/basis-theory-js/elements/constants';
import type {
  Brand,
  ElementStyle,
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

  let style: ElementStyle;
  let disabled: boolean;
  let ariaLabel: string;
  let placeholder: string;
  let cardBrand: Brand;
  let onReady: jest.Mock;
  let onChange: jest.Mock;
  let onFocus: jest.Mock;
  let onBlur: jest.Mock;
  let onKeyDown: jest.Mock;
  let element: unknown;

  beforeEach(() => {
    style = {
      [chance.string()]: chance.string(),
    };
    disabled = chance.bool();
    ariaLabel = chance.string();
    placeholder = chance.string();

    cardBrand = chance.pickone<Brand>([...CARD_BRANDS]);
    onReady = jest.fn();
    onChange = jest.fn();
    onFocus = jest.fn();
    onBlur = jest.fn();
    onKeyDown = jest.fn();
    element = {
      [chance.string()]: chance.string(),
    };

    jest.mocked(useElement).mockReturnValue(element as any);
  });

  test('should match snapshot and call lifecycle hook properly', () => {
    const { container } = render(
      <CardVerificationCodeElement
        aria-label={ariaLabel}
        cardBrand={cardBrand}
        disabled={disabled}
        id="my-card-verification-code"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onReady={onReady}
        placeholder={placeholder}
        style={style}
      />
    );

    expect(container).toMatchSnapshot();
    expect(useElement).toHaveBeenCalledWith(
      'my-card-verification-code',
      'cardVerificationCode',
      {
        targetId: 'my-card-verification-code',
        style,
        disabled,
        'aria-label': ariaLabel,
        placeholder,
        cardBrand,
      },
      undefined
    );
    expect(useListener).toHaveBeenCalledWith('ready', element, onReady);
    expect(useListener).toHaveBeenCalledWith('change', element, onChange);
    expect(useListener).toHaveBeenCalledWith('focus', element, onFocus);
    expect(useListener).toHaveBeenCalledWith('blur', element, onBlur);
    expect(useListener).toHaveBeenCalledWith('keydown', element, onKeyDown);
  });
});
