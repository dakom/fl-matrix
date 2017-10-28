[![Build Status](https://travis-ci.org/dakom/fl-matrix.svg?branch=master)](https://travis-ci.org/dakom/fl-matrix)

# Fl-Matrix (Fantasy-Land Matrix)

Provides a lightweight wrapper for functional programming with matrices and vectors

Read the [Api Docs](docs/API.md) for more detail.

# Status

_Not production ready_ ... almost, but not quite ;)

# Examples

1. Lots of different examples in the [unit tests](src/tests/unit)
2. A basic [2d demo fiddle](http://jsfiddle.net/dakom/hvvforby/) showing it in action with WebGL and Sanctuary.

# Install

* via `npm install fl-matrix`
* via browser from https://unpkg.com/fl-matrix/dist/fl-matrix.browser-production.js (it is made available via FlMatrix globals in this case)

# Development

Library source is [here](src/lib)

The dev setup is configured to enable both unit testing and iterative browser-based developing, powered by [Fuse-Box](http://fuse-box.org/)

----

# Roadmap

## Fantasy-Land compatibility (not officially tested yet)
- [x] Functor (map)
- [x] Foldable (reduce)
- [x] Concat (add)
- [x] Category (identity)
- [x] Setoid (equal)
- [/] Semigroupoid / compose (multiply)
  - [ ] Fix tests for 3-deep
- [x] Monoid (empty)

## Functional utils (not fp-compatible - see API docs)
- [x] MapElements
- [x] ReduceElements
- [x] Transpose
- [x] Clone

## Core lib
- [x] Overall structure
- [x] Create empty matrix
- [x] Create matrix from values
- [x] Additional creation helpers
- [x] Helper functions for getting/setting elements
- [x] Vector abstraction

## Sanctuary definitions

- [ ] Matrix
- [ ] Vector?

## Project setup

- [x] Local dev building / live testing
- [x] Target npm
- [x] Target external import
- [x] Bundle Typescript definitions
- [x] Write API docs
- [x] Show webgl demo via basic 2d fiddle
- [ ] Rewrite API docs to use type signatures rather than TS declarations
- [ ] Official fantasy-land laws tests
- [ ] Advanced fiddle to use more levels of compose (maybe camera / 3d)

## Extras

- [ ] Invert matrix capability (not sure if this is feasible/worthwhile with arbitrary sizes)