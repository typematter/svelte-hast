import { Unist } from '@typematter/svelte-unist';
import { mount } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test } from 'vitest';
import Text from './text.svelte';
describe('Text', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });
    const it = test.extend({
        props: {
            ast: u('text', { value: 'Hello, World!' }),
            components: { text: Text }
        }
    });
    it('renders Hello, World!', ({ props }) => {
        mount(Unist, { props, target: document.body });
        expect(document.body.innerHTML).toContain('Hello, World!');
    });
});
