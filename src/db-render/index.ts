import { Client } from '@notionhq/client';
import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export default {
	async fetch(
		notion: Client,
		id: string
	): Promise<GetDatabaseResponse> {
		const response = await notion.databases.retrieve({ database_id: id });
		return response;
	},
};
