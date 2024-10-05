<script lang="ts">
	import defaultComponents from '../defaults/default-components.js';
	import { Unist, setUnistContext } from '@accuser/svelte-unist';

	let {
		ast,
		...context
	}: { ast: import('hast').Root } & Partial<ReturnType<typeof setUnistContext>> = $props();

	setUnistContext({ ...context, components: { ...defaultComponents, ...context.components } });
</script>

<Unist {ast} />
