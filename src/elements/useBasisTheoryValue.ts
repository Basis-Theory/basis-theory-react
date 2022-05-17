import type { BasisTheoryElements } from '@basis-theory/basis-theory-js/types/elements';
import { BasisTheoryReact, useBasisTheory } from '../core';
import { ElementMapper } from '../core/types';

/**
 * Resolves which BasisTheoryReact instance to use,
 * by favoring the optional parameter.
 * For internal use only.
 * @param bt
 * @returns parameter if it exists; instance from Context otherwise
 */
const useBasisTheoryValue = (
  bt?: BasisTheoryReact
): (BasisTheoryElements & ElementMapper) | undefined => {
  const { bt: btFromContext } = useBasisTheory();

  return (bt || btFromContext) as
    | (BasisTheoryElements & ElementMapper)
    | undefined;
};

export { useBasisTheoryValue };
