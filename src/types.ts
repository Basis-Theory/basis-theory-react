import type {
  BaseElement,
  BasisTheoryElements,
} from '@basis-theory/basis-theory-js/types/elements';
import type { BasisTheory } from '@basis-theory/basis-theory-js/types/sdk';

interface GetElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getElement<T extends BaseElement<any, any>>(id: string): T;
}

interface ElementMapper extends GetElement {
  indexElement<T extends BaseElement<unknown, unknown>>(
    id: string,
    element: T
  ): void;

  disposeElement(id: string): void;
}

type BasisTheoryReact<Elements extends boolean = boolean> =
  Elements extends true
    ? BasisTheory & GetElement & Omit<BasisTheoryElements, 'createElement'>
    : BasisTheory;

export type { GetElement, ElementMapper, BasisTheoryReact };

export type {
  CardElement,
  TextElement,
  CardExpirationDateElement,
} from '@basis-theory/basis-theory-js/types/elements';
