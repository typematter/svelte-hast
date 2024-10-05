# Svelte Markdown Provider

A [Svelte 5](https://svelte-5-preview.vercel.app/docs/introduction) component for rendering [GitHub Flavored Markdown](https://github.github.com/gfm/) as components with fine-grained reactivity.

## Example

- [GitHub Flavour Markdown](gfm)

## Installation

```bash
# or yarn, or pnpm
npm install --save @accuser/svelte-markdown-gfm
```

## Usage

```svelte
<script>
  import Markdown from '@accuser/svelte-markdown-gfm';
</script>

<Markdown>
  # Hello, world!
</Markdown>
```
