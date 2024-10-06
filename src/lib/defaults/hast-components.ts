import Comment from '$lib/components/Comment.svelte';
import Doctype from '$lib/components/Doctype.svelte';
import Element from '$lib/components/Element.svelte';
import Root from '$lib/components/Root.svelte';
import Text from '$lib/components/Text.svelte';
import type { Components } from '@accuser/svelte-unist';

declare module '@accuser/svelte-unist' {
	export interface ComponentMap {
		comment: import('hast').Comment;
		doctype: import('hast').Doctype;
		element: import('hast').Element;
		root: import('hast').Root;
		text: import('hast').Text;
	}
}

export default {
	comment: Comment,
	doctype: Doctype,
	element: Element,
	root: Root,
	text: Text
} satisfies Components;
