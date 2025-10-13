declare module '@accuser/svelte-unist' {
    interface ComponentMap {
        comment: import('hast').Comment;
        doctype: import('hast').Doctype;
        element: import('hast').Element;
        root: import('hast').Root;
        text: import('hast').Text;
    }
}
export declare const components: {
    comment: import("svelte").Component<{
        node: import("hast").Comment;
    }, {}, "">;
    doctype: import("svelte").Component<{
        node: import("hast").Doctype;
    }, {}, "">;
    element: import("svelte").Component<{
        node: import("hast").Element;
    }, {}, "">;
    root: import("svelte").Component<{
        node: import("hast").Root;
    }, {}, "">;
    text: import("svelte").Component<{
        node: import("hast").Text;
    }, {}, "">;
};
export * from './comment/index.js';
export * from './doctype/index.js';
export * from './element/index.js';
export * from './root/index.js';
export * from './text/index.js';
