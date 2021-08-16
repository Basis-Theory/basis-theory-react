import { useEffect, useState } from 'react';
import { BasisTheory } from '@basis-theory/basis-theory-js';

export const useBasisTheory = (
  ...[key, ...rest]: Parameters<BasisTheory['init']>
): BasisTheory | undefined => {
  const [state, setState] = useState<{ key: string; bt: BasisTheory }>();

  useEffect(() => {
    (async () => {
      if (key && key !== state?.key) {
        const bt = await new BasisTheory().init(key, ...rest);

        setState({
          key,
          bt,
        });
      }
    })();
  }, [key, rest, state?.key]);

  return state?.bt;
};
