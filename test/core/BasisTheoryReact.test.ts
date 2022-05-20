import type { BaseElement } from '@basis-theory/basis-theory-js/types/elements';
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
      expect(() => bt.getElement(id)).toThrow(
        `Unable to find an Element with id "${id}". Please make sure there is an Element declared in the DOM with the provided id as a prop.`
      );
    });
    test('should index elements', () => {
      const element = {} as BaseElement<unknown, unknown>;

      bt.indexElement(id, element);

      expect(bt.getElement(id)).toBe(element);
    });
    test('should dispose elements', () => {
      const element = {} as BaseElement<unknown, unknown>;

      bt.indexElement(id, element);
      bt.disposeElement(id);

      expect(() => bt.getElement(id)).toThrow(
        `Unable to find an Element with id "${id}". Please make sure there is an Element declared in the DOM with the provided id as a prop.`
      );
    });
  });
});
