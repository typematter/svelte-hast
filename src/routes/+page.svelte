<script lang="ts">
	import { components } from '$lib/components/index.js';
	import { Unist } from '@typematter/svelte-unist';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();

	let { ast } = $derived(data);
</script>

<Unist {ast} {components} />
