[![Build Status](https://travis-ci.org/dakom/fl-matrix.svg?branch=master)](https://travis-ci.org/dakom/fl-matrix)

# Fl-Matrix (Fantasy-Land Matrix)

Provides a wrapper for functional programming with matrices.

Read the [Api Docs](docs/API.md) for more detail.

# Status

Probably production-ready for everything ticked on the [Roadmap](#Roadmap), as they've been tested to some extant.

# Examples

Check out the different examples in the [unit tests](src/tests/unit)

# Install

Install via `npm install fl-matrix` or load in your browser from https://unpkg.com/fl-matrix/dist/fl-matrix.browser-production.js

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


## Fantasy-Land compatibility

- [x] Concat (add)
- [x] Category (identity)
- [x] Setoid (equal)
- [x] Semigroupoid / compose (multiply)
- [ ] Group (invert)

## Sanctuary definitions

- [ ] Matrix

## Project setup

- [x] Local dev building / live testing
- [x] Target npm
- [x] Target external import
- [x] Bundle Typescript definitions
- [x] Write API docs
- [ ] Show webgl demo via fiddle