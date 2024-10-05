# Svelte Hast

Transform [Hast](https://github.com/syntax-tree/hast) into Svelte components.

## Installing

Add the `@accuser/svelte-hast` package dependency to your [Svelte](https://svelte.dev) / [SvelteKit](https://kit.svelte.dev) project:

```sh
npm install --save-dev @accuser/svelte-hast
```

## Usage

```svelte
<script lang="ts">
	import Hast from '@accuser/svelte-hast';
	import { u } from 'unist-builder';

	const ast: import('hast').Root = u('root', [
		u('element', { tagName: 'h1', properties: {} }, [u('text', 'Hello, World!')])
	]);
</script>

<Hast {ast} />
```

## Test

```sh
npm test
```

## License

[MIT](LICENSE)

## Copyright

Copyrigth &copy; 2024 [Matthew Gibbons](https://github.com/accuser)