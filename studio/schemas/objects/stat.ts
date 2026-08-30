import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'stat',
	title: 'Statistic',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			type: 'localizedString',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'value',
			title: 'Value',
			type: 'string',
			description: 'e.g., "100+", "99%", "24/7"',
			validation: (Rule) => Rule.required()
		})
	],
	preview: {
		select: {
			label: 'label.en',
			value: 'value'
		},
		prepare({ label, value }) {
			return {
				title: `${value} - ${label}`
			};
		}
	}
});
