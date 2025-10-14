import { type ComponentProps, mount } from 'svelte';
import { beforeEach, describe, expect, test } from 'vitest';
import Root from './root.svelte';

describe('Root', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });

    const it = test.extend<{ props: ComponentProps<typeof Root> }>({
        props: {
            node: {
                type: 'root', children: [{ type: 'text', value: 'Hello, World!' }]
            }
        }
    });

    it('renders <div>Hello, World!</div>', ({ props }) => {
        mount(Root, { props, target: document.body });

        expect(document.body.innerHTML).toContain('Hello, World!');
    });
});
