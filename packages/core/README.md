# Hyral core

## !!BREAKING CHANGES!!
Warning! Core has been updated and no longer has state assets. Please use core-with-state for resources with state. Use at your own risk. 

[![npm version](https://badge.fury.io/js/%40hyral%2Fcore.svg)](https://badge.fury.io/js/%40hyral%2Fcore)
[![Known Vulnerabilities](https://snyk.io/test/github/SyneticNL/Hyral/badge.svg)](https://snyk.io/test/github/SyneticNL/Hyral)
[![devDependencies Status](https://david-dm.org/syneticNL/Hyral/dev-status.svg)](https://david-dm.org/syneticNL/Hyral?type=dev)
[![Build Status](https://travis-ci.org/SyneticNL/Hyral.svg?branch=master)](https://travis-ci.org/SyneticNL/Hyral)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6f13bb6cf6c9e88410d3/test_coverage)](https://codeclimate.com/github/SyneticNL/Hyral/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/6f13bb6cf6c9e88410d3/maintainability)](https://codeclimate.com/github/SyneticNL/Hyral/maintainability)
[![Technical Debt](https://flat.badgen.net/codeclimate/tech-debt/SyneticNL/Hyral)](https://codeclimate.com/github/SyneticNL/Hyral/trends)
[![Hyral core](https://badgen.net/bundlephobia/minzip/@hyral/core)](https://bundlephobia.com/result?p=@hyral/core)

Hyral (Hypermedia Resource oriented Api Layer) is an advanced, ORM-like, easy to use abstraction layer over your
API('s).

## Features
* Framework agnostic
* Backend agnostic
* ORM-like interface and features
* [Hypermedia oriented]
* Support for multiple backends with 1 interface
* Full test-coverage
* Modern codebase with TypeScript and promises

## State
When using state management please use the [Hyral Core with state] package

## Additional features
* [JSON:API integration]
* [Vue(x) integration]

## Documentation
The [Core documentation] contains the index for all the Core documentation.

For documentation on other integrations please check the packages themselves.

### Getting started

#### Install

```bash
npm install @hyral/core

// JSON:API support
npm install @hyral/json-api

// Vue(x) integration
npm install @hyral/vue
```

#### Quick start
[Quick start guide]

[Core documentation]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/packages/core/documentation
[Hypermedia oriented]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/packages/core/documentation/Guides/hypermedia.md
[Hyral Core with state]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/packages/core-with-state
[JSON:API integration]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/packages/json-api
[Vue(x) integration]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/packages/vue
[Quick start guide]: https://github.com/SyneticNL/Hyral/tree/v2.0.0-prerelease/packages/core/documentation/Guides/quick-start.md
