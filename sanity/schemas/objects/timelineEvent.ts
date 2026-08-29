import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'timelineEvent',
	title: 'Timeline Event',
	type: 'object',
	fields: [
		defineField({
			name: 'year',
			title: 'Year',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
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
			year: 'year',
			title: 'title.en'
		},
		prepare({ year, title }) {
			return {
				title: `${year} - ${title}`
			};
		}
	}
});
