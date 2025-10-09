<script lang="ts">
	let { node }: { node: import('hast').Text } = $props();

	let { value } = $derived(node);
</script>

{value}
