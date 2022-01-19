import { useEffect, useState } from 'react';
import type {
  BasisTheoryInitOptionsWithElements,
  BasisTheoryInitOptionsWithoutElements,
} from '@basis-theory/basis-theory-elements-interfaces/sdk';
import { useBasisTheoryFromContext } from './BasisTheoryProvider';
import { BasisTheoryReact } from './BasisTheoryReact';
import type { BasisTheoryReact as IBasisTheoryReact } from './types';

type UseBasisTheory<Elements extends boolean> = {
  error?: Error;
  bt?: IBasisTheoryReact<Elements>;
};
type UseBasisTheoryState = { apiKey?: string } & UseBasisTheory<boolean>;

function useBasisTheory(
  apiKey?: string,
  options?: BasisTheoryInitOptionsWithoutElements
): UseBasisTheory<false>;

function useBasisTheory(
  apiKey: string,
  options: BasisTheoryInitOptionsWithElements
): UseBasisTheory<true>;

// eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
function useBasisTheory(
  apiKey?: string,
  options?:
    | BasisTheoryInitOptionsWithElements
    | BasisTheoryInitOptionsWithoutElements
): UseBasisTheory<boolean> {
  const [state, setState] = useState<UseBasisTheoryState>({});

  const { bt: btFromContext } = useBasisTheoryFromContext();

  useEffect(() => {
    (async (): Promise<void> => {
      if (apiKey && apiKey !== state.apiKey) {
        try {
          const bt = (await new BasisTheoryReact().init(
            apiKey,
            options as BasisTheoryInitOptionsWithElements &
              BasisTheoryInitOptionsWithoutElements
          )) as BasisTheoryReact;

          setState({
            apiKey,
            bt,
          });
        } catch (error) {
          setState({
            apiKey,
            error,
          });
        }
      }
    })();
  }, [apiKey, options, state.apiKey]);

  if (!apiKey) {
    return {
      bt: btFromContext,
    };
  }

  return {
    bt: state.bt,
    error: state.error,
  };
}

export { useBasisTheory };
