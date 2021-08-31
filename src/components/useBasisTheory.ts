import { useEffect, useState } from 'react';
import { BasisTheory } from '@basis-theory/basis-theory-js';

type UseBasisTheory = {
  bt?: BasisTheory;
  error?: Error;
};

export const useBasisTheory = (
  ...[key, ...rest]: Parameters<BasisTheory['init']>
): UseBasisTheory => {
  const [state, setState] = useState<{ key?: string } & UseBasisTheory>({});

  useEffect(() => {
    (async (): Promise<void> => {
      if (key && key !== state.key) {
        try {
          const bt = await new BasisTheory().init(key, ...rest);

          setState({
            key,
            bt,
          });
        } catch (error) {
          setState({
            key,
            error,
          });
        }
      }
    })();
  }, [key, rest, state?.key]);

  const { key: _key, ...use } = state;

  return use;
};
