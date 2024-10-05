# Svelte Markdown Provider

Transforms Markdown source (as a `string`) or a [Markdown AST](https://github.com/syntax-tree/mdast) into Svelte components.

> [!NOTE]
> You probably don't want this - look at [mdsvex](https://mdsvex.pngwn.io) or [svelte-markdown](https://github.com/pablo-abc/svelte-markdown) instead.

## Installing

Add the `@accuser/svelte-markdown-provider` package dependency to your [Svelte](https://svelte.dev) / [SvelteKit](https://kit.svelte.dev) project:

```sh
npm install --save-dev @accuser/svelte-markdown-provider
```

## Usage

### Markdown `string`

```svelte
<script>
    import { Markdown } from '@accuser/svelte-markdown-provider';

    const source = 'Hello, World!';
</script>

<Markdown {src} />
```

### Markdown AST

```svelte
<script>
    import { Markdown } from '@accuser/svelte-markdown-provider';

    const ast = {
        type: 'root',
        children: [{
           type: 'paragraph',
           children: [{
                type: 'text',
                value: 'Hello, World!'
            }]
        }]
    };
</script>

<Markdown {ast} />
```
