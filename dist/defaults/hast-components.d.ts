declare module '@accuser/svelte-unist' {
    interface ComponentMap {
        comment: import('hast').Comment;
        doctype: import('hast').Doctype;
        element: import('hast').Element;
        root: import('hast').Root;
        text: import('hast').Text;
    }
}
declare const _default: {
    comment: import("svelte").Component<import("hast").Comment, {}, "">;
    doctype: import("svelte").Component<import("hast").Doctype, {}, "">;
    element: import("svelte").Component<import("hast").Element, {}, "">;
    root: import("svelte").Component<import("hast").Root, {}, "">;
    text: import("svelte").Component<import("hast").Text, {}, "">;
};
export default _default;
