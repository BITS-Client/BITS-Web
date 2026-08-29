import { defineType, defineField } from 'sanity';

/**
 * Localized String Object
 * Used for short, single-line text that needs EN/ID translations
 * Examples: titles, labels, button text
 */
export default defineType({
	name: 'localizedString',
	title: 'Localized String',
	type: 'object',
	fields: [
		defineField({
			name: 'en',
			title: 'English',
			type: 'string'
		}),
		defineField({
			name: 'id',
			title: 'Indonesian',
			type: 'string'
		})
	],
	preview: {
		select: {
			en: 'en',
			id: 'id'
		},
		prepare({ en, id }) {
			return {
				title: en || id || 'No translation',
				subtitle: id ? `ID: ${id}` : undefined
			};
		}
	}
});
