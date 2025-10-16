import { Unist } from '@typematter/svelte-unist';
import { mount } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test } from 'vitest';
import { components } from './index.js';
describe('Edge Cases', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });
    describe('Root component edge cases', () => {
        test('handles root with undefined children gracefully', () => {
            const ast = u('root');
            expect(() => {
                mount(Unist, { props: { ast, components }, target: document.body });
            }).not.toThrow();
        });
        test('handles root with empty children array', () => {
            const ast = u('root', []);
            mount(Unist, { props: { ast, components }, target: document.body });
            expect(document.body.textContent).toBe('');
        });
    });
    describe('Text component edge cases', () => {
        test('handles empty string value', () => {
            const ast = u('root', [u('text', { value: '' })]);
            mount(Unist, { props: { ast, components }, target: document.body });
            expect(document.body.textContent).toBe('');
        });
        test('handles text with special characters', () => {
            const ast = u('root', [u('text', { value: '<script>alert("xss")</script>' })]);
            mount(Unist, { props: { ast, components }, target: document.body });
            // Text should be escaped, not executed as HTML
            expect(document.body.textContent).toContain('<script>');
            expect(document.querySelectorAll('script').length).toBe(0);
        });
        test('handles text with HTML entities', () => {
            const ast = u('root', [u('text', { value: '&lt;div&gt;&amp;&quot;' })]);
            mount(Unist, { props: { ast, components }, target: document.body });
            expect(document.body.textContent).toBe('&lt;div&gt;&amp;&quot;');
        });
        test('handles text with newlines and whitespace', () => {
            const ast = u('root', [u('text', { value: 'Line 1\n  Line 2\t\tLine 3' })]);
            mount(Unist, { props: { ast, components }, target: document.body });
            expect(document.body.textContent).toContain('\n');
            expect(document.body.textContent).toContain('\t');
        });
    });
    describe('Element component edge cases', () => {
        test('handles element with undefined properties', () => {
            const ast = u('root', [u('element', { tagName: 'div', properties: undefined })]);
            expect(() => {
                mount(Unist, { props: { ast, components }, target: document.body });
            }).not.toThrow();
            const div = document.querySelector('div');
            expect(div).toBeTruthy();
        });
        test('handles element with null properties', () => {
            const ast = u('root', [u('element', { tagName: 'div', properties: null })]);
            expect(() => {
                mount(Unist, { props: { ast, components }, target: document.body });
            }).not.toThrow();
            const div = document.querySelector('div');
            expect(div).toBeTruthy();
        });
        test('handles element with reserved property names', () => {
            const ast = u('root', [
                u('element', {
                    tagName: 'div',
                    properties: {
                        onclick: 'alert("click")',
                        onload: 'alert("load")',
                        style: 'color: red; background: blue;',
                        className: 'test-class'
                    }
                })
            ]);
            mount(Unist, { props: { ast, components }, target: document.body });
            const div = document.querySelector('div');
            expect(div).toBeTruthy();
            expect(div?.className).toBe('test-class');
            expect(div?.getAttribute('style')).toContain('color');
        });
        test('handles element with boolean properties', () => {
            const ast = u('root', [
                u('element', {
                    tagName: 'input',
                    properties: {
                        type: 'checkbox',
                        checked: true,
                        disabled: false,
                        readonly: true
                    }
                })
            ]);
            mount(Unist, { props: { ast, components }, target: document.body });
            const input = document.querySelector('input');
            expect(input).toBeTruthy();
            expect(input?.checked).toBe(true);
            // Note: disabled: false may still set the attribute, which is a Svelte behavior
        });
        test('handles element with numeric property values', () => {
            const ast = u('root', [
                u('element', {
                    tagName: 'input',
                    properties: {
                        type: 'number',
                        min: 0,
                        max: 100,
                        step: 5,
                        value: 50
                    }
                })
            ]);
            mount(Unist, { props: { ast, components }, target: document.body });
            const input = document.querySelector('input');
            expect(input).toBeTruthy();
            expect(input?.getAttribute('min')).toBe('0');
            expect(input?.getAttribute('max')).toBe('100');
        });
        test('handles element with undefined children', () => {
            const ast = u('root', [u('element', { tagName: 'div', children: undefined })]);
            expect(() => {
                mount(Unist, { props: { ast, components }, target: document.body });
            }).not.toThrow();
            const div = document.querySelector('div');
            expect(div).toBeTruthy();
        });
        test('handles template element with undefined content', () => {
            const ast = u('root', [u('element', { tagName: 'template', content: undefined })]);
            expect(() => {
                mount(Unist, { props: { ast, components }, target: document.body });
            }).not.toThrow();
            const template = document.querySelector('template');
            expect(template).toBeTruthy();
        });
        test('handles deeply nested structure', () => {
            // Create a deeply nested structure (10 levels)
            let deepAst = u('text', { value: 'Deep content' });
            for (let i = 0; i < 10; i++) {
                deepAst = u('element', { tagName: 'div' }, [deepAst]);
            }
            const ast = u('root', [deepAst]);
            expect(() => {
                mount(Unist, { props: { ast, components }, target: document.body });
            }).not.toThrow();
            expect(document.body.textContent).toBe('Deep content');
            expect(document.querySelectorAll('div').length).toBe(10);
        });
    });
    describe('Comment component edge cases', () => {
        test('handles empty comment', () => {
            const ast = u('root', [u('comment', { value: '' })]);
            mount(Unist, { props: { ast, components }, target: document.body });
            expect(document.body.innerHTML).toContain('<!--  -->');
        });
        test('handles comment with only --> sequence', () => {
            const ast = u('root', [u('comment', { value: '-->' })]);
            mount(Unist, { props: { ast, components }, target: document.body });
            // Should be escaped
            expect(document.body.innerHTML).toContain('--&gt;');
        });
        test('handles comment with multiple --> sequences', () => {
            const ast = u('root', [u('comment', { value: '--> test --> another -->' })]);
            mount(Unist, { props: { ast, components }, target: document.body });
            // All should be escaped
            const matches = (document.body.innerHTML.match(/--&gt;/g) || []).length;
            expect(matches).toBe(3);
        });
        test('handles comment with special characters', () => {
            const ast = u('root', [u('comment', { value: 'Test <>&"\' special chars' })]);
            mount(Unist, { props: { ast, components }, target: document.body });
            expect(document.body.innerHTML).toContain('Test <>&');
        });
    });
});
