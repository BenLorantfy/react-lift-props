# Docs

## Api Reference
- `createLifter(options: { displayName?: string })`  
Creates a Lifter component which will lift their props (including the `children` prop) to the nearest component wrapped with `withLiftedProps`
- `withLiftedProps(Component: React.ComponentClass)`  
Injects a prop named `liftedProps` into the component. Each item in the array is the props for a single occurance of a Lifter. The array is sorted by the order the Lifters appear in the DOM.

## Example
```JS
const Step = createLifter({ displayName: 'Step' });
const Stepper = withLiftedProps(({ liftedProps }) => (
  <div>
    {liftedProps.map((stepProps, idx) => (
      <div key={stepProps.name}>
        <StepTitle 
          number={idx}
          title={stepProps.name}
        />
        <Collapsible>
          {stepProps.children}
        </Collapsible>
      </div>
    ))}
  </div>
));

...

const MyCoolStep = () => {
  return <Step name="my first name" />
}

...

<Stepper>
  <MyCoolStep />
  <Step name="my second step" />
</Stepper>
```