import { BasisTheory } from '@basis-theory/basis-theory-js';
import type { BaseElement } from '@basis-theory/basis-theory-js/types/elements';
import type {
  BasisTheoryReact as IBasisTheoryReact,
  ElementMapper,
} from './types';

export class BasisTheoryReact
  extends BasisTheory
  implements IBasisTheoryReact<false>, ElementMapper
{
  private elementMap: { [id: string]: BaseElement<unknown, unknown> } = {};

  public getElement<Element extends BaseElement<unknown, unknown>>(
    id: string
  ): Element {
    const element = this.elementMap[id] as Element;

    if (!element) {
      throw new Error(
        `Unable to find an Element with id "${id}". Please make sure there is an Element declared in the DOM with the provided id as a prop.`
      );
    }

    return this.elementMap[id] as Element;
  }

  public indexElement(
    id: string,
    element: BaseElement<unknown, unknown>
  ): void {
    this.elementMap = {
      ...this.elementMap,
      [id]: element,
    };
  }

  public disposeElement(id: string): void {
    delete this.elementMap[id];
  }
}
