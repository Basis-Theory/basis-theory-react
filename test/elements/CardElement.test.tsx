import * as React from 'react';
import { render } from '@testing-library/react';
import { CardElement } from '../../src';
import { useElement } from '../../src/elements/useElement';

jest.mock('../../src/elements/useElement');

describe('CardElement', () => {
  test('should match snapshot and call proper lifecycle hook', () => {
    const element = render(<CardElement id="my-card" />);

    expect(element.container).toMatchSnapshot();
    expect(useElement).toHaveBeenCalledWith('my-card', 'card', {}, undefined);
  });
});
