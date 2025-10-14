import { type ComponentProps, mount } from 'svelte';
import { beforeEach, describe, expect, test } from 'vitest';
import Element from './element.svelte';

describe('Element', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });

    const it = test.extend<{ props: ComponentProps<typeof Element> }>({
        props: {
            node: {
                type: 'element', tagName: 'div', properties: {}, children: [{ type: 'text', value: 'Hello, World!' }]
            }
        }
    });

    it('renders <div>Hello, World!</div>', ({ props }) => {
        mount(Element, { props, target: document.body });

        expect(document.body.innerHTML).toContain('<div>');
        expect(document.body.innerHTML).toContain('Hello, World!');
        expect(document.body.innerHTML).toContain('</div>');
    });
});
