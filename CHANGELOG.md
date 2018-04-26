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

## [Unreleased]

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
