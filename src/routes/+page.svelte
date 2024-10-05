<script lang="ts">
	import Hast from '$lib/components/Hast.svelte';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();

	let { ast } = $derived(data);
</script>

<article class="prose prose-lg max-w-prose mx-auto prose-slate dark:prose-invert">
	<Hast {ast} />
</article>
