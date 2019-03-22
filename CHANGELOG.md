# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

> **Tags:**
> - :boom:       [Breaking Change]
> - :eyeglasses: [Spec Compliancy]
> - :rocket:     [New Feature]
> - :bug:        [Bug Fix]
> - :memo:       [Documentation]
> - :house:      [Internal]
> - :nail_care:  [Polish]

## [1.6.0]
#### :bug: Bug
- Fixed a bug that could cause props to be lifted in the wrong order. Occurred when using multiple components wrapped by `withLiftedProps` on the same page.

## [1.5.1]
#### :house: Internal
- Upgraded `hoist-non-react-statics`

## [1.4.1]
#### :bug: Bug
- Improved typings of `withLiftedProps` so `liftedProps` is not required in returned component

## [1.2.1]
#### :bug: Bug
- Add `index.d.ts` to files in package.jsonm

## [1.2.0]
#### :rocket: New Feature
- Added `extraProps` config option that allows you to add extra props that should be lifted along with the passed in props
- Added `wrapper` config option that will render children directly when set to `true`. Useful when nesting lifters within lifters.

## [1.1.9]
#### :bug: Bug
- Changed withLiftedProps to hoist statics from unwrapped component

#### :house: Internal
- Added docs

## [1.1.8] - 2018-04-28
#### :house: Internal
- Added more tests
- Increased code coverage to 100%

## [1.1.7] - 2018-04-27
#### :house: Internal
- Added circle ci script. 
- Added tests, linting, and type-check. 
- Improved typings

## [1.1.6] - 2018-04-26
#### :bug: Bug Fix
- Removed postinstall script which was causing issues when installing the library

## [1.1.5] - 2018-04-26
#### :house: Internal
- Added more tests. Swapped out enzyme for @benlorantfy/enzyme (for now), so we can test things that use the new React context API

#### :nail_care: Polish
- Improved typings by adding explicit return types for `createLifter` and `withLiftedProps`

#### :bug: Bug Fix
- Fixed a crash that happens when importing `react-lift-props` when not using React >= 16.3

## [1.1.3] - 2018-04-23
#### :bug: Bug Fix
- Fixed bug that occured when mounting a `Lifter` not inside a component wrapped in `withLiftedProps`

## [1.1.2] - 2018-04-22
#### :bug: Bug Fix
- Fixed bug with mounting and re-mounting where liftedProps wouldn't respect the order they were placed in the DOM

## [1.1.1] - 2018-04-22
#### :bug: Bug Fix
- Fixed build

## [1.1.0] - 2018-04-22
#### :house: Internal
- Added changelog

#### :rocket: New Feature
- Added support for mounting and unmounting lifters
