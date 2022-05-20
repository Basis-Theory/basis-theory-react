import { useEffect, useState } from 'react';
import type {
  BaseElement,
  ElementType,
} from '@basis-theory/basis-theory-js/types/elements';
import { BasisTheoryReact } from '../core';
import { useBasisTheoryValue } from './useBasisTheoryValue';

const shallowDifference = <
  A extends Record<string, unknown>,
  B extends Record<string, unknown>
>(
  objA?: A,
  objB?: B
): Partial<A & B> =>
  [...new Set([...Object.keys(objA || {}), ...Object.keys(objB || {})])].reduce(
    (changed, key) => {
      const aValue = objA?.[key];
      const bValue = objB?.[key];

      if (aValue !== bValue) {
        return {
          ...changed,
          [key]: bValue,
        };
      }

      return changed;
    },
    {}
  );

/**
 * Creates, mounts and indexes an Element
 * with React lifecycle
 * @param id
 * @param type
 * @param options
 * @param btFromProps
 * @returns created element and initial options used for mounting
 */
const useElement = <
  Element extends BaseElement<unknown, unknown>,
  Options extends unknown
>(
  id: string,
  type: ElementType,
  options: Options,
  btFromProps?: BasisTheoryReact
): Element | undefined => {
  const bt = useBasisTheoryValue(btFromProps);

  const [element, setElement] = useState<Element>();
  const [lastOptions, setLastOptions] = useState<Options>();

  useEffect(() => {
    if (bt && !element) {
      const newElement = bt.createElement(type as never, options as never);

      newElement.mount(`#${id}`);
      bt.indexElement(id, newElement);
      setLastOptions(options);
      setElement(newElement as Element);
    }

    return (): void => {
      if (element?.mounted) {
        element.unmount();
        bt?.disposeElement(id);
        setElement(undefined);
      }
    };
    // the only two dependencies that we need to watch for
    // are bt and element. Anything else changing should not
    // be considered for creating/mounting an element
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bt, element]);

  useEffect(() => {
    if (element?.mounted && options !== lastOptions) {
      const optionsDifference = shallowDifference(
        lastOptions as Record<string, unknown>,
        options as Record<string, unknown>
      );

      if (Object.keys(optionsDifference).length) {
        setLastOptions(options);
        element.update(optionsDifference);
      }
    }
  }, [element, options, lastOptions]);

  return element;
};

export { useElement };
