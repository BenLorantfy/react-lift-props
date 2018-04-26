# react-lift-props

This library solves a problem that occurs when you try to do composition with systems of components. For example, while before you might have this:

```
<Stepper>
  <Step name="my step name" />
</Stepper>
```

Now you can do this:
```
const MyCoolStep = () => {
  return <Step name="my step name" />
}

<Stepper>
  <MyCoolStep />
</Stepper>
```

This let's you encapsulate properties of the sub components so that the parent component doesn't need to know about it's details. It also let's you re-use components, group components, and all the other benefits of composition.

## Contributing
### Setup
- run `npm run setup`
