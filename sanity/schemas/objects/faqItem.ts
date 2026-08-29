import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'faqItem',
	title: 'FAQ Item',
	type: 'object',
	fields: [
		defineField({
			name: 'question',
			title: 'Question',
			type: 'localizedString',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'answer',
			title: 'Answer',
			type: 'localizedText',
			validation: (Rule) => Rule.required()
		})
	],
	preview: {
		select: {
			title: 'question.en'
		}
	}
});
