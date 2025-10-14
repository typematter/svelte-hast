declare module '@typematter/svelte-unist' {
    interface ComponentMap {
        element: import('hast').Element;
    }
}
export { default as Element } from './element.svelte';
