<script lang="ts" module>
	declare module '@accuser/svelte-unist' {
		export interface ComponentMap {
			comment: import('hast').Comment;
			doctype: import('hast').Doctype;
			element: import('hast').Element;
			root: import('hast').Root;
			text: import('hast').Text;
		}
	}
</script>

<script lang="ts">
	import * as Unist from '@accuser/svelte-unist';
	import Comment from './comment.svelte';
	import Doctype from './doctype.svelte';
	import Element from './element.svelte';
	import Root from './root.svelte';
	import Text from './text.svelte';

	let { ast, ...context }: { ast: import('hast').Root } & Unist.UnistContext = $props();

	let { components = {}, ...rest } = $derived(context);

	const defaultComponents = {
		comment: Comment,
		doctype: Doctype,
		element: Element,
		root: Root,
		text: Text
	} satisfies Unist.Components;
</script>

<Unist.Root {ast} components={{ ...defaultComponents, ...components }} {test} {...rest} />
