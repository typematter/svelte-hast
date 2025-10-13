import { Comment } from './comment/index.js';
import { Doctype } from './doctype/index.js';
import { Element } from './element/index.js';
import { Root } from './root/index.js';
import { Text } from './text/index.js';
export const components = {
    comment: Comment,
    doctype: Doctype,
    element: Element,
    root: Root,
    text: Text
};
export * from './comment/index.js';
export * from './doctype/index.js';
export * from './element/index.js';
export * from './root/index.js';
export * from './text/index.js';
