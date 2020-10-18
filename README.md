# rxjs-web-observers

[![npm version](https://img.shields.io/npm/v/rxjs-web-observers)](https://www.npmjs.com/package/rxjs-web-observers)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/rxjs-web-observers)](https://bundlephobia.com/result?p=rxjs-web-observers)
[![Build Status](https://travis-ci.com/olegmingaleev/rxjs-web-observers.svg?token=5NeZhHMxMA772VTczkXy&branch=main)](https://travis-ci.com/olegmingaleev/rxjs-web-observers)
[![License](https://camo.githubusercontent.com/f86cfa12fec6e29e7025d436861a09c09d6dffee/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f7061636b6167652d6275696c642d73746174732e737667)](https://camo.githubusercontent.com/f86cfa12fec6e29e7025d436861a09c09d6dffee/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f7061636b6167652d6275696c642d73746174732e737667)

This library allows you to use MutationObserver, IntersectionObserver, ResizeObserver like RxJs observer.

## Install

```
npm install --save rxjs-web-observers
```

## Polyfills

Recommended polyfills:

- [MutationObserver](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs)
- [IntersectionObserver](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
- [ResizeObserver polyfill based on latest specification which includes support for observer options](https://github.com/juggle/resize-observer) (recommended)
- [ResizeObserver polyfill based on initial specification](https://github.com/juggle/resize-observer)

## Usage

Creating `MutationObserver` from call `fromMutation` function:

```typescript
import { fromMutation } from 'rxjs-web-observers';

const source$ = fromMutation(
    observedEl, // some observed element
    { childList: true } // observer options
);

source$.subscribe(mutations => {
    // your code...
});
```

Creation `IntersectionObserver` by `fromIntersection` function:

```typescript
import { fromIntersection } from 'rxjs-web-observers';

const source$ = fromIntersection(
    observedEl, // some observed element
);

source$.subscribe(entries => {
    // your code...
});
```

Creation `ResizeObserver` by `fromResize` function:

```typescript
import { fromResize } from 'rxjs-web-observers';

const source$ = fromResize(
    observedEl, // some observed element
);

source$.subscribe(entries => {
    // your code...
});
```
