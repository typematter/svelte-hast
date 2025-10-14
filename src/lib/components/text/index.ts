declare module '@typematter/svelte-unist' {
	interface ComponentMap {
		text: import('hast').Text;
	}
}

export { default as Text } from './text.svelte';
