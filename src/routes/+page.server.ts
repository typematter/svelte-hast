import { u } from 'unist-builder';
import type { PageServerLoad } from './$types.js';

export const load = (async () => {
	return {
		ast: u('root', [u('element', { tagName: 'h1' }, [u('text', 'Hello, World!')])])
	};
}) satisfies PageServerLoad;
