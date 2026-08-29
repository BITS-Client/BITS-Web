import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'category',
	title: 'Category',
	type: 'document',
	fields: [
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
			name: 'description',
			title: 'Description',
			type: 'localizedText'
		}),
		defineField({
			name: 'color',
			title: 'Color',
			type: 'string',
			description: 'Hex color code for category badge (e.g., #3b82f6)'
		}),
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
			description: 'Lucide icon name (e.g., "Folder", "Tag")'
		}),
		defineField({
			name: 'type',
			title: 'Category Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Blog', value: 'blog' },
					{ title: 'Portfolio', value: 'portfolio' },
					{ title: 'Both', value: 'both' }
				],
				layout: 'radio'
			},
			initialValue: 'both'
		})
	],
	preview: {
		select: {
			title: 'title.en',
			subtitle: 'type'
		}
	}
});
