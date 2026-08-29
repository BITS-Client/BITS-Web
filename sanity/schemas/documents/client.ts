import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'client',
	title: 'Client',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Client Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'website',
			title: 'Client Website',
			type: 'url'
		}),
		defineField({
			name: 'logo',
			title: 'Client Logo',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'icon',
			title: 'Client Icon',
			type: 'image',
			options: {
				hotspot: true
			},
			description:
				'Small icon for display in project cards and lists (recommended: 64x64px or larger, square)'
		}),
		defineField({
			name: 'order',
			title: 'Display Order',
			type: 'number',
			initialValue: 0
		})
	],
	orderings: [
		{
			title: 'Display Order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }]
		}
	],
	preview: {
		select: {
			title: 'name',
			media: 'icon'
		}
	}
});
