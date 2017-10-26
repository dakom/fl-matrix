[![Build Status](https://travis-ci.org/dakom/fl-matrix.svg?branch=master)](https://travis-ci.org/dakom/fl-matrix)

# Fantasy-Land Matrix

Provides a wrapper for functional programming with matrices. The data structure is in _column-major_ order like what webgl expects.

The only methods provided are those that are required for [fantasy-land](https://github.com/fantasyland/fantasy-land) and [Sanctuary](https://sanctuary.js.org/) compatibility.

For additional matrix operations, consider roundtripping data with [gl-matrix](http://glmatrix.net/) or [vec-la](https://github.com/francisrstokes/vec-la) or anything else you can feed into `setElements()`

# Status

Very early alpha, not ready for production yet. 

See [Roadmap](#Roadmap) for details

# API

TODO. See [API](docs/API.md)

# Usage Example


# Roadmap

## Core lib

- [x] Overall structure
- [x] Ability to create empty matrix
- [x] Ability to create identity matrix
- [x] Helper functions for getting/setting elements and values
- [x] Map (not fl-compatible, see API docs)
- [ ] Reduce (also not fl-compatible, see API docs)

## Fantasy-Land compatibility

- [x] Concat (add)
- [ ] Semigroupoid / compose (multiply)
- [ ] Group (invert)
- [ ] Setoid (equal)
- [ ] Category (identity)

## Sanctuary definitions

- [ ] Matrix

## Project setup

- [x] Local dev building / live testing
- [x] Target npm
- [x] Target external import
- [x] Bundle Typescript definitions
- [ ] Generate API docs
