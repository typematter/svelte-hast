<script lang="ts">
	import type { Comment } from 'hast';

	let { value }: Comment = $props();
</script>

{@html `<!--${value}-->`}
