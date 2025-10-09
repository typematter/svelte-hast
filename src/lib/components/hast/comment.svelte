<script lang="ts">
	let { node }: { node: import('hast').Comment } = $props();

	let { value } = $derived(node);
</script>

{@html `<!--${value}-->`}
