<script lang="ts">
	import hastComponents from '$lib/defaults/hast-components.js';
	import { Unist, type Props } from '@accuser/svelte-unist';

	let { ast, components, ...rest }: { ast: import('hast').Root } & Props = $props();
</script>

<Unist {ast} components={{ ...hastComponents, ...components }} {...rest} />
