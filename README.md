[![Build Status](https://travis-ci.org/dakom/fl-matrix.svg?branch=master)](https://travis-ci.org/dakom/fl-matrix)

# Fl-Matrix (Fantasy-Land Matrix)

Provides a lightweight (5Kb) wrapper for functional programming with matrices.

Read the [Api Docs](docs/API.md) for more detail.

# Status

_Probably_ production-ready for everything ticked on the [Roadmap](#Roadmap), as they've been tested to some extant - but it hasn't been used in anything real yet (fiddle coming soon!)

# Examples

Check out the different examples in the [unit tests](src/tests/unit)

# Install

1. via `npm install fl-matrix`
2. via browser from https://unpkg.com/fl-matrix/dist/fl-matrix.browser-production.js (it is made available via FlMatrix globals in this case)

# Development

Library source is [here](src/lib)

The dev setup is configured to enable both unit testing and iterative browser-based developing, powered by [Fuse-Box](http://fuse-box.org/)

----

# Roadmap

## Core lib

- [x] Overall structure
- [x] Create empty matrix
- [x] Create matrix from values
- [x] Helper functions for getting/setting elements

## Functional utils (not fp-compatible - see API docs)
- [x] Map
- [x] Reduce
- [x] Transpose

## Fantasy-Land compatibility

- [x] Concat (add)
- [x] Category (identity)
- [x] Setoid (equal)
- [x] Semigroupoid / compose (multiply)

## Sanctuary definitions

- [ ] Matrix

## Project setup

- [x] Local dev building / live testing
- [x] Target npm
- [x] Target external import
- [x] Bundle Typescript definitions
- [x] Write API docs
- [ ] Show webgl demo via fiddle
- [ ] Rewrite API docs to use type signatures rather than TS declarations