<script lang="ts">
	import { Node } from '@accuser/svelte-unist';

	let { node }: { node: import('hast').Root } = $props();

	let { children } = $derived(node);
</script>

{#each children as child}<Node node={child} />{/each}
