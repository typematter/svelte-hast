declare module '@accuser/svelte-unist' {
	interface ComponentMap {
		doctype: import('hast').Doctype;
	}
}

export { default as Doctype } from './doctype.svelte';
