import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'subService',
	title: 'Sub Service',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'localizedString',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'localizedText'
		})
	],
	preview: {
		select: {
			title: 'title.en',
			subtitle: 'description.en'
		}
	}
});
