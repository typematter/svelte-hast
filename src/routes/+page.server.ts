import type { PageServerLoad } from './$types.js';

import { u } from 'unist-builder';

export const load = (async () => {
	const ast: import('hast').Root = u('root', [
		u('element', { tagName: 'h1', properties: {} }, [u('text', 'Hello, World!')])
	]);

	return { ast };
}) satisfies PageServerLoad;
