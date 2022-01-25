import type { BaseElement } from '@basis-theory/basis-theory-elements-interfaces/elements';
import { Chance } from 'chance';
import { BasisTheoryReact } from '../../src/core/BasisTheoryReact';

describe('BasisTheoryReact', () => {
  const chance = new Chance();
  let bt: BasisTheoryReact;

  beforeEach(() => {
    bt = new BasisTheoryReact();
  });

  describe('Element indexing', () => {
    let id: string;

    beforeEach(() => {
      id = chance.string();
    });

    test('should not get non indexed elements', () => {
      expect(bt.getElement(id)).toBeUndefined();
    });
    test('should index elements', () => {
      const element = {} as BaseElement<unknown>;

      bt.indexElement(id, element);

      expect(bt.getElement(id)).toBe(element);
    });
    test('should dispose elements', () => {
      const element = {} as BaseElement<unknown>;

      bt.indexElement(id, element);
      bt.disposeElement(id);

      expect(bt.getElement(id)).toBeUndefined();
    });
  });
});
