declare module '@accuser/svelte-unist' {
	interface ComponentMap {
		element: import('hast').Element;
	}
}

export { default as Element } from './element.svelte';
