import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'localizedText',
	title: 'Localized Text',
	type: 'object',
	fields: [
		defineField({
			name: 'en',
			title: 'English',
			type: 'text',
			rows: 4
		}),
		defineField({
			name: 'id',
			title: 'Indonesian',
			type: 'text',
			rows: 4
		})
	],
	preview: {
		select: {
			en: 'en',
			id: 'id'
		},
		prepare({ en, id }) {
			const text = en || id || 'No translation';
			return {
				title: text.length > 50 ? text.substring(0, 50) + '...' : text,
				subtitle: id ? 'Has Indonesian translation' : 'English only'
			};
		}
	}
});
