import { Client } from '@notionhq/client';
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

		const databaseId = '28364a0f0478447baa0d3f9fe663c0ce'; // we'll be provided this value via Letterbolt's authed user
		const response = await notion.databases.retrieve({ database_id: databaseId });

		return new Response(JSON.stringify(response), {
			headers: { 'content-type': 'application/json;charset=UTF-8' },
		});
	},
};
