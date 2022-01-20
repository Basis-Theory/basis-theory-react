import type {
  BaseElement,
  BasisTheoryElements,
} from '@basis-theory/basis-theory-elements-interfaces/elements';
import type { BasisTheory } from '@basis-theory/basis-theory-elements-interfaces/sdk';

interface GetElement {
  getElement<Element extends BaseElement<unknown>>(id: string): Element;
}

interface ElementMapper extends GetElement {
  indexElement(id: string, element: BaseElement<unknown>): void;
  disposeElement(id: string): void;
}

type BasisTheoryReact<Elements extends boolean = boolean> =
  Elements extends true
    ? BasisTheory & GetElement & Omit<BasisTheoryElements, 'createElement'>
    : BasisTheory;

export type { GetElement, ElementMapper, BasisTheoryReact };
