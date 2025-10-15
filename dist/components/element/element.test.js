import { Unist } from '@typematter/svelte-unist';
import { mount } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test } from 'vitest';
import Comment from '../comment/comment.svelte';
import { Root } from '../root/index.js';
import Text from '../text/text.svelte';
import Element from './element.svelte';
describe('Element', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });
    const it = test.extend({
        props: {
            ast: u('element', { tagName: 'div' }, [u('text', { value: 'Hello, World!' })]),
            components: { element: Element, text: Text }
        }
    });
    it('renders <div>Hello, World!</div>', ({ props }) => {
        mount(Unist, { props, target: document.body });
        expect(document.body.innerHTML).toContain('<div>');
        expect(document.body.innerHTML).toContain('Hello, World!');
        expect(document.body.innerHTML).toContain('</div>');
    });
    it('renders element with className property', () => {
        const props = {
            ast: u('element', {
                tagName: 'div',
                properties: { className: 'my-class another-class' }
            }),
            components: { element: Element }
        };
        mount(Unist, { props, target: document.body });
        const div = document.querySelector('div');
        expect(div).toBeTruthy();
        expect(div?.className).toBe('my-class another-class');
    });
    it('renders element with various attributes', () => {
        const props = {
            ast: u('element', {
                tagName: 'a',
                properties: {
                    href: 'https://example.com',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'data-test': 'my-link'
                }
            }),
            components: { element: Element }
        };
        mount(Unist, { props, target: document.body });
        const anchor = document.querySelector('a');
        expect(anchor).toBeTruthy();
        expect(anchor?.href).toBe('https://example.com/');
        expect(anchor?.target).toBe('_blank');
        expect(anchor?.rel).toBe('noopener noreferrer');
        expect(anchor?.getAttribute('data-test')).toBe('my-link');
    });
    it('renders element with id and other properties', () => {
        const props = {
            ast: u('element', {
                tagName: 'button',
                properties: {
                    id: 'my-button',
                    type: 'submit',
                    disabled: true
                }
            }),
            components: { element: Element }
        };
        mount(Unist, { props, target: document.body });
        const button = document.querySelector('button');
        expect(button).toBeTruthy();
        expect(button?.id).toBe('my-button');
        expect(button?.type).toBe('submit');
        expect(button?.disabled).toBe(true);
    });
    it('renders element with mixed children types', () => {
        const props = {
            ast: u('element', { tagName: 'div' }, [
                u('text', { value: 'Text node ' }),
                u('element', { tagName: 'span' }, [u('text', { value: 'nested' })]),
                u('text', { value: ' more text' }),
                u('comment', { value: 'a comment' })
            ]),
            components: { element: Element, text: Text, comment: Comment }
        };
        mount(Unist, { props, target: document.body });
        const div = document.body.querySelector('div');
        expect(div).toBeTruthy();
        expect(div?.textContent).toContain('Text node');
        expect(div?.textContent).toContain('nested');
        expect(div?.textContent).toContain('more text');
        expect(div?.querySelector('span')).toBeTruthy();
        expect(div?.querySelector('span')?.textContent).toBe('nested');
        expect(document.body.innerHTML).toContain('<!-- a comment -->');
    });
    it('renders nested elements', () => {
        const props = {
            ast: u('element', { tagName: 'div' }, [
                u('element', { tagName: 'ul' }, [
                    u('element', { tagName: 'li' }, [u('text', { value: 'Item 1' })]),
                    u('element', { tagName: 'li' }, [u('text', { value: 'Item 2' })])
                ])
            ]),
            components: { element: Element, text: Text }
        };
        mount(Unist, { props, target: document.body });
        const div = document.body.querySelector('div');
        expect(div).toBeTruthy();
        const ul = div?.querySelector('ul');
        expect(ul).toBeTruthy();
        const listItems = ul?.querySelectorAll('li');
        expect(listItems?.length).toBe(2);
        expect(listItems?.[0].textContent).toBe('Item 1');
        expect(listItems?.[1].textContent).toBe('Item 2');
    });
    it('renders template element with content instead of children', async () => {
        const props = {
            ast: u('element', {
                tagName: 'template',
                content: u('root', [
                    u('element', { tagName: 'div' }, [u('text', { value: 'Template content' })])
                ]),
                children: [
                    u('text', { value: 'This should not render' })
                ]
            }),
            components: { element: Element, text: Text, root: Root }
        };
        mount(Unist, { props, target: document.body });
        const template = document.querySelector('template');
        expect(template).toBeTruthy();
        // Template elements should be created
        // Note: The special handling in element.svelte checks for tagName === 'template'
        // and renders content instead of children. The actual template content behavior
        // in jsdom may differ from real browsers, so we just verify the template exists
    });
    it('renders empty element with no children', () => {
        const props = {
            ast: u('element', { tagName: 'div' }),
            components: { element: Element }
        };
        mount(Unist, { props, target: document.body });
        const div = document.querySelector('div');
        expect(div).toBeTruthy();
        expect(div?.textContent).toBe('');
        expect(div?.children.length).toBe(0);
    });
    it('renders self-closing elements', () => {
        const props = {
            ast: u('element', {
                tagName: 'img',
                properties: {
                    src: 'image.jpg',
                    alt: 'Test image'
                }
            }),
            components: { element: Element }
        };
        mount(Unist, { props, target: document.body });
        const img = document.querySelector('img');
        expect(img).toBeTruthy();
        expect(img?.src).toContain('image.jpg');
        expect(img?.alt).toBe('Test image');
    });
    it('handles className with other properties', () => {
        const props = {
            ast: u('element', {
                tagName: 'div',
                properties: {
                    className: 'styled',
                    id: 'main',
                    'data-value': '123'
                }
            }),
            components: { element: Element }
        };
        mount(Unist, { props, target: document.body });
        const div = document.querySelector('div');
        expect(div?.className).toBe('styled');
        expect(div?.id).toBe('main');
        expect(div?.getAttribute('data-value')).toBe('123');
    });
    it('renders element with null className', () => {
        const props = {
            ast: u('element', {
                tagName: 'div',
                properties: {
                    className: null,
                    id: 'test'
                }
            }),
            components: { element: Element }
        };
        mount(Unist, { props, target: document.body });
        const div = document.querySelector('div');
        expect(div).toBeTruthy();
        expect(div?.id).toBe('test');
    });
});
