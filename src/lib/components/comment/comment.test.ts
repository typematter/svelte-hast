import { Unist } from '@typematter/svelte-unist';
import { mount, type ComponentProps } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test } from 'vitest';
import Comment from './comment.svelte';

describe('Comment', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });

    const it = test.extend<{ props: ComponentProps<typeof Unist> }>({
        props: {
            ast: u('comment', { value: 'Hello, World!' }),
            components: { comment: Comment }
        }
    });

    it('renders <!-- Hello, World! -->', ({ props }) => {
        mount(Unist, { props, target: document.body });

        expect(document.body.innerHTML).toContain('<!-- Hello, World! -->');
    });

    it('escapes --> to prevent XSS', () => {
        const maliciousProps = {
            ast: u('comment', { value: '--><script>alert("XSS")</script><!--' }),
            components: { comment: Comment }
        };

        mount(Unist, { props: maliciousProps, target: document.body });

        // Should escape --> to --&gt; preventing comment breakout
        expect(document.body.innerHTML).toContain('--&gt;');
        expect(document.body.innerHTML).not.toContain('--><script>');
        // Script should not be executed/present as executable code
        expect(document.querySelectorAll('script').length).toBe(0);
    });
});
