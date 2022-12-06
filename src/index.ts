import { Client } from '@notionhq/client';
import dbRenderer from './db-render';
import pageRenderer from './page-render';

/*
*  get page as a block via notion.blocks.children.list and return the results
*  check for has_children property; traverse those blocks, append, and repeat.
*  if no children, return the block
*  fetch page as a page to get properties and use them for SEO

*/

declare global {
	interface CacheStorage {
		default: CacheStorage;
	}
}

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	NOTION_TOKEN: string;
}

export type optionType = 'complete' | 'main';
// complete renders every single child block if has_children is true
// main is for the main page that contains children (blog posts) and renders only the titles of these children + ID

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const notion = new Client({
			auth: env.NOTION_TOKEN,
		});
		/* Routing
		 * /db/ -call db.fetch with existing Client and ID from request (todo)
		 * /page/  call page.fetch with existing Client and ID from request (todo)
		 */

		const cacheURL = new URL(request.url);
		// const cachePath = cacheURL.pathname;

		const cacheKey = new Request(cacheURL, request);
		const cache = caches.default;

		const cachedResponse = await cache.match(cacheKey);

		if (cachedResponse) {
			console.log('cache hit');
			return cachedResponse;
		}

		switch (true) {
			case request.url.endsWith('/page/'): {
				const id = 'd4b16510ac94464594077c39c99457bb'; // placeholder ID (we'll get ID from the OG POST req)
				if (id) {
					const response = new Response(
						JSON.stringify(await pageRenderer.fetch(notion, id))
					);
					response.headers.set('content-type', 'application/json');
					response.headers.append('Cache-Control', 'max-age=3600');
					response.headers.append('Cache-Control', 'stale-while-revalidate=86400');
					return response;
				}
				return new Response('No ID provided', { status: 400 });
			}
			case request.url.endsWith('/db/'): {
				const id = '28364a0f0478447baa0d3f9fe663c0ce';
				if (id) {
					return new Response(JSON.stringify(await dbRenderer.fetch(notion, id)));
				}
				return new Response('No ID provided', { status: 400 });
			}
			default: {
				return new Response('Hello world!');
			}
		}
	},
};
