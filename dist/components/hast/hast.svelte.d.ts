import { Unist } from '@accuser/svelte-unist';
import type { ComponentProps } from 'svelte';
type $$ComponentProps = {
    ast: import('hast').Root;
} & Omit<ComponentProps<typeof Unist>, 'ast'>;
declare const Hast: import("svelte").Component<$$ComponentProps, {}, "">;
type Hast = ReturnType<typeof Hast>;
export default Hast;
