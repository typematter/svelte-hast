import '@typematter/svelte-unist';
import { Unist } from '@typematter/svelte-unist';
import { type ComponentProps, mount } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test } from 'vitest';
import Root from './root.svelte';

describe('Root', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });

    const it = test.extend<{ props: ComponentProps<typeof Unist> }>({
        props: {
            ast: u('root', [u('text', { value: 'Hello, World!' })]),
            components: { root: Root }
        }
    });

    it('renders <div>Hello, World!</div>', ({ props }) => {
        mount(Unist, { props, target: document.body });

        expect(document.body.innerHTML).toContain('Hello, World!');
    });
});
