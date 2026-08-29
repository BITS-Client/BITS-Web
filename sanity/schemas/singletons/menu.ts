import { defineType } from 'sanity';

export default defineType({
	name: 'menuSettings',
	title: 'Menu Settings',
	type: 'document',
	fields: [
		{
			name: 'navigation',
			title: 'Navigation Items',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'href', title: 'URL Path', type: 'string' },
						{ name: 'label', title: 'Label', type: 'localizedString' },
						{ name: 'isService', title: 'Is Service Page?', type: 'boolean' },
						{ name: 'order', title: 'Order', type: 'number' }
					]
				}
			]
		}
	],
	preview: {
		prepare() {
			return { title: 'Menu Settings' };
		}
	}
});
