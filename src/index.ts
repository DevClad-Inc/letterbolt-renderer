import { Client } from '@notionhq/client';
import db from './db';

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

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const notion = new Client({
			auth: env.NOTION_TOKEN,
		});

		// routing

		switch (true) {
			case request.url.endsWith('/db/'): {
				return new Response(
					JSON.stringify(
						await db.fetch(request, ctx, notion, '28364a0f0478447baa0d3f9fe663c0ce')
					)
				);
			}
			default: {
				return new Response('Hello world!');
			}
		}
	},
};
