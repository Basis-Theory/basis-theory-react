import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import type { BasisTheoryReact } from './types';

interface BasisTheoryProviderValue {
  bt?: BasisTheoryReact<boolean>;
}

interface BasisTheoryProviderProps<Elements extends boolean> {
  bt?: BasisTheoryReact<Elements>;
}

const BasisTheoryContext = createContext<BasisTheoryProviderValue>({});

const BasisTheoryProvider = <Elements extends boolean>({
  bt,
  children,
}: PropsWithChildren<BasisTheoryProviderProps<Elements>>): JSX.Element => {
  const value = useMemo(
    () => ({
      bt,
    }),
    [bt]
  );

  return (
    <BasisTheoryContext.Provider value={value}>
      {children}
    </BasisTheoryContext.Provider>
  );
};

const useBasisTheoryFromContext = (): BasisTheoryProviderValue =>
  useContext(BasisTheoryContext);

export { BasisTheoryProvider, useBasisTheoryFromContext };
