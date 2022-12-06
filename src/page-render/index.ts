import { Client } from '@notionhq/client';
import {
	BlockObjectResponse,
	PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Object } from './types';

const checkHasChildren = (block: any) => {
	if (block.has_children) {
		return true;
	}
	return false;
};

export default {
	async fetch(
		notion: Client,
		id: string
	): Promise<(PartialBlockObjectResponse | BlockObjectResponse)[]> {
		// const response = await notion.pages.retrieve({ page_id: id }); // fetch as page
		const blockResp = await notion.blocks.retrieve({ block_id: id });
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
