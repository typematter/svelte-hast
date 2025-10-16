# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit library package (`@typematter/svelte-hast`) that transforms [Hast](https://github.com/syntax-tree/hast) (Hypertext Abstract Syntax Tree) into Svelte components. It provides Hast-specific component implementations that work with `@typematter/svelte-unist` (https://github.com/typematter/svelte-unist), which is the parent library that provides generic AST rendering capabilities.

## Core Architecture

The library exports both individual components and a convenience `components` object that maps all Hast node types to their corresponding Svelte components:

- `comment` → Comment component (renders HTML comments)
- `doctype` → Doctype component (included for completeness but renders nothing, since components are used within existing web pages)
- `element` → Element component (renders HTML elements with properties/attributes)
- `root` → Root component (renders the root node's children)
- `text` → Text component (renders text nodes)

The `components` object provides an easy way to include all Hast components at once when using the library. Developers can import the complete map (`import { components } from '@typematter/svelte-hast'`) or import individual components for more granular control.

These components are designed to work with the `<Unist>` component from `@typematter/svelte-unist`, which provides the generic AST rendering engine. The rendering flow is:

1. User passes a Hast AST and this library's `components` object to `<Unist>` from `@typematter/svelte-unist`
2. `<Unist>` traverses the AST and delegates rendering to the appropriate component based on node type
3. Each Hast component uses `<Node>` (also from `@typematter/svelte-unist`) to recursively render child nodes

This architecture separates AST traversal logic (in `svelte-unist`) from Hast-specific rendering (in this library).

## Project Structure

```
src/lib/
├── index.ts                    # Main entry point, exports components
└── components/
    ├── index.ts                # Aggregates all components into components object
    ├── comment/                # Hast comment node renderer
    ├── doctype/                # Hast doctype node renderer
    ├── element/                # Hast element node renderer (main component)
    ├── root/                   # Hast root node renderer
    └── text/                   # Hast text node renderer
```

Each component directory follows the pattern:

- `index.ts` - exports the component
- `{name}.svelte` - the actual component implementation
- `{name}.test.ts` - component tests (where applicable)

## Development Commands

### Install dependencies

```bash
pnpm install
```

### Development server

```bash
pnpm dev
```

### Build the library

```bash
pnpm build           # Runs both vite build and package
pnpm package         # Builds distributable package only
```

### Testing

```bash
pnpm test            # Run tests with Vitest
```

Tests use:

- Vitest with jsdom environment
- @testing-library/jest-dom matchers (configured in vitest-setup.js)
- Test files located alongside components: `*.test.ts`

### Run a single test file

```bash
pnpm vitest src/lib/components/element/element.test.ts
```

### Type checking

```bash
pnpm check           # One-time type check
pnpm check:watch     # Watch mode for type checking
```

### Linting and formatting

```bash
pnpm lint            # Check formatting (Prettier) and run ESLint
pnpm format          # Auto-format with Prettier
```

## Key Implementation Details

### Element Component

The Element component ([src/lib/components/element/element.svelte](src/lib/components/element/element.svelte)) is the most complex:

- Uses `<svelte:element>` to dynamically render any HTML tag based on `tagName`
- Handles `className` property (converted from class attribute in Hast)
- Special handling for `<template>` elements which render `content` instead of `children`
- **Smart void element handling**: Checks if element has content/children rather than maintaining a hardcoded list of void elements (img, br, input, etc.). Renders self-closing tags when no content is present.
- Passes through all other properties as element attributes
- Minimal reactivity approach for performance

### Comment Component

The Comment component ([src/lib/components/comment/comment.svelte](src/lib/components/comment/comment.svelte)):

- **XSS Protection**: Escapes `-->` sequences to `--&gt;` to prevent breaking out of HTML comments
- Uses `{@html}` to render the comment with escaped content

### Security Features

The library includes built-in security protections:

- **Comment XSS prevention**: `-->` sequences are escaped in comment values
- **Text escaping**: Svelte automatically escapes text nodes, preventing XSS
- **Safe attributes**: Element properties are handled through Svelte's safe attribute binding

### Edge Case Handling

All components gracefully handle edge cases:

- Undefined or null properties
- Empty children arrays
- Missing values
- Deeply nested structures
- Special characters and HTML entities

Comprehensive edge case tests are in [src/lib/components/edge-cases.test.ts](src/lib/components/edge-cases.test.ts).

### Svelte 5 Runes

The codebase uses Svelte 5's new runes syntax:

- `$props()` for component props
- `$derived()` for reactive computations
- Minimal reactivity for better performance

### Testing

The project has comprehensive test coverage with 43 tests across 7 test files:

- Component unit tests (25 tests)
- Integration tests (8 tests)
- Edge case tests (18 tests)
- All tests use Vitest with jsdom environment
- Tests are located alongside components: `*.test.ts`

### Package Configuration

- Built with `@sveltejs/package` (outputs to `dist/`)
- Entry point exports both types and Svelte files
- Peer dependency on Svelte 5.39+
- Test files are excluded from published package
