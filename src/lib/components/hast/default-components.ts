import type { Components } from '@accuser/svelte-unist';
import Comment from './comment.svelte';
import Doctype from './doctype.svelte';
import Element from './element.svelte';
import Root from './root.svelte';
import Text from './text.svelte';

declare module '@accuser/svelte-unist' {
	export interface ComponentMap {
		comment: import('hast').Comment;
		doctype: import('hast').Doctype;
		element: import('hast').Element;
		root: import('hast').Root;
		text: import('hast').Text;
	}
}

export const defaultComponents = {
	comment: Comment,
	doctype: Doctype,
	element: Element,
	root: Root,
	text: Text
} satisfies Components;
