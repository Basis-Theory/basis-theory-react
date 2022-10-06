import * as React from 'react';
import type { RenderHookOptions } from '@testing-library/react';
import { render } from '@testing-library/react';

const customRenderHook = <TProps, TResult>(
  renderCallback: (initialProps: TProps) => TResult,
  options: RenderHookOptions<TProps> = {}
): any => {
  const { initialProps, wrapper } = options;
  const result = {
    current: undefined as TResult | undefined,
    error: undefined as unknown,
  };

  const TestComponent = ({
    renderCallbackProps,
  }: {
    renderCallbackProps: TProps | undefined;
  }): JSX.Element | null => {
    let pendingResult: TResult | undefined;
    let pendingError: unknown;

    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pendingResult = renderCallback(renderCallbackProps!);
    } catch (error) {
      pendingError = error;
    }

    React.useEffect(() => {
      result.current = pendingResult;
      result.error = pendingError;
    });

    // eslint-disable-next-line unicorn/no-null
    return null;
  };

  const { rerender: baseRerender, unmount } = render(
    <TestComponent renderCallbackProps={initialProps} />,
    {
      wrapper,
    }
  );

  const rerender = (rerenderCallbackProps?: TProps): void => {
    baseRerender(<TestComponent renderCallbackProps={rerenderCallbackProps} />);
  };

  return {
    result,
    rerender,
    unmount,
  };
};

export { customRenderHook as renderHook };
