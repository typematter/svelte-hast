declare module '@typematter/svelte-unist' {
    interface ComponentMap {
        root: import('hast').Root;
    }
}
export { default as Root } from './root.svelte';
