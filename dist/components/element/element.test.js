import { Unist } from '@typematter/svelte-unist';
import { mount } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test } from 'vitest';
import Element from './element.svelte';
describe('Element', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });
    const it = test.extend({
        props: {
            ast: u('element', { tagName: "div" }, [u('text', { value: 'Hello, World!' })]),
            components: { element: Element }
        }
    });
    it('renders <div>Hello, World!</div>', ({ props }) => {
        mount(Unist, { props, target: document.body });
        expect(document.body.innerHTML).toContain('<div>');
        expect(document.body.innerHTML).toContain('Hello, World!');
        expect(document.body.innerHTML).toContain('</div>');
    });
});
