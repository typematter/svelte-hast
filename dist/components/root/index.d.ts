declare module '@accuser/svelte-unist' {
    interface ComponentMap {
        root: import('hast').Root;
    }
}
export { default as Root } from './root.svelte';
