import React, { ForwardedRef, useEffect, useRef, useState } from 'react';
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
 * @param wrapperRef
 * @param btFromProps
 * @param ref optional ref to set the underlying element
 * @returns created element and initial options used for mounting
 */
const useElement = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Element extends BaseElement<any, any>,
  Options extends unknown
>(
  id: string,
  type: ElementType,
  wrapperRef: React.RefObject<HTMLDivElement>,
  options: Options,
  btFromProps?: BasisTheoryReact,
  ref?: ForwardedRef<Element>
): Element | undefined => {
  const bt = useBasisTheoryValue(btFromProps);
  const [lastOptions, setLastOptions] = useState<Options>();
  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    if (bt && wrapperRef.current && !elementRef.current) {
      const newElement = bt.createElement(
        type as never,
        options as never
      ) as unknown as Element; // conversion to unknown necessary because of different value prop types

      elementRef.current = newElement;

      if (typeof ref === 'function') {
        ref(newElement);
      }

      if (ref && typeof ref === 'object') {
        // eslint-disable-next-line no-param-reassign
        ref.current = newElement;
      }

      newElement.mount(`#${id}`).catch((mountError) => {
        setLastOptions(() => {
          throw mountError;
        });
      });
      bt.indexElement(id, newElement);
      setLastOptions(options);
    }

    // the only two dependencies that we need to watch for
    // are bt and wrapperRef. Anything else changing should not
    // be considered for creating/mounting an element
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bt, wrapperRef]);

  useEffect(() => {
    if (elementRef.current && lastOptions && options !== lastOptions) {
      const optionsDifference = shallowDifference(
        lastOptions as Record<string, unknown>,
        options as Record<string, unknown>
      );

      if (Object.keys(optionsDifference).length) {
        setLastOptions(options);
        elementRef.current.update(optionsDifference).catch((updateError) => {
          setLastOptions(() => {
            throw updateError;
          });
        });
      }
    }
  }, [options, lastOptions]);

  return elementRef?.current || undefined;
};

export { useElement };
