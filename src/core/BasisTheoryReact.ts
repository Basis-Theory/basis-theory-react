import { BaseElement } from '@basis-theory/basis-theory-elements-interfaces/elements';
import { BasisTheory } from '@basis-theory/basis-theory-js';
import type {
  BasisTheoryReact as IBasisTheoryReact,
  ElementMapper,
  ReactSafeElement,
} from './types';

export class BasisTheoryReact
  extends BasisTheory
  implements IBasisTheoryReact<false>, ElementMapper
{
  private elementMap: { [id: string]: BaseElement<unknown> } = {};

  public getElement(id: string): ReactSafeElement {
    return this.elementMap[id];
  }

  public indexElement(
    id: string,
    element: BaseElement<unknown>
  ): ReactSafeElement {
    // TODO test if needed
    // const previous = this.elementMap[id];
    //
    // if (previous?.mounted) {
    //   console.warn(
    //     `Multiple elements for id "${id}". Unmounting previous of type ${previous.constructor.name}.`
    //   );
    //   previous.unmount();
    // }

    this.elementMap = {
      ...this.elementMap,
      [id]: element,
    };

    return element;
  }

  public disposeElement(id: string): void {
    delete this.elementMap[id];
  }
}
