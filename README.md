# Basis Theory React

This project is meant to be used in internal Basis Theory solutions (i.e. Portal), until it is strong enough for going
public.

## Usage

Install the package:

```shell
yarn add @Basis-Theory/basis-theory-react
```

Declare the `Elements` provider in a wrapping component

```jsx
import { Elements, useBasisTheory } from "@Basis-Theory/basis-theory-react";

export default function MyWrapper() {

  const bt = useBasisTheory('my-elements-key', {
    elements: true
  })

  return <Elements>
    <MyForm />
  </Elements>
}
```


Call `useElements` hook along with elements tags (i.e. `CardElement`).
```jsx
import { CardElement, useElements } from "@Basis-Theory/basis-theory-react";

export default function MyForm() {

  const { getElement, elements } = useElements();

  const submit = async () => {
    try {
      const token = await elements?.storeCreditCard({
        card: getElement("my-card")
      });
    } catch(e) {
      console.error(e)
    }
  };

  return <>
    <div>
      <CardElement id="my-card" />
    </div>
    <div>
      <button onClick={submit}>Submit</button>
    </div>
  </>
}
```

## Development

The provided scripts with the SDK will check for all dependencies, start docker, build the solution, and run all tests.

### Dependencies

- [NodeJS](https://nodejs.org/en/) > 10.12.0
- [Yarn](https://classic.yarnpkg.com/en/docs/)


### Build the SDK and run Tests
Run the following command from the root of the project:

```shell
make verify
```
