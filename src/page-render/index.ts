import { Client } from '@notionhq/client';
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

export default {
	async fetch(notion: Client, id: string): Promise<GetPageResponse> {
		const response = await notion.pages.retrieve({ page_id: id });
		return response;
	},
};
