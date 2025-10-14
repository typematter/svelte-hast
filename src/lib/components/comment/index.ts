declare module '@typematter/svelte-unist' {
	interface ComponentMap {
		comment: import('hast').Comment;
	}
}

export { default as Comment } from './comment.svelte';
