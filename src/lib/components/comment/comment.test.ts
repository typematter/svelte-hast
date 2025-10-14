import { mount, type ComponentProps } from 'svelte';
import { beforeEach, describe, expect, test } from 'vitest';
import Comment from './comment.svelte';

describe('Comment', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });

    const it = test.extend<{ props: ComponentProps<typeof Comment> }>({
        props: {
            node: { type: 'comment', value: 'Hello, World!' }
        }
    });

    it('renders <!-- Hello, World! -->', ({ props }) => {
        mount(Comment, { props, target: document.body });

        expect(document.body.innerHTML).toContain('<!-- Hello, World! -->');
    });
});
