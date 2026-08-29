import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'service',
	title: 'Service',
	type: 'document',
	fields: [
		defineField({
			name: 'seo',
			title: 'SEO Settings',
			type: 'seoSettings'
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'localizedString',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title.en',
				maxLength: 96
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
			description: 'Lucide icon name (e.g., "Globe", "Code", "Database")'
		}),
		defineField({
			name: 'longDescription',
			title: 'Long Description',
			type: 'localizedText'
		}),
		defineField({
			name: 'subServices',
			title: 'Sub-Services',
			type: 'array',
			of: [{ type: 'subService' }]
		}),
		defineField({
			name: 'benefits',
			title: 'Benefits',
			type: 'array',
			of: [{ type: 'localizedString' }]
		}),
		defineField({
			name: 'image',
			title: 'Featured Image',
			type: 'image',
			options: {
				hotspot: true
			}
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
			title: 'title.en',
			subtitle: 'description.en',
			media: 'image'
		}
	}
});
