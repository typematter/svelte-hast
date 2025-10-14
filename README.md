# Svelte Hast

Transform [Hast](https://github.com/syntax-tree/hast) into Svelte components.

## Installing

Add the `@typematter/svelte-hast` package dependency to your [Svelte](https://svelte.dev) / [SvelteKit](https://kit.svelte.dev) project:

```sh
npm install --save-dev @typematter/svelte-hast

# or
yarn add --dev @typematter/svelte-hast

# or
pnpm add --save-dev @typematter/svelte-hast
```

## Usage

```svelte
<script lang="ts">
	import { components } from '@typematter/svelte-hast';
	import { Unist } from '@typematter/svelte-unist';
	import type { PageProps } from './$types.js';
	import { u } from 'unist-builder';

	const ast = u('root', [
        u('element', { tagName: 'h1' }, [u('text', 'Hello, World!')])
    ])
</script>

<Unist {ast} {components} />
```

## Test

```sh
npm test
```

## License

[MIT](LICENSE)

## Copyright

Copyright &copy; 2025 [Matthew Gibbons](https://github.com/accuser)
