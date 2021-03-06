# react-lift-props · ![Version](https://img.shields.io/npm/v/react-lift-props.svg) ![CircleCI](https://img.shields.io/circleci/project/github/BenLorantfy/react-lift-props.svg) ![Codecov](https://img.shields.io/codecov/c/github/BenLorantfy/react-lift-props.svg)


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

...

<Stepper>
  <MyCoolStep />
</Stepper>
```

This let's you encapsulate properties of the sub components so that the parent component doesn't need to know about it's details. It also let's you re-use components, group components, and all the other benefits of composition. For a more in-depth explanation of why this library exists, check out the [medium post](https://medium.com/@benlorantfy/introducing-react-lift-props-490ee7cd958).

## Docs
- Check out the usage [docs](./docs) here

## Limitations
- Does not work in React Native
- Does not work with non-index keys
  - Use indexes as keys on lifters and use non-index keys when looping over liftedProps

## Roadmap
- Add support for React Native
- Re-implement using react-call-return once it's more stable, or a [different solution React might introduce](https://twitter.com/dan_abramov/status/987735478672744448). Should be able to do this in a non-breaking way.

## Contributing
- fork / clone
- run `npm install && npm run setup`
- open a PR

