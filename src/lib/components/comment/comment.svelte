<script lang="ts">
	let { node }: { node: import('hast').Comment } = $props();

	let { value } = $derived(node);

	let safeValue = $derived(value.replace(/-->/g, '--&gt;'));
</script>

{@html `<!-- ${safeValue} -->`}
