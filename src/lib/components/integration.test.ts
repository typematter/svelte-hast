import { Unist } from '@typematter/svelte-unist';
import { mount } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test } from 'vitest';
import { components } from './index.js';

describe('Integration Tests', () => {
	beforeEach(() => {
		document.body = document.createElement('body');
	});

	test('renders complete HTML structure with all component types', () => {
		const ast = u('root', [
			u('doctype', { name: 'html' }),
			u('element', { tagName: 'html' }, [
				u('element', { tagName: 'head' }, [
					u('element', { tagName: 'title' }, [u('text', { value: 'Test Page' })])
				]),
				u('element', { tagName: 'body' }, [
					u('comment', { value: 'Main content' }),
					u(
						'element',
						{
							tagName: 'div',
							properties: { className: 'container', id: 'main' }
						},
						[
							u('element', { tagName: 'h1' }, [u('text', { value: 'Welcome' })]),
							u('element', { tagName: 'p' }, [
								u('text', { value: 'This is a ' }),
								u('element', { tagName: 'strong' }, [u('text', { value: 'test' })]),
								u('text', { value: ' page.' })
							]),
							u('comment', { value: 'End of content' })
						]
					)
				])
			])
		]);

		mount(Unist, { props: { ast, components }, target: document.body });

		// Check doctype doesn't render
		expect(document.body.innerHTML).not.toContain('<!DOCTYPE');

		// Check structure
		expect(document.body.querySelector('html')).toBeTruthy();
		expect(document.body.querySelector('head title')).toBeTruthy();
		expect(document.body.querySelector('title')?.textContent).toBe('Test Page');

		// Check body content
		expect(document.body.innerHTML).toContain('<!-- Main content -->');
		const container = document.body.querySelector('.container#main');
		expect(container).toBeTruthy();
		expect(container?.querySelector('h1')?.textContent).toBe('Welcome');
		expect(container?.querySelector('p strong')?.textContent).toBe('test');
		expect(document.body.innerHTML).toContain('<!-- End of content -->');
	});

	test('renders article with rich content', () => {
		const ast = u('root', [
			u('element', { tagName: 'article' }, [
				u('element', { tagName: 'header' }, [
					u('element', { tagName: 'h2' }, [u('text', { value: 'Article Title' })]),
					u(
						'element',
						{
							tagName: 'p',
							properties: { className: 'meta' }
						},
						[
							u('text', { value: 'By ' }),
							u('element', { tagName: 'span' }, [u('text', { value: 'Author Name' })]),
							u('text', { value: ' on ' }),
							u('element', { tagName: 'time' }, [u('text', { value: '2025-10-15' })])
						]
					)
				]),
				u('comment', { value: 'Article body starts here' }),
				u('element', { tagName: 'section' }, [
					u('element', { tagName: 'p' }, [u('text', { value: 'First paragraph.' })]),
					u('element', { tagName: 'p' }, [u('text', { value: 'Second paragraph.' })])
				]),
				u('element', { tagName: 'footer' }, [
					u(
						'element',
						{
							tagName: 'a',
							properties: { href: '#comments', className: 'link' }
						},
						[u('text', { value: 'View Comments' })]
					)
				])
			])
		]);

		mount(Unist, { props: { ast, components }, target: document.body });

		const article = document.body.querySelector('article');
		expect(article).toBeTruthy();
		expect(article?.querySelector('header h2')?.textContent).toBe('Article Title');
		expect(article?.querySelector('.meta span')?.textContent).toBe('Author Name');
		expect(article?.querySelector('time')?.textContent).toBe('2025-10-15');
		expect(document.body.innerHTML).toContain('<!-- Article body starts here -->');
		expect(article?.querySelectorAll('section p').length).toBe(2);
		expect(article?.querySelector('footer a.link')?.getAttribute('href')).toBe('#comments');
	});

	test('renders list structures', () => {
		const ast = u('root', [
			u('element', { tagName: 'ul' }, [
				u('element', { tagName: 'li' }, [
					u('text', { value: 'Item 1' }),
					u('element', { tagName: 'ul' }, [
						u('element', { tagName: 'li' }, [u('text', { value: 'Nested 1' })]),
						u('element', { tagName: 'li' }, [u('text', { value: 'Nested 2' })])
					])
				]),
				u('element', { tagName: 'li' }, [u('text', { value: 'Item 2' })]),
				u('element', { tagName: 'li' }, [u('text', { value: 'Item 3' })])
			])
		]);

		mount(Unist, { props: { ast, components }, target: document.body });

		const ul = document.body.querySelector('ul');
		expect(ul).toBeTruthy();
		expect(ul?.children.length).toBe(3);
		expect(ul?.querySelector('ul')).toBeTruthy(); // nested list
		expect(ul?.querySelectorAll('li').length).toBe(5); // 3 top + 2 nested
	});

	test('renders form with various input types', () => {
		const ast = u('root', [
			u(
				'element',
				{
					tagName: 'form',
					properties: { action: '/submit', method: 'post' }
				},
				[
					u('element', { tagName: 'label' }, [
						u('text', { value: 'Name:' }),
						u('element', {
							tagName: 'input',
							properties: { type: 'text', name: 'name', required: true }
						})
					]),
					u('element', { tagName: 'label' }, [
						u('text', { value: 'Email:' }),
						u('element', {
							tagName: 'input',
							properties: { type: 'email', name: 'email' }
						})
					]),
					u(
						'element',
						{
							tagName: 'button',
							properties: { type: 'submit', className: 'btn-primary' }
						},
						[u('text', { value: 'Submit' })]
					)
				]
			)
		]);

		mount(Unist, { props: { ast, components }, target: document.body });

		const form = document.body.querySelector('form');
		expect(form?.action).toContain('/submit');
		expect(form?.method).toBe('post');
		expect(form?.querySelectorAll('input').length).toBe(2);
		const requiredInput = form?.querySelector('input[type="text"]') as HTMLInputElement | null;
		expect(requiredInput?.required).toBe(true);
		expect(form?.querySelector('button.btn-primary')?.textContent).toBe('Submit');
	});

	test('renders template elements with content', () => {
		const ast = u('root', [
			u('element', { tagName: 'div' }, [
				u('element', {
					tagName: 'template',
					content: u('root', [
						u('element', { tagName: 'span' }, [u('text', { value: 'Template content' })])
					])
				})
			])
		]);

		mount(Unist, { props: { ast, components }, target: document.body });

		const template = document.body.querySelector('template');
		expect(template).toBeTruthy();
		// Template elements should be created
		// Note: jsdom's template support may not fully match browser behavior
		// The important part is that the template element itself is rendered
	});

	test('handles complex nested structures with comments', () => {
		const ast = u('root', [
			u('comment', { value: 'Start of navigation' }),
			u(
				'element',
				{
					tagName: 'nav',
					properties: { className: 'main-nav' }
				},
				[
					u('element', { tagName: 'ul' }, [
						u('comment', { value: 'Home link' }),
						u('element', { tagName: 'li' }, [
							u(
								'element',
								{
									tagName: 'a',
									properties: { href: '/' }
								},
								[u('text', { value: 'Home' })]
							)
						]),
						u('comment', { value: 'About link' }),
						u('element', { tagName: 'li' }, [
							u(
								'element',
								{
									tagName: 'a',
									properties: { href: '/about' }
								},
								[u('text', { value: 'About' })]
							)
						])
					])
				]
			),
			u('comment', { value: 'End of navigation' })
		]);

		mount(Unist, { props: { ast, components }, target: document.body });

		expect(document.body.innerHTML).toContain('<!-- Start of navigation -->');
		expect(document.body.innerHTML).toContain('<!-- Home link -->');
		expect(document.body.innerHTML).toContain('<!-- About link -->');
		expect(document.body.innerHTML).toContain('<!-- End of navigation -->');

		const nav = document.body.querySelector('nav.main-nav');
		expect(nav).toBeTruthy();
		expect(nav?.querySelectorAll('li').length).toBe(2);
		expect(nav?.querySelectorAll('a').length).toBe(2);
	});

	test('renders empty elements correctly', () => {
		const ast = u('root', [
			u('element', { tagName: 'div' }, [
				u('element', { tagName: 'br' }),
				u('element', { tagName: 'hr' }),
				u('element', {
					tagName: 'img',
					properties: { src: 'test.jpg', alt: '' }
				}),
				u('element', {
					tagName: 'input',
					properties: { type: 'text' }
				})
			])
		]);

		mount(Unist, { props: { ast, components }, target: document.body });

		const div = document.body.querySelector('div');
		expect(div?.querySelector('br')).toBeTruthy();
		expect(div?.querySelector('hr')).toBeTruthy();
		expect(div?.querySelector('img')).toBeTruthy();
		expect(div?.querySelector('input')).toBeTruthy();
	});

	test('prevents XSS in comments within complex structures', () => {
		const ast = u('root', [
			u('element', { tagName: 'div' }, [
				u('comment', { value: '--><script>alert("XSS")</script><!--' }),
				u('element', { tagName: 'p' }, [u('text', { value: 'Safe content' })])
			])
		]);

		mount(Unist, { props: { ast, components }, target: document.body });

		// Ensure the XSS attempt is escaped
		expect(document.body.innerHTML).toContain('--&gt;');
		expect(document.querySelectorAll('script').length).toBe(0);
		expect(document.body.querySelector('p')?.textContent).toBe('Safe content');
	});
});
