<script lang="ts">
	import Hast from '$lib/components/Hast.svelte';
	import { u } from 'unist-builder';

	const ast: import('hast').Root = u('root', [
		u('element', { tagName: 'h1', properties: {} }, [u('text', 'Hello, World!')])
	]);
</script>

<Hast {ast} />
