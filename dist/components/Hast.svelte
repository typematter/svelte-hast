<script lang="ts">
	import hastComponents from '../defaults/hast-components.js';
	import { Unist, type UnistProps } from '@accuser/svelte-unist';

	let { ast, components, ...rest }: { ast: import('hast').Root } & UnistProps = $props();
</script>

<Unist {ast} components={{ ...hastComponents, ...components }} {...rest} />
