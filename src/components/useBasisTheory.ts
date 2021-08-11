import { useEffect, useState } from 'react';
import { BasisTheory } from '@Basis-Theory/basis-theory-js';

export const useBasisTheory = (
  ...[key, ...rest]: Parameters<BasisTheory['init']>
): BasisTheory | undefined => {
  const [state, setState] = useState<{ key: string; bt: BasisTheory }>();

  useEffect(() => {
    (async () => {
      if (key !== state?.key) {
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
