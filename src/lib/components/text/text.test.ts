import { mount, type ComponentProps } from 'svelte';
import { beforeEach, describe, expect, test } from 'vitest';
import Text from './text.svelte';

describe('Text', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });

    const it = test.extend<{ props: ComponentProps<typeof Text> }>({
        props: {
            node: { type: 'text', value: 'Hello, World!' }
        }
    });

    it('renders Hello, World!', ({ props }) => {
        mount(Text, { props, target: document.body });

        expect(document.body.innerHTML).toContain('Hello, World!');
    });
});
