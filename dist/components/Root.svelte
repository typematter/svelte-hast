<script lang="ts">
	import { Node } from '@accuser/svelte-unist';
	import type { Root } from 'hast';

	let { children }: Root = $props();
</script>

{#each children as node}<Node {...node} />{/each}
