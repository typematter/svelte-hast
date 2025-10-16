<script lang="ts">
	import { Node } from '@typematter/svelte-unist';

	let { node }: { node: import('hast').Root } = $props();

	let { children } = $derived(node);
</script>

{#each children as child (child)}<Node node={child} />{/each}
