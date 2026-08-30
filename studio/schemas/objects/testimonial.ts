import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'testimonial',
	title: 'Testimonial',
	type: 'object',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'content',
			title: 'Testimonial Content',
			type: 'localizedText',
			validation: (Rule) => Rule.required()
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'content.en'
		}
	}
});
