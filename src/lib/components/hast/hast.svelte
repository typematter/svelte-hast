<script lang="ts">
	import { Unist } from '@accuser/svelte-unist';
	import type { ComponentProps } from 'svelte';
	import { defaultComponents } from './default-components.js';

	let {
		ast,
		components = {},
		...rest
	}: { ast: import('hast').Root } & Omit<ComponentProps<typeof Unist>, 'ast'> = $props();
</script>

<Unist {ast} components={{ ...defaultComponents, ...components }} {...rest} />
