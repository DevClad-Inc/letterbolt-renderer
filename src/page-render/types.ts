export interface Parent {
	type: string;
	page_id: string;
}

export interface CreatedBy {
	object: string;
	id: string;
}

export interface ChildPage {
	title: string;
}

export interface Annotations {
	bold: boolean;
	italic: boolean;
	strikethrough: boolean;
	underline: boolean;
	code: boolean;
	color: string;
}

export interface RichText {
	type: string;
	text: Text;
	annotations: Annotations;
	plain_text: string;
	href: string | null;
}

export interface BulletedListItem {
	rich_text: RichText[];
}

export interface Object {
	object: string;
	id: string;
	parent: Parent;
	created_time: string;
	last_edited_time: string;
	created_by: CreatedBy;
	last_edited_by: CreatedBy;
	has_children: boolean;
	archived: boolean;
	type: string;
	child_page?: ChildPage;
	bulleted_list_item?: BulletedListItem;
}
