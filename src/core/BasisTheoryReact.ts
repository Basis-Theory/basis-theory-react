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
  private elementMap: { [id: string]: BaseElement<unknown> } = {};

  public getElement<Element extends BaseElement<unknown>>(id: string): Element {
    return this.elementMap[id] as Element;
  }

  public indexElement(id: string, element: BaseElement<unknown>): void {
    this.elementMap = {
      ...this.elementMap,
      [id]: element,
    };
  }

  public disposeElement(id: string): void {
    delete this.elementMap[id];
  }
}
