# Svelte Hast

Transform [Hast](https://github.com/syntax-tree/hast) (Hypertext Abstract Syntax Tree) into Svelte components.

This library provides Hast-specific component implementations that work with [`@typematter/svelte-unist`](https://github.com/typematter/svelte-unist), enabling you to render HTML ASTs as Svelte components.

## Features

- **Secure** - XSS protection built-in for comments and text nodes
- **Type-safe** - Full TypeScript support with Hast types
- **Svelte 5** - Built with modern Svelte 5 runes
- **Modular** - Import individual components or use the complete component map
- **Lightweight** - Minimal dependencies and bundle size

## Installing

```sh
npm install @typematter/svelte-hast @typematter/svelte-unist

# or
yarn add @typematter/svelte-hast @typematter/svelte-unist

# or
pnpm add @typematter/svelte-hast @typematter/svelte-unist
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { components } from '@typematter/svelte-hast';
	import { Unist } from '@typematter/svelte-unist';
	import { u } from 'unist-builder';

	const ast = u('root', [
		u('element', { tagName: 'h1' }, [u('text', 'Hello, World!')]),
		u('element', { tagName: 'p' }, [
			u('text', 'This is a '),
			u('element', { tagName: 'strong' }, [u('text', 'paragraph')]),
			u('text', '.')
		])
	]);
</script>

<Unist {ast} {components} />
```

### Using Individual Components

```svelte
<script lang="ts">
	import { Element, Text } from '@typematter/svelte-hast';
	import { Unist } from '@typematter/svelte-unist';
	import { u } from 'unist-builder';

	const ast = u('root', [
		u('element', { tagName: 'div', properties: { className: 'container' } }, [u('text', 'Content')])
	]);

	const myComponents = {
		element: Element,
		text: Text
	};
</script>

<Unist {ast} components={myComponents} />
```

### With HTML Attributes

```svelte
<script lang="ts">
	import { components } from '@typematter/svelte-hast';
	import { Unist } from '@typematter/svelte-unist';
	import { u } from 'unist-builder';

	const ast = u('root', [
		u(
			'element',
			{
				tagName: 'a',
				properties: {
					href: 'https://example.com',
					target: '_blank',
					rel: 'noopener noreferrer',
					className: 'link-primary'
				}
			},
			[u('text', 'Visit Example')]
		)
	]);
</script>

<Unist {ast} {components} />
```

## Components

The library exports the following components that map to Hast node types:

- **`Comment`** - Renders HTML comments (with XSS protection)
- **`Doctype`** - Handles DOCTYPE declarations (renders nothing, included for completeness)
- **`Element`** - Renders HTML elements with properties and attributes
- **`Root`** - Renders the root node's children
- **`Text`** - Renders text nodes (with automatic escaping)

All components are also available as a convenient `components` object that can be passed directly to `<Unist>`.

## API

### `components`

A pre-configured object mapping all Hast node types to their corresponding Svelte components:

```typescript
import { components } from '@typematter/svelte-hast';
// {
//   comment: Comment,
//   doctype: Doctype,
//   element: Element,
//   root: Root,
//   text: Text
// }
```

### Individual Component Exports

```typescript
import { Comment, Doctype, Element, Root, Text } from '@typematter/svelte-hast';
```

## Security

This library includes built-in security features:

- **Text nodes** are automatically escaped by Svelte, preventing XSS attacks
- **Comment nodes** escape `-->` sequences to prevent breaking out of HTML comments
- **Element attributes** are handled safely through Svelte's attribute binding

## Development

### Install dependencies

```sh
pnpm install
```

### Run tests

```sh
pnpm test
```

### Type checking

```sh
pnpm check
```

### Build

```sh
pnpm build
```

## License

[MIT](LICENSE)

## Copyright

Copyright &copy; 2025 [Matthew Gibbons](https://github.com/accuser)
