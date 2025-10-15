import { Unist } from '@typematter/svelte-unist';
import { mount, type ComponentProps } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test } from 'vitest';
import Doctype from './doctype.svelte';

describe('Doctype', () => {
	beforeEach(() => {
		document.body = document.createElement('body');
	});

	const it = test.extend<{ props: ComponentProps<typeof Unist> }>({
		props: {
			ast: u('doctype', { name: 'html' }),
			components: { doctype: Doctype }
		}
	});

	it('renders nothing (included for completeness)', ({ props }) => {
		mount(Unist, { props, target: document.body });

		// Doctype component should not add any visible content
		// since it's used within existing web pages
		// (Svelte may add comment markers for reactivity)
		const bodyContent = document.body.innerHTML;
		expect(bodyContent).not.toContain('doctype');
		expect(bodyContent).not.toContain('<!DOCTYPE');
		// Only comment markers from Svelte should be present
		expect(bodyContent.replace(/<!---->/g, '')).toBe('');
	});

	it('does not throw with different doctype names', () => {
		const props = {
			ast: u('doctype', { name: 'html5' }),
			components: { doctype: Doctype }
		};

		expect(() => {
			mount(Unist, { props, target: document.body });
		}).not.toThrow();
	});
});
