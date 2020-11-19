/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import BaseResource from '../shared/baseResource';

type MenuResource = {
	apps_id: number;
	created_at: string;
	id: number;
	is_deleted: boolean;
	name: string;
	sidebar: link[];
	slug: 'main';
	updated_at: string;
};

type link = {
	title: string;
	links?: link[];
	created_at?: Date;
	icon_class?: string;
	icon_url?: string;
	id?: number;
	is_deleted?: boolean;
	is_published?: boolean;
	menus_id?: number;
	parent_id?: number;
	position?: number;
	route?: null;
	slug?: string;
	system_modules_id?: number;
	updated_at?: Date;
	url?: string;
};

export default class Menu extends BaseResource {
	getByName(name: string): Promise<MenuResource> {
		return this.http.request({
			url: `/menus/${name}`,
		});
	}
}
