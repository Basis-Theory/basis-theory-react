import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import type {
  BasisTheoryElements,
  BaseElement,
  ElementType,
} from '@basis-theory/basis-theory-elements-interfaces/elements';
import type { BasisTheory } from '@basis-theory/basis-theory-js';

interface ElementsProps {
  bt?: BasisTheory;
}

interface ElementsValue {
  elements?: BasisTheoryElements;
  getElement: <T extends BaseElement<ElementType>>(id: string) => T;
}

interface SuperElementsValue extends ElementsValue {
  indexElement: <T extends BaseElement<ElementType>>(
    id: string,
    element: T
  ) => T;
  disposeElement: <T extends BaseElement<ElementType>>(id: string) => T;
}

const ElementsContext = createContext<SuperElementsValue>({
  getElement: () => undefined as never,
  indexElement: () => undefined as never,
  disposeElement: () => undefined as never,
});

/* eslint-disable no-console */
const Elements: FC<ElementsProps> = ({ bt, children }) => {
  const [elements, setElements] = useState<BasisTheoryElements | undefined>();
  const [elementMap, setElementMap] = useState<{
    [id: string]: BaseElement<ElementType>;
  }>({});

  const getElement = <T extends BaseElement<ElementType>>(id: string): T => {
    const element = elementMap[id];

    if (!element) {
      console.warn(`No element mounted with id "${id}"`);
    }

    return element as T;
  };

  const indexElement = <T extends BaseElement<ElementType>>(
    id: string,
    element: T
  ): T => {
    const previous = elementMap[id];

    if (previous?.mounted) {
      console.warn(
        `Multiple elements for id "${id}". Unmounting previous of type ${previous.constructor.name}.`
      );
      previous.unmount();
    }

    setElementMap({
      ...elementMap,
      [id]: element,
    });

    return element;
  };

  const disposeElement = <T extends BaseElement<ElementType>>(
    id: string
  ): T => {
    const element = getElement(id);

    delete elementMap[id];

    return element as T;
  };

  const btElements = bt?.elements;

  useEffect(() => {
    if (btElements) {
      if (!elements) {
        setElements(btElements);
      } else if (elements !== btElements) {
        console.warn(
          "BasisTheory (bt) instance can't be updated in Elements props."
        );
      }
    }
  }, [elements, btElements]);

  return (
    <ElementsContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        getElement,
        indexElement,
        elements,
        disposeElement,
      }}
    >
      {children}
    </ElementsContext.Provider>
  );
};
/* eslint-enable no-console */

const useSuperElements = (): SuperElementsValue => useContext(ElementsContext);

const useElements = (): ElementsValue => {
  const { indexElement, ...elements } = useSuperElements();

  return elements;
};

export { Elements, useSuperElements, useElements };
