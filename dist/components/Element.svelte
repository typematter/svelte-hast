<script lang="ts">
	import { Node } from '@accuser/svelte-unist';
	import type { Element, Properties } from 'hast';

	let { children, content, properties, tagName }: Element = $props();

	let { className, ...rest } = $derived(properties as Properties & { className: string });
</script>

<svelte:element this={tagName} class={className} {...rest}
	>{#if tagName === 'template' && content}<Node {...content} />{:else}{#each children as node}<Node
				{...node}
			/>{/each}{/if}</svelte:element
>
