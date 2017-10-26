[![Build Status](https://travis-ci.org/dakom/fl-matrix.svg?branch=master)](https://travis-ci.org/dakom/fl-matrix)

# Fantasy-Land Matrix

Provides a wrapper for functional programming with matrices. The data structure is in _column-major_ order like what webgl expects.

The only methods provided are those that are required for [fantasy-land](https://github.com/fantasyland/fantasy-land) and [Sanctuary](https://sanctuary.js.org/) compatibility - as well as a generic map/reduce for rolling your own transformations.

For faster common matrix operations, consider roundtripping data with [gl-matrix](http://glmatrix.net/) or [vec-la](https://github.com/francisrstokes/vec-la) or anything else you can feed into `matrixFromElements()`

# Status

Very early alpha, not ready for production yet. 

See [Roadmap](#Roadmap) for details

# Examples

Check out the different examples in the [unit tests]("src/tests/unit")

# API

[TODO](docs/API.md)

# Roadmap

## Core lib

- [x] Overall structure
- [x] Create empty matrix
- [x] Create matrix from values
- [x] Helper functions for getting/setting elements

## Functional utils (not fp-compatible - see API docs)
- [x] Map
- [x] Reduce


## Fantasy-Land compatibility

- [x] Concat (add)
- [x] Category (identity)
- [x] Setoid (equal)
- [/] Semigroupoid / compose (multiply)
  - [ ] Finish tests (add case by hand)
- [ ] Group (invert)

## Sanctuary definitions

- [ ] Matrix

## Project setup

- [x] Local dev building / live testing
- [x] Target npm
- [x] Target external import
- [x] Bundle Typescript definitions
- [ ] Generate API docs
- [ ] Now that equals tests pass, remove per-element tests