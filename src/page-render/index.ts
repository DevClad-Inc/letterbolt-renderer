import { Client } from '@notionhq/client';
import {
	BlockObjectResponse,
	GetPageResponse,
	PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

/* todo: POST requests to keep content in sync when using Letterbolt interface */

export const fetchPageProps = async (notion: Client, id: string): Promise<GetPageResponse> => {
	const response = await notion.pages.retrieve({ page_id: id });
	return response;
};

export const checkHasChildren = (block: PartialBlockObjectResponse | BlockObjectResponse) => {
	if ('has_children' in block) {
		if (block.has_children ? block.has_children : false) {
			return true;
		}
		return false;
	}
};

export default {
	async fetch(
		notion: Client,
		id: string
	): Promise<(PartialBlockObjectResponse | BlockObjectResponse)[]> {
		// const blockResp = await notion.blocks.retrieve({ block_id: id });
		const listBlockResponse = await notion.blocks.children.list({ block_id: id });
		const blockChildren = listBlockResponse.results;

		for (let i = 0; i < blockChildren.length; i++) {
			const block = blockChildren[i];
			if (checkHasChildren(block)) {
				const listBlockResponse = await notion.blocks.children.list({
					block_id: block.id,
				});
				blockChildren.push(...listBlockResponse.results);
			}
		}
		return blockChildren;
	},
};
