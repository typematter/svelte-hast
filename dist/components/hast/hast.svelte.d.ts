declare module '@accuser/svelte-unist' {
    interface ComponentMap {
        comment: import('hast').Comment;
        doctype: import('hast').Doctype;
        element: import('hast').Element;
        root: import('hast').Root;
        text: import('hast').Text;
    }
}
import * as Unist from '@accuser/svelte-unist';
import type { ComponentProps } from 'svelte';
type $$ComponentProps = {
    ast: import('hast').Root;
} & ComponentProps<typeof Unist.Root>;
declare const Hast: import("svelte").Component<$$ComponentProps, {}, "">;
type Hast = ReturnType<typeof Hast>;
export default Hast;
