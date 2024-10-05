<script lang="ts">
	import hastComponents from '$lib/defaults/hast-components.js';
	import { Unist, type UnistContext } from '@accuser/svelte-unist';

	let { ast, components, ...rest }: { ast: import('hast').Root } & UnistContext = $props();
</script>

<Unist {ast} components={{ ...hastComponents, ...components }} {...rest} />
