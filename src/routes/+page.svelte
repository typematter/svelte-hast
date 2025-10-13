<script lang="ts">
	import { defaultComponents } from '$lib/index.js';
	import { Unist } from '@accuser/svelte-unist';
	import { u } from 'unist-builder';

	const ast: import('hast').Root = u('root', [
		u('element', { tagName: 'h1', properties: {} }, [u('text', 'Hello, World!')])
	]);
</script>

<Unist {ast} components={defaultComponents} />
