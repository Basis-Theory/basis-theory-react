import React from 'react';
import { TextElement } from '@basis-theory/basis-theory-elements-interfaces/elements';
import { useBasisTheory, BasisTheoryProvider } from '../src/core';
import { CardElement } from '../src/elements';
import { useBasisTheoryValue } from '../src/elements/useBasisTheoryValue';

// /* eslint-disable @typescript-eslint/explicit-function-return-type, no-undef, react/jsx-curly-brace-presence, @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types */

const customStyles = {
  base: {
    fontFamily: 'Arial',
    color: 'blue',
  },
};

const MyCheckoutForm = () => {
  const { bt } = useBasisTheory(); // gets SDK from Context

  const chargeCreditCard = async () => {
    const token = await bt?.atomicCards.create({
      card: bt?.getElement('myCard'),
    });

    // store token.id in backend or call one of our reactors to charge it
  };

  return (
    <div>
      <CardElement id="my-card" style={customStyles} />
      <button onClick={chargeCreditCard} type="button">
        {'Submit'}
      </button>
    </div>
  );
};

// const MyKycForm = () => {
//   const { bt } = useBasisTheory(); // gets SDK from Context
//
//   const saveCustomer = async () => {
//     const { name, ssn } = await bt.tokenize({
//       name: bt?.getElement('name'),
//       ssn: bt?.getElement('ssn'),
//     });
//
//     // store name and ssn tokens to retrieve or process it later
//   };
//
//   return (
//     <div>
//       <TextElement
//         aria-label="Name"
//         id="name"
//         placeholder="Name"
//         style={customStyles}
//       />
//       <TextElement
//         aria-label="SSN"
//         id="ssn"
//         mask={ssnMask}
//         placeholder="SSN"
//         style={customStyles}
//       />
//       <button onClick={saveCustomer} type="button">
//         Submit
//       </button>
//     </div>
//   );
// };

export const App = () => {
  const { bt } = useBasisTheory('my-api-key', { elements: true }); // SDK initialization

  return (
    <BasisTheoryProvider bt={bt}>
      <MyCheckoutForm />
    </BasisTheoryProvider>
  );
};
