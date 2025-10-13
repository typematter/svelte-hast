import { Comment } from './comment/index.js';
import { Doctype } from './doctype/index.js';
import { Element } from './element/index.js';
import { Root } from './root/index.js';
import { Text } from './text/index.js';

declare module '@accuser/svelte-unist' {
	export interface ComponentMap {
		comment: import('hast').Comment;
		doctype: import('hast').Doctype;
		element: import('hast').Element;
		root: import('hast').Root;
		text: import('hast').Text;
	}
}

export const defaultHastComponents = {
	comment: Comment,
	doctype: Doctype,
	element: Element,
	root: Root,
	text: Text
} satisfies import('@accuser/svelte-unist').Components;

export * from './comment/index.js';
export * from './doctype/index.js';
export * from './element/index.js';
export * from './root/index.js';
export * from './text/index.js';
