<script lang="ts">
	import { Node } from '@typematter/svelte-unist';
	import type { Properties } from 'hast';

	let { node }: { node: import('hast').Element } = $props();

	let { children, content, properties, tagName } = $derived(node);

	let { className, ...rest } = $derived(
		(properties as Properties & { className?: string | null }) || {}
	);

	let hasContent = $derived(
		(tagName === 'template' && content === undefined) || (children && children.length > 0)
	);
</script>

{#if hasContent}<svelte:element this={tagName} class={className} {...rest}
		>{#if tagName === 'template' && content}<Node
				node={content}
			/>{:else if children}{#each children as child (child)}<Node
					node={child}
				/>{/each}{/if}</svelte:element
	>{:else}<svelte:element this={tagName} class={className} {...rest} />{/if}
