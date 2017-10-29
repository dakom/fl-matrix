[![Build Status](https://travis-ci.org/dakom/fl-matrix.svg?branch=master)](https://travis-ci.org/dakom/fl-matrix)

# Fl-Matrix (Fantasy-Land Matrix)

Provides a lightweight wrapper for functional programming with matrices and vectors

Read the [Api Docs](docs/API.md) for more detail.

# Status

_Probably production ready_ ... though this is new and the API may change without notice

# Examples

* WebGL + Sanctuary Demos:
  * [Rotating 3D Cube](http://jsfiddle.net/dakom/h2ub3v3b/) - wrapping gl-matrix for model-view-projection changes
  * [Moving 2D Plane](http://jsfiddle.net/dakom/hvvforby/) - manual adjusting of translation coordinates

* Pure data wrangling:
  * [Unit tests](src/tests/unit) - covers the different usage of most functions

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
- [x] Semigroupoid / compose (multiply)
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