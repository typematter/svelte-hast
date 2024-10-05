declare const Hast: import("svelte").Component<{
    ast: import("hast").Root;
} & Partial<import("@accuser/svelte-unist").UnistContext>, {}, "">;
export default Hast;
