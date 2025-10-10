import { Unist } from '@accuser/svelte-unist';
import type { ComponentProps } from 'svelte';
type $$ComponentProps = {
    ast: import('hast').Root;
} & ComponentProps<typeof Unist>;
declare const Hast: import("svelte").Component<$$ComponentProps, {}, "">;
type Hast = ReturnType<typeof Hast>;
export default Hast;
